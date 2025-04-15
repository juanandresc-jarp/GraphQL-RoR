module Mutations
    class CreatePet < BaseMutation
      argument :pet, Types::PetInputType, required: true
  
      field :pet, Types::PetType, null: false
  
      def resolve(pet:)
        begin
          # Check if the owner exists by calling the persons microservice
          person_response = RestClient.get("#{ENV['PERSONS_API_URL']}/#{pet[:owner_dni]}")
  
          if person_response.code == 200
            # Call pets microservice to create the pet
            response = RestClient.post("#{ENV['PETS_API_URL']}/create", pet.to_h.to_json, { content_type: :json, accept: :json })
            created_pet = JSON.parse(response.body)
            { pet: created_pet }
          else
            raise GraphQL::ExecutionError, "Person with DNI #{pet[:owner_dni]} does not exist."
          end
        rescue RestClient::ExceptionWithResponse => e
          # Handle cases where the external services return a non-200 HTTP status
          if e.response.code == 404
            raise GraphQL::ExecutionError, "Owner ID not found"
          else
            raise GraphQL::ExecutionError, "Error checking person data: #{e.response}"
          end
        rescue JSON::ParserError => e
          # Catch JSON parsing errors if the response is not a valid JSON
          raise GraphQL::ExecutionError, "Error parsing response from the pet service: #{e.message}"
        rescue StandardError => e
          # Catch any other unforeseen errors
          raise GraphQL::ExecutionError, "An unexpected error occurred: #{e.message}"
        end
      end
    end
  end
  
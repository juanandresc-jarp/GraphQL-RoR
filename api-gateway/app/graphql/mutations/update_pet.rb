module Mutations
    class UpdatePet < BaseMutation
      argument :dni, String, required: true
      argument :pet, Types::PetInputType, required: true
  
      field :pet, Types::PetType, null: true
  
      def resolve(dni:, pet:)
        # Call pets microservice to update pet
        response = RestClient.put("#{ENV['PETS_API_URL']}/#{dni}", pet.to_h.to_json, { content_type: :json, accept: :json })
        updated_pet = JSON.parse(response.body)
        { pet: updated_pet }
      rescue StandardError => e
        raise GraphQL::ExecutionError, "Error updating pet: #{e.message}"
      end
    end
  end
  
module Mutations
    class UpdatePerson < BaseMutation
      argument :dni, String, required: true
      argument :person, Types::PersonInputType, required: true
  
      field :person, Types::PersonType, null: true
  
      def resolve(dni:, person:)
        # Send request to the microservice to update a person by dni
        response = RestClient.put(
          "#{ENV['PERSONS_API_URL']}/#{dni}",
          { person: person.to_h }.to_json,
          { content_type: :json, accept: :json }
        )
        
        updated_person = JSON.parse(response.body)
  
        { person: updated_person }
      rescue RestClient::ExceptionWithResponse => e
        # Handle errors from the microservice
        raise GraphQL::ExecutionError, e.response
      end
    end
  end
  
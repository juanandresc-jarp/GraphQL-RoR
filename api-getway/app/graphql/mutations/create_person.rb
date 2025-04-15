module Mutations
    class CreatePerson < BaseMutation
      argument :person, Types::PersonInputType, required: true
  
      field :person, Types::PersonType, null: false
  
      def resolve(person:)
        # Send request to the microservice to create a person
        response = RestClient.post(
          "#{ENV['PERSONS_API_URL']}",
          { person: person.to_h }.to_json,
          { content_type: :json, accept: :json }
        )
        
        created_person = JSON.parse(response.body)
  
        # If the person was created successfully
        { person: created_person }
      rescue RestClient::ExceptionWithResponse => e
        # Handle errors from the microservice
        raise GraphQL::ExecutionError, e.response
      end
    end
  end
  
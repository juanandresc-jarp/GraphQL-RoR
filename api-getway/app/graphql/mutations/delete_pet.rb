module Mutations
    class DeletePet < BaseMutation
      argument :dni, String, required: true
  
      field :success, Boolean, null: false
  
      def resolve(dni:)
        # Send request to the microservice to delete a pet by dni
        response = RestClient.delete(
          "#{ENV['PETS_API_URL']}/#{dni}",
          { accept: :json }
        )
  
        # If the person was deleted successfully
        { success: true }
      rescue RestClient::ExceptionWithResponse => e
        # Handle errors from the microservice
        raise GraphQL::ExecutionError, e.response
      end
    end
  end
  
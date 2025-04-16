module Mutations
  class DeletePerson < BaseMutation
    argument :dni, String, required: true

    field :success, Boolean, null: false

    def resolve(dni:)
      # 1. Eliminar las mascotas asociadas al propietario
      begin
        RestClient.delete(
          "#{ENV['PETS_API_URL']}/#{dni}",
          { accept: :json }
        )
      rescue RestClient::ExceptionWithResponse => e
        # Si es 404 está bien, significa que no tenía mascotas
        raise GraphQL::ExecutionError, "Error deleting pets: #{e.response}" unless e.response.code == 404
      end

      # 2. Eliminar el propietario
      response = RestClient.delete(
        "#{ENV['PERSONS_API_URL']}/#{dni}",
        { accept: :json }
      )

      { success: true }

    rescue RestClient::ExceptionWithResponse => e
      raise GraphQL::ExecutionError, e.response
    end
  end
end

module Types
    class QueryType < BaseObject
      PERSONS_ENDPOINT = ENV['PERSONS_API_URL']
      PETS_ENDPOINT = ENV['PETS_API_URL']
  
      field :persons, [PersonType], null: false
      def persons
        response = RestClient.get(PERSONS_ENDPOINT)
        JSON.parse(response.body)
      end
  
      field :person, PersonType, null: true do
        argument :dni, String, required: true
      end
  
      def person(dni:)
        response = RestClient.get("#{PERSONS_ENDPOINT}/#{dni}")
        JSON.parse(response.body)
      end
  
      field :pets, [PetType], null: false
      def pets
        response = RestClient.get(PETS_ENDPOINT)
        JSON.parse(response.body)
      end
  
      field :pet, PetType, null: true do
        argument :dni, String, required: true
      end
  
      def pet(dni:)
        response = RestClient.get("#{PETS_ENDPOINT}/#{dni}")
        JSON.parse(response.body)
      end
    end
  end
  
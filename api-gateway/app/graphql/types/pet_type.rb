module Types
    class PetType < BaseObject
      field :owner_dni, String, null: false
      field :pet_name, String, null: false
      field :pet_weight, String, null: false
      field :animal, String, null: false
      field :birthdate, String, null: false 
    end
  end
  
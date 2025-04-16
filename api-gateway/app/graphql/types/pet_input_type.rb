module Types
    class PetInputType < BaseInputObject
      argument :owner_dni, String, required: true
      argument :pet_name, String, required: true
      argument :pet_weight, String, required: true
      argument :animal, String, required: true
      argument :birthdate, String, required: true 
    end
  end
  
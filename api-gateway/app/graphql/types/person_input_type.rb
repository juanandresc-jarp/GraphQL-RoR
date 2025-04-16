module Types
    class PersonInputType < BaseInputObject
      argument :dni, String, required: true
      argument :first_name, String, required: true
      argument :last_name, String, required: true
      argument :email, String, required: true
      argument :phone, String, required: true
    end
  end
  
module Types
  class MutationType < Types::BaseObject
    field :create_person, mutation: Mutations::CreatePerson
    field :update_person, mutation: Mutations::UpdatePerson
    field :delete_person, mutation: Mutations::DeletePerson
    field :create_pet, mutation: Mutations::CreatePet
    field :update_pet, mutation: Mutations::UpdatePet
    field :delete_pet, mutation: Mutations::DeletePet
  end
end


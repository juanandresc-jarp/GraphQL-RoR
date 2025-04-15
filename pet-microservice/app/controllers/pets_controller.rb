class PetsController < ApplicationController
    def index
      pets = Pet.all
      render json: pets
    end
  
    def show
      pet = Pet.find_by_dni(params[:id])
      if pet
        render json: pet
      else
        render json: { error: "Not found" }, status: :not_found
      end
    end
  
    def create
      if params[:pet][:owner_dni].blank?
        return render json: { error: "Owner DNI is required" }, status: :unprocessable_entity
      end
  
      pet = Pet.create(pet_params)
      render json: pet, status: :created
    end
  
    def update
      pet = Pet.find_by_dni(params[:id])
      unless pet
        return render json: { error: "Not found" }, status: :not_found
      end
  
      updated = Pet.update(params[:id], pet_params)
      render json: updated
    end
  
    def destroy
      pet = Pet.find_by_dni(params[:id])
      unless pet
        return render json: { error: "Not found" }, status: :not_found
      end
  
      Pet.destroy(params[:id])
      render json: { message: "Deleted" }
    end
  
    private
  
    def pet_params
      params.require(:pet).permit(:owner_dni, :pet_name, :pet_weight, :animal, :birthdate)
    end
  end
  
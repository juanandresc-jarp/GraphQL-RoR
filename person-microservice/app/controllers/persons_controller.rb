class PersonsController < ApplicationController
    def index
      persons = Person.all
      render json: persons
    end
  
    def show
      person = Person.find_by_dni(params[:id])
      if person
        render json: person
      else
        render json: { error: "Not found" }, status: :not_found
      end
    end
  
    def create
      if params[:person][:dni].blank?
        return render json: { error: "DNI is required" }, status: :unprocessable_entity
      end
  
      person = Person.create(person_params)
      render json: person, status: :created
    end
  
    def update
      person = Person.find_by_dni(params[:id])
      unless person
        return render json: { error: "Not found" }, status: :not_found
      end
  
      updated = Person.update(params[:id], person_params)
      render json: updated
    end
  
    def destroy
      person = Person.find_by_dni(params[:id])
      unless person
        return render json: { error: "Not found" }, status: :not_found
      end
  
      Person.destroy(params[:id])
      render json: { message: "Deleted" }
    end
  
    private
  
    def person_params
      params.require(:person).permit(:dni, :first_name, :last_name, :email, :phone)
    end
  end
  
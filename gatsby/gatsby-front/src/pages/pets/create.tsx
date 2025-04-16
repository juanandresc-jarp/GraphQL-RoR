import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_PET = gql`
  mutation CreatePet($input: CreatePetInput!) {
    createPet(input: $input) {
      pet {
        ownerDni
        petName
        petWeight
        animal
        birthdate
      }
    }
  }
`;

const CreatePetForm: React.FC = () => {
  const [createPet] = useMutation(CREATE_PET);
  const [form, setForm] = useState({
    ownerDni: "",
    petName: "",
    petWeight: "",
    animal: "",
    birthdate: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data } = await createPet({
        variables: { input: { pet: form } }
      });
      const pet = data.createPet.pet;
      setSuccessMessage(`Mascota "${pet.petName}" creada correctamente.`);
    } catch (error: any) {
      console.error("Error al crear mascota:", error);
      if (
        error?.graphQLErrors?.[0]?.message === "Owner ID not found"
      ) {
        setErrorMessage("El DNI del dueño no está registrado.");
      } else {
        setErrorMessage("Error inesperado al crear mascota.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h1>Crear nueva mascota</h1>
      <input name="ownerDni" placeholder="DNI del dueño" onChange={handleChange} />
      <input name="petName" placeholder="Nombre de la mascota" onChange={handleChange} />
      <input name="petWeight" placeholder="Peso" onChange={handleChange} />
      <input name="animal" placeholder="Tipo de animal" onChange={handleChange} />
      <input name="birthdate" type="date" onChange={handleChange} />
      <button type="submit">Crear</button>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
      )}

      {successMessage && (
        <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>
      )}
    </form>
  );
};

export default CreatePetForm;

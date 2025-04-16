import React, { useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

// Consulta para obtener mascota por DNI del dueño
const GET_PET = gql`
  query GetPet($dni: String!) {
    pet(dni: $dni) {
      ownerDni
      petName
      petWeight
      animal
      birthdate
    }
  }
`;

// Mutación para actualizar mascota
const UPDATE_PET = gql`
  mutation UpdatePet($input: UpdatePetInput!) {
    updatePet(input: $input) {
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

const UpdatePetForm: React.FC = () => {
  const [updatePet] = useMutation(UPDATE_PET);
  const [loadPet] = useLazyQuery(GET_PET, {
    onCompleted: (data) => {
      if (data.pet) {
        setForm({
          ownerDni: data.pet.ownerDni,
          petName: data.pet.petName,
          petWeight: data.pet.petWeight,
          animal: data.pet.animal,
          birthdate: data.pet.birthdate,
        });
        setErrorMessage("");
      } else {
        setErrorMessage("No se encontró una mascota con ese DNI de dueño.");
      }
    },
    onError: () => {
      setErrorMessage("Error consultando la mascota.");
    },
  });

  const [form, setForm] = useState({
    ownerDni: "",
    petName: "",
    petWeight: "",
    animal: "",
    birthdate: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlurDni = () => {
    if (form.ownerDni.trim()) {
      loadPet({ variables: { dni: form.ownerDni.trim() } });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data } = await updatePet({
        variables: {
          input: {
            dni: form.ownerDni,
            pet: {
              ownerDni: form.ownerDni,
              petName: form.petName,
              petWeight: form.petWeight,
              animal: form.animal,
              birthdate: form.birthdate,
            },
          },
        },
      });

      const updated = data.updatePet.pet;
      setSuccessMessage(`Mascota ${updated.petName} actualizada correctamente.`);
    } catch (error: any) {
      console.error("Error al actualizar:", error);
      setErrorMessage("No se pudo actualizar la mascota.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h1>Actualizar mascota</h1>
      <input
        name="ownerDni"
        placeholder="DNI del dueño"
        value={form.ownerDni}
        onChange={handleChange}
        onBlur={handleBlurDni}
        required
      />
      <input
        name="petName"
        placeholder="Nombre de la mascota"
        value={form.petName}
        onChange={handleChange}
      />
      <input
        name="petWeight"
        placeholder="Peso"
        type="number"
        value={form.petWeight}
        onChange={handleChange}
      />
      <input
        name="animal"
        placeholder="Tipo de animal"
        value={form.animal}
        onChange={handleChange}
      />
      <input
        name="birthdate"
        placeholder="Fecha de nacimiento (YYYY-MM-DD)"
        value={form.birthdate}
        onChange={handleChange}
      />
      <button type="submit">Actualizar</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
};

export default UpdatePetForm;

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const DELETE_PET = gql`
  mutation DeletePet($input: DeletePetInput!) {
    deletePet(input: $input) {
      success
    }
  }
`;

const DeletePetForm: React.FC = () => {
  const [dni, setDni] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [deletePet] = useMutation(DELETE_PET, {
    onCompleted: (data) => {
      if (data.deletePet.success) {
        setSuccessMessage(`Mascota con DNI del dueño ${dni} eliminada correctamente.`);
        setErrorMessage("");
      } else {
        setErrorMessage("No se pudo eliminar la mascota.");
        setSuccessMessage("");
      }
    },
    onError: (error) => {
      console.error("Error al eliminar:", error);
      setErrorMessage("No se pudo eliminar la mascota.");
      setSuccessMessage("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!dni.trim()) {
      setErrorMessage("Debes ingresar el DNI del dueño.");
      return;
    }

    deletePet({ variables: { input: { dni: dni.trim() } } });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h1>Eliminar mascota</h1>
      <input
        type="text"
        name="dni"
        placeholder="DNI del dueño"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        required
      />
      <button type="submit" style={{ marginTop: "1rem" }}>Eliminar</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
};

export default DeletePetForm;

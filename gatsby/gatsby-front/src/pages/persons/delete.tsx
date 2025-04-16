import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";


const DELETE_PERSON = gql`
  mutation DeletePerson($input: DeletePersonInput!) {
    deletePerson(input: $input) {
      success
    }
  }
`;

const DeletePersonForm: React.FC = () => {
  const [dni, setDni] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [deletePerson] = useMutation(DELETE_PERSON, {
    onCompleted: (data) => {
      if (data.deletePerson.success) {
        setSuccessMessage(`Propietario con DNI ${dni} eliminado correctamente.`);
        setErrorMessage("");
      } else {
        setErrorMessage("No se pudo eliminar el propietario.");
        setSuccessMessage("");
      }
    },
    onError: (error) => {
      console.error("Error al eliminar:", error);
      setErrorMessage("No se pudo eliminar el propietario.");
      setSuccessMessage("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!dni.trim()) {
      setErrorMessage("Debes ingresar un DNI.");
      return;
    }

    deletePerson({ variables: { input: { dni: dni.trim() } } });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h1>Eliminar propietario</h1>
      <input
        type="text"
        name="dni"
        placeholder="DNI del propietario"
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

export default DeletePersonForm;

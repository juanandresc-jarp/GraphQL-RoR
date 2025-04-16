import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_PETS = gql`
  query GetAllPets {
    pets {
      ownerDni
      petName
      petWeight
      animal
      birthdate
    }
  }
`;

const PetsPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_PETS);

  if (loading) return <p>Cargando mascotas...</p>;
  if (error) return <p>Error al cargar mascotas: {error.message}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mascotas registradas</h1>
      {data.pets.map((pet: any, index: number) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{pet.petName}</h3>
          <p><strong>Dueño (DNI):</strong> {pet.ownerDni}</p>
          <p><strong>Peso:</strong> {pet.petWeight} kg</p>
          <p><strong>Animal:</strong> {pet.animal}</p>
          <p><strong>Fecha de nacimiento:</strong> {pet.birthdate}</p>
        </div>
      ))}
    </div>
  );
};

export default PetsPage;

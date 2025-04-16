import React from "react";
import { gql, useQuery } from "@apollo/client";
import type { PageProps } from "gatsby";

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

const PetDetail: React.FC<PageProps<{}, { dni: string }>> = ({ params }) => {
  const dni = params.dni;

  const { loading, error, data } = useQuery(GET_PET, {
    variables: { dni },
    skip: !dni,
  });

  if (loading) return <p>Cargando datos de la mascota...</p>;
  if (error) return <p>Error al obtener la mascota: {error.message}</p>;

  const pet = data?.pet;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Detalles de la mascota</h1>
      {pet ? (
        <ul>
          <li><strong>Nombre:</strong> {pet.petName}</li>
          <li><strong>DNI del dueño:</strong> {pet.ownerDni}</li>
          <li><strong>Peso:</strong> {pet.petWeight} kg</li>
          <li><strong>Animal:</strong> {pet.animal}</li>
          <li><strong>Fecha de nacimiento:</strong> {pet.birthdate}</li>
        </ul>
      ) : (
        <p>No se encontró una mascota para ese DNI.</p>
      )}
    </div>
  );
};

export default PetDetail;

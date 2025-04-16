import React from "react";
import { gql, useQuery } from "@apollo/client";
import type { PageProps } from "gatsby";

const GET_PERSON = gql`
  query GetPerson($dni: String!) {
    person(dni: $dni) {
      dni
      firstName
      lastName
      email
      phone
    }
  }
`;

const PersonDetail: React.FC<PageProps<{}, { dni: string }>> = ({ params }) => {
  const dni = params.dni;

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { dni },
    skip: !dni,
  });

  if (loading) return <p>Cargando datos del dueño...</p>;
  if (error) return <p>Error al obtener el dueño: {error.message}</p>;

  const person = data?.person;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Detalles del dueño</h1>
      {person ? (
        <ul>
          <li><strong>DNI:</strong> {person.dni}</li>
          <li><strong>Nombre:</strong> {person.firstName} {person.lastName}</li>
          <li><strong>Email:</strong> {person.email}</li>
          <li><strong>Teléfono:</strong> {person.phone}</li>
        </ul>
      ) : (
        <p>No se encontró un dueño con ese DNI.</p>
      )}
    </div>
  );
};

export default PersonDetail;

import React from "react";
import { useQuery, gql } from "@apollo/client";

interface PersonDetailProps {
  dni?: string;
  path?: string; // necesario para Reach Router
}

const GET_PERSON_BY_DNI = gql`
  query GetPerson($dni: ID!) {
    person(dni: $dni) {
      dni
      first_name
      last_name
      email
      phone
    }
  }
`;

const PersonDetail: React.FC<PersonDetailProps> = ({ dni }) => {
  const { loading, error, data } = useQuery(GET_PERSON_BY_DNI, {
    variables: { dni },
    skip: !dni,
  });

  if (!dni) return <p>DNI no proporcionado.</p>;
  if (loading) return <p>Cargando persona...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.person) return <p>No se encontró la persona</p>;

  const { first_name, last_name, email, phone } = data.person;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{first_name} {last_name}</h1>
      <p><strong>DNI:</strong> {dni}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Teléfono:</strong> {phone}</p>
    </div>
  );
};

export default PersonDetail;

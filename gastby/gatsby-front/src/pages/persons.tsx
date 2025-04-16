import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "gatsby";

const GET_ALL_PERSONS = gql`
  query GetAllPersons {
    persons {
      dni
      firstName
      lastName
      email
      phone
    }
  }
`;

const PersonsPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_PERSONS);
  console.log({ loading, error, data });
  if (loading) return <p>Cargando personas...</p>;
  if (error) return <p>Error al cargar personas: {error.message}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Personas registradas</h1>
      {data.persons.map((person: any) => (
        <div
          key={person.dni}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{person.firstName} {person.lastName}</h3>
          <p><strong>DNI:</strong> {person.dni}</p>
          <p><strong>Email:</strong> {person.email}</p>
          <p><strong>Teléfono:</strong> {person.phone}</p>
          <Link to={`/person/${person.dni}`}>Ver detalles</Link>
        </div>
      ))}
    </div>
  );
};

export default PersonsPage;

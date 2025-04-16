import React from "react";
import { gql, useQuery } from "@apollo/client";

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

const PersonsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_PERSONS);

  if (loading) return <p>Cargando personas...</p>;
  if (error) return <p>Error al cargar: {error.message}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Todos los dueños</h1>
      {data.persons.map((p: any, i: number) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h3>{p.firstName} {p.lastName}</h3>
          <p><strong>DNI:</strong> {p.dni}</p>
          <p><strong>Email:</strong> {p.email}</p>
          <p><strong>Teléfono:</strong> {p.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default PersonsList;

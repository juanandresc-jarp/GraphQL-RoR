import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_PERSON = gql`
  mutation CreatePerson($input: CreatePersonInput!) {
    createPerson(input: $input) {
      person {
        dni
        firstName
        lastName
        email
        phone
      }
    }
  }
`;

const CreatePersonForm: React.FC = () => {
  const [createPerson] = useMutation(CREATE_PERSON);
  const [form, setForm] = useState({
    dni: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createPerson({
        variables: {
          input: {
            person: form
          }
        }
      });
      console.log("Persona creada:", data.createPerson.person);
    } catch (error) {
      console.error("Error al crear persona:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h1>Crear nuevo propietario</h1>
      <input name="dni" placeholder="DNI" onChange={handleChange} />
      <input name="firstName" placeholder="Nombre" onChange={handleChange} />
      <input name="lastName" placeholder="Apellido" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Teléfono" onChange={handleChange} />
      <button type="submit">Crear</button>
    </form>
  );
};

export default CreatePersonForm;

import React, { useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

// Query to fetch a person by DNI
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

// Mutation to update a person with a single input argument
const UPDATE_PERSON = gql`
  mutation UpdatePerson($input: UpdatePersonInput!) {
    updatePerson(input: $input) {
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

const UpdatePersonForm: React.FC = () => {
  const [updatePerson] = useMutation(UPDATE_PERSON);
  const [loadPerson] = useLazyQuery(GET_PERSON, {
    onCompleted: (data) => {
      if (data.person) {
        setForm({
          dni: data.person.dni,
          firstName: data.person.firstName,
          lastName: data.person.lastName,
          email: data.person.email,
          phone: data.person.phone,
        });
        setErrorMessage("");
      } else {
        setErrorMessage("No se encontró una persona con ese DNI.");
      }
    },
    onError: () => {
      setErrorMessage("Error consultando al propietario.");
    },
  });

  const [form, setForm] = useState({
    dni: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlurDni = () => {
    if (form.dni.trim()) {
      loadPerson({ variables: { dni: form.dni.trim() } });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data } = await updatePerson({
        variables: {
          input: {
            dni: form.dni,
            person: {
              dni: form.dni,
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              phone: form.phone,
            },
          },
        },
      });

      const updated = data.updatePerson.person;
      setSuccessMessage(`Propietario ${updated.firstName} actualizado correctamente.`);
    } catch (error: any) {
      console.error("Error al actualizar:", error);
      setErrorMessage("No se pudo actualizar el propietario.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h1>Actualizar propietario</h1>
      <input
        name="dni"
        placeholder="DNI"
        value={form.dni}
        onChange={handleChange}
        onBlur={handleBlurDni}
        required
      />
      <input
        name="firstName"
        placeholder="Nombre"
        value={form.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="Apellido"
        value={form.lastName}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
      />
      <button type="submit">Actualizar</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
};

export default UpdatePersonForm;

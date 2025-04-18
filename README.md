# GraphQL-RoR
# Veterinary Management System 🐾

Este es un proyecto de implementación básica compuesto por una arquitectura de microservicios. El sistema permite gestionar información de personas y mascotas mediante una interfaz web y una API GraphQL. Está completamente dockerizado para facilitar el despliegue y pruebas tanto de forma individual como integrada.

---

## 📦 Arquitectura del Proyecto

El sistema está compuesto por los siguientes componentes:

1. **Frontend (Gatsby - TypeScript)**  
   - Interfaz web del sistema.  
   - Se comunica con la API Gateway a través de GraphQL.

2. **API Gateway (Ruby on Rails + GraphQL)**  
   - Encapsula la lógica de negocio y sirve como único punto de entrada para el frontend.  
   - Redirige las solicitudes a los microservicios correspondientes.

3. **Microservicios (Ruby on Rails)**  
   - **Persons Service**: Maneja la información de las personas.  
   - **Pets Service**: Maneja la información de las mascotas.  
   - Cada microservicio incluye su propia base de datos Cassandra.

---

## 🚀 Despliegue

### Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Despliegue Total (Todos los Contenedores)

```bash
# En Windows con docker desktop
docker-compose up --build

# En Ubuntu
docker compose up ---build
```

Esto creará y levantará los **6 contenedores** del sistema con comunicación entre ellos.

> **Acceso general:**  
> Frontend y API: `http://localhost:8080`
## 📘 Rutas

Estas son las rutas expuestas en el frontend:

**Persons**

- `/persons/`
- `/persons/:dni/`
- `/persons/create/`
- `/persons/update/`
- `persons/delete/`

**Pets**

- `/pets/`
- `/pets/:dni/`
- `/pets/create/`
- `/pets/update/`
- `pets/delete/`

---

## 🧪 Despliegue Individual

Cada subcarpeta contiene su propio `docker-compose.yml` para pruebas por separado en Windows (la integración completa si se hace con los compose individuales puede fallar según el sistema operativo).  

Ejecuta el `docker-compose.yml` de cada servicio por separado si deseas probar individualmente.

---

## 📡 Pruebas GraphQL (Testeados en Postman)

Ejemplos de operaciones GraphQL a través del API Gateway:

### 🔍 Consultas

```graphql
{
  persons {
    dni
    firstName
    lastName
    email
    phone
  }
}
```

```graphql
{
  pets {
    ownerDni
    petName
    petWeight
    animal
    birthdate
  }
}
```

### ✏️ Mutaciones

**Crear persona**
```graphql
mutation {
  createPerson(input: {
    person: {
      dni: "1234578",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890"
    }
  }) {
    person {
      dni
      firstName
      lastName
      email
      phone
    }
  }
}
```

**Actualizar persona**
```graphql
mutation {
  updatePerson(input: {
    dni: "1234578", person: {
      dni: "1234578",
      firstName: "John Updated", 
      lastName: "Doe Updated", 
      email: "john.doe.updated@example.com", 
      phone: "9876543210" 
    }
  }) {
    person {
      dni
      firstName
      lastName
      email
      phone
    }
  }
}
```

**Eliminar persona**
```graphql
mutation {
  deletePerson(input: { dni: "1234578" }) {
    success
  }
}
```

**Crear mascota**
```graphql
mutation {
  createPet(input: { 
    pet: { 
      ownerDni: "12345678", 
      petName: "Rex", 
      petWeight: "20.5", 
      animal: "Dog", 
      birthdate: "2020-05-10" 
    }
  }) { 
    pet { 
      ownerDni 
      petName 
      petWeight 
      animal 
      birthdate 
    } 
  } 
}
```

**Actualizar mascota**
```graphql
mutation {
  updatePet(input:{dni: "12345678", pet: {
    ownerDni: "12345678"
    petName: "Rex"
    petWeight: "12.0"
    animal: "Dog"
    birthdate: "2019-04-25"
  }}) {
    pet {
      ownerDni
      petName
      petWeight
      animal
      birthdate
    }
  }
}
```

**Eliminar mascota**
```graphql
mutation {
  deletePet(input: { dni: "12345678" }) {
    success
  }
}
```

---

## 🛠 Estructura del Proyecto

```
├── Docker/                     # Dockerfiles para cada servicio
├── api-gateway/                # Ruby on Rails con GraphQL
├── gatsby/                     # Gatsby + TypeScript
├── person-microservice/        # Servicio y DB Cassandra para personas
├── pet-microservice/           # Servicio y DB Cassandra para mascotas
├── docker-compose.yml          # Compose para el despliegue total
├── ConfigFiles                 # Algunos comandos para inicialización, no necesarios para despliegue
```

---

## ⚠️ Notas

- Los componentes individuales de este proyecto ha sido probado en **Windows** con Docker Desktop.
- El unico docker compose testeado en distintos sistemas operativos es el de despliegue global en la raiz de proyecto.
- Puede presentar problemas de compatibilidad los compose individuales de los servicios en **Linux/MacOS**, principalmente por diferencias de red y volúmenes.
Challenge Técnico Fullstack
Este repositorio contiene una aplicación Fullstack desarrollada con Angular para el frontend y Express + Firebase Admin para el backend. El propósito principal es cumplir con los lineamientos del desafío técnico, que incluye autenticación de usuarios e implementación de un CRUD de tareas con almacenamiento en Firestore.

Contenido
Visión General de la Arquitectura

Herramientas Empleadas

Instalación y Ejecución

Estructura de Archivos

Razonamiento sobre la Arquitectura

Notas Finales

Visión General de la Arquitectura
Frontend (Angular)

Uso de la modalidad standalone para componentes, con formularios reactivos.

Dos pantallas principales:

Login: solicita el correo electrónico y verifica su registro.

Tasks: permite realizar operaciones CRUD sobre las tareas.

Backend (Express + Firebase Admin)

API construida con Express y TypeScript.

Uso de Firebase Admin SDK para interactuar con Firestore.

Endpoints REST para usuarios (/users) y tareas (/tasks).

La comunicación entre el frontend y el backend se realiza mediante solicitudes HTTP con datos en formato JSON.

Herramientas Empleadas
Angular 16+

TypeScript (aplicado en frontend y backend)

Express.js

Firebase Admin SDK (para conectarse a Firestore)

Cloud Firestore (base de datos NoSQL)

Node.js en versión 16 o superior

Instalación y Ejecución
1. Backend
Entrar al directorio backend/.

Instalar las dependencias:

bash
Copiar
Editar
npm install
Asegurar la presencia de un archivo serviceAccountKey.json con las credenciales de Firebase Admin, referenciado en firebase.ts.

Iniciar el servidor en modo desarrollo:

bash
Copiar
Editar
npm run dev
Esto crea un servidor en http://localhost:3000/.

2. Frontend
Ir a la carpeta frontend/.

Instalar dependencias:

bash
Copiar
Editar
npm install
Iniciar la aplicación:

bash
Copiar
Editar
npm start
Por defecto, se ejecuta en http://localhost:4200/.

Acceder a esa URL desde un navegador.

Estructura de Archivos
bash
Copiar
Editar
/.
 ┣ backend/
 ┃ ┣ src/
 ┃ ┃ ┣ infrastructure/
 ┃ ┃ ┃ ┣ database/ (firebase.ts, serviceAccountKey.json)
 ┃ ┃ ┃ ┣ controllers/ (tasksController.ts, userController.ts)
 ┃ ┃ ┃ ┗ routes/ (index.ts)
 ┃ ┣ package.json
 ┃ ┗ tsconfig.json
 ┣ frontend/
 ┃ ┣ src/
 ┃ ┃ ┣ app/
 ┃ ┃ ┃ ┣ components/ (login, tasks)
 ┃ ┃ ┃ ┣ services/
 ┃ ┃ ┃ ┣ app.routes.ts
 ┃ ┃ ┃ ┗ app.config.ts
 ┃ ┣ angular.json
 ┃ ┣ package.json
 ┃ ┗ tsconfig.json
 ┣ README.md
 ┗ .gitignore
Razonamiento sobre la Arquitectura
Angular Standalone:

Evita la necesidad de módulos tradicionales; favorece la declaración directa de componentes y uso de bootstrapApplication.

Express y Firebase Admin:

Express es simple y efectivo para exponer endpoints.

Firebase Admin maneja la interacción con Firestore con privilegios de administrador.

Buenas Prácticas:

Patrón SOLID: los controladores se enfocan en la lógica de su recurso (tareas o usuarios), manteniendo cada parte con responsabilidades bien definidas.

DRY y KISS: Se minimiza la repetición de código y se mantiene la estructura clara.

Notas Finales
Despliegue: El backend se puede alojar en Cloud Functions gracias al archivo de inicialización (index.ts con export const api = functions.https.onRequest(...)). El frontend puede subirse a Firebase Hosting u otra plataforma a elección.

Reglas de Firestore: Para pruebas, puede usarse la regla allow read, write: if true;, aunque no es recomendable en producción.

Mejoras:

Restringir accesos con Angular Guards y/o JWT.

Añadir paginación y búsqueda avanzada en las tareas.

Añadir pipeline de CI/CD.
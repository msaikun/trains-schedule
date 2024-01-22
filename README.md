# Trains Schedule Application
- FE Stack: Next.js, Typescript, MUI, Styled-components, Axios, Notistack
- BE Stack: Node.js, Typescript, Nest.js, PostgreSQL

# To start a project with Docker use next commands in root: 
1. open project
2. open bash
3. docker-compose build
4. docker-compose up

# To start a project without Docker do next steps:
1. open project
2. open bash
3. cd backend
4. uncomment .env file in backend folder
5. npm run start
6. open another bash
7. cd client
8. npm run dev

- You can open project on [DEMO](http://localhost:3000/signin)
- And swagger on [DEMO](http://localhost:5002/api/docs/#)

# BACKEND:
The project implements the full user life cycle, starting from registration and authorization, ending with convenient log-out. Pagination, sorting and filtering are also implemented. The user also has the ability to view the train schedule, and if necessary, and with the presence of an admin role, edit, delete, and add new schedules to the table.

# FRONTEND:
On the client side, a variety of components have been implemented (DataTable, Dropdown, DatePicker, Input, Modal, Checkbox, etc.), notifications have been introduced for user convenience, form validation has been added, and integration with the backend has been carried out, and more.

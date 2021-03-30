const express = require('express');
const cors = require('cors')
const { v4: uuid } = require('uuid');

const port = 3333;
const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

//MIDDLEWARE

function logRequests(request, response, next){
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  return next();
};

app.use(logRequests);

//ROUTES

app.get('/projects', (request, response) => {

  //This examples can be categorized on Query Params
  const { query } = request.query; 
  // ↑ Catch all the objects in query
  const { tittle, owner } = request.query; 
  // ↑ Catch separate objects in query (Split)

  return response.json([projects]);
})

app.patch('/projects', (request, response) => {

  /* The most used variables are "id" / "name" / this can be relative 
  In this example, we use the /:id parameter.
  If we change the :id variable to :name
  the result of this request will be an object like this → id: value */

  const params = request.params; 
  // ↑ Catch all the parameters in query
  const { id } = request.params; 
  // ↑ Catch separate objects in query (Split)
  const { title, owner } = request.body; 
  // ↑ Catch separate objects JSON body (Split)
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0){
    return response.status(400).json({ error: 'Project not found' });
  } else {

    const project = { id, title, owner };
  
    projects[projectIndex] = project;
    return response.json(project);
  }
})

app.post('/projects', (request, response) => {
  const body = request.body //Catch all the object JSON body
  const { title, owner } = request.body; //Catch separate objects JSON body (Split)
  const project = { id: uuid(), title, owner }

  projects.push(project);
  
  return response.json([project]);
})

app.put('/projects/:id', (request, response) => {

  //The most used variables are "id" / "name" / this can be relative 
  //In this example, we use the /:id parameter
  //If we change the :id variable to :name, the result of this request will be an object like this → id: value
  const params = request.params; //Catch all the parameters in query
  const { id } = request.params; //Catch separate objects in query (Split)
  const { title, owner } = request.body; //Catch separate objects JSON body (Split)
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0){
    return response.status(400).json({ error: 'Project not found' });
  } else {

    const project = {
      id,
      title,
      owner,
    };
  
    projects[projectIndex] = project;
    return response.json(project);
  }
})

app.delete('/projects/:id', (request, response) => {

  const { id } = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0){
    return response.status(400).json({ error: 'Project not found' });

  } else {

    projects.splice(projectIndex, 1);
    return response.status(204).json([]);
  }
})


app.listen(port, () => {
  console.log(`\n 😎 Server is running on \n → http://localhost:${port}`)
})

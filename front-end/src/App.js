import React, { useState, useEffect } from 'react';
import api from './services/api'
import Header from './components/Header'

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  },[]) /* ← This array calls dependecy array */

  async function handleAddProject(){
   // setProjects([...projects, `New Project ${Date.now()}`]);
   const response = await api.post('projects', {
     title: `Front-end ${Date.now()}`,
     owner: 'Luís Lenzi'
   })

   const project = response.data;

   setProjects([...projects, project])
  }

  return (
    <> {/* ← This "div" calls fragment */}
      <Header title="Projects"/> 
        <h1>
          {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </h1>

        <button type="button" onClick={handleAddProject}>Add Project</button>
    </>
  );
}

export default App;
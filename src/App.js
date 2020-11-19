import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepository ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      const { data } = response;

      setRepository(data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo projeto react! ${Date.now()}`,
      techs: [`NodeJs - ${Date.now()}`],
      url: `https://github.com/erikwtg/conceitos-nodeJs-bootcamp-rocketseat.git - ${Date.now()}`
    });

    const { data } = response;

    setRepository([...repository, data]);
  };

  async function handleRemoveRepository(id) {
    const removeProject = await api.delete(`/repositories/${id}`);
    
    if(!removeProject) {
      return alert('Error');
    }

    const projectExclude = repository.filter(project => {
     return project.id !== id;
    });

    setRepository(projectExclude);
  };

  return (
    <div>
      <ul data-testid="repository-list">
        { 
          repository.map(project => (
            <>
              <li key={`item${project.id}`}>{project.title}</li>
              <button key={`button${project.id}`} onClick={() => handleRemoveRepository(project.id)}>Remover</button>
            </>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

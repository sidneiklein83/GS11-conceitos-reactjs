import React, { useEffect, useState } from "react";
import "./styles.css";

import api from './services/api';

function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      // console.log(response);
      setDados(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: 'https://github.com/sidneiklein83/MasBah.git'
    });

    //Adiciona ao array de objetos
    const object = response.data;
    setDados([...dados, object]);
  }

  async function handleRemoveRepository(id) {
    // console.log('id: ' + id);
    const url = `repositories/${id}`
    const response = await api.delete(url);
    //
    if (response.status === 204) {
      //console.log(response);
      setDados(dados.filter((repository) => (repository.id !== id)));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {dados.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

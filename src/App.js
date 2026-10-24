import React, { useState } from "react"
import "./App.css"

function App(){
  const [inputCep, setInputCep] = useState('')      // O que o usuário digita no input
  const [dadosCep, setDadosCep] = useState(null)    // Os dados que voltam da API (começa vazio/null)

  function loadCep(){
    // Se o usuário não digitar nada, podemos parar por aqui
    if(inputCep === ''){
      alert('Digite um CEP!');
      return;
    }

    let url = `https://viacep.com.br/ws/${inputCep}/json/`;

    fetch(url)
    .then((r) => r.json())
    .then((json) => {
      console.log(json);
      setDadosCep(json); // Guarda o endereço encontrado no estado
    })
    .catch((error) => {
      console.log("Não foi possível carregar a API");
    });

    setInputCep('')
  }

  return(
    <div className="container">

      <header>
       <h1>Buscador de CEP</h1>
       <div className="nav">
        <a>Home</a>
        <a>Favoritos</a>
        <a>Sair</a>
       </div>


      </header>
      

      {/* Área do input e botão */}
      <div className="container-input">
        <input 
          type="text" 
          placeholder="Digite o CEP " 
          value={inputCep} 
          onChange={(e) => setInputCep(e.target.value)}
        />
        <button onClick={loadCep}>Buscar</button>
        <h3>(ex: 01001000)</h3>
      </div>

      {/* Se o objeto dadosCep existir e não tiver erro, mostra na tela */}
      {dadosCep && (
        <div className="resultado">
          <strong>CEP:</strong> {dadosCep.cep}
          <p><strong>Rua:</strong> {dadosCep.logradouro}</p>
          <p><strong>Bairro:</strong> {dadosCep.bairro}</p>
          <p><strong>Cidade:</strong> {dadosCep.localidade} - {dadosCep.uf}</p>
        </div>
      )}
    </div>
  )
}

export default App;
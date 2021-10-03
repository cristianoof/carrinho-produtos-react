import React, { useState, useEffect } from 'react'
import './style.css'

function ListaProdutos({add}) {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:5000/api/Produtos", requestOptions)
      .then(response => response.json())
      .then(result => setProdutos(result))
      .catch(error => console.log('error', error))
  }, [])

  return (
    <div className="container">
      <h2>Listagem Produtos</h2>
      <div className="lista-produtos">
        {produtos.map((produto) => (
          <div key={produto.id} className={"produto"}>
            <div className={"foto"}>Foto</div>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <span>{produto.precoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            <button onClick={() => add(produto)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListaProdutos
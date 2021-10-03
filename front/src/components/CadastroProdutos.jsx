import React, { useState } from 'react'
import './style.css'

function CadastroProdutos() {
  const [sucessoCadastro, setSucessoCadastro] = useState(false)
  
  function cadastrar({produto}){
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    
      var raw = JSON.stringify({
        "nome": produto.nome,
        "descricao": produto.descricao,
        "precoVenda": produto.precoVenda,
        "precoCusto": produto.precoCusto,
        "quantidadeEstoque": produto.quantidadeEstoque
      })
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }
    
      fetch("http://localhost:5000/api/Produtos", requestOptions)
      .then((response) => {
        if(response.ok){
          setSucessoCadastro(true)
        }
      })
      .catch(error => console.log('error', error));
  }
  
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [precoCusto, setPrecoCusto] = useState(0)
  const [margem, setMargem] = useState(0)
  const [precoVenda, setPrecoVenda] = useState(0)
  const [quantidadeEstoque, setQuantidadeEstoque] = useState(0)
  
  const valorMargem = precoCusto * margem
  const precoDeVenda = parseFloat(valorMargem) + parseFloat(precoCusto)  

  return (
    <div className="container">
      <h2>Cadastro de Produtos</h2>
      {sucessoCadastro ? <span className="sucesso">Cadastro realizado com sucesso!</span> : ""}
      <form 
        onSubmit={(event) => {
          event.preventDefault()
          const produto = {
            "nome": nome,
            "descricao": descricao,
            "precoVenda": precoDeVenda,
            "precoCusto": parseFloat(precoCusto),
            "quantidadeEstoque": parseInt(quantidadeEstoque)
          }
          cadastrar({produto})
        }}
      >
        <div className="formulario">
          <label>Nome do Produto</label>
          <input
            type="text"
            name="nome"
            placeholder="Nome do produto"

            value={nome}
            onChange={(event) => {
              var tempNome = event.target.value
              if(tempNome.length >= 50){
                tempNome = tempNome.substr(0, 50)
              }
              setNome(tempNome)
            }}/>
        </div>

        <div className="formulario">
          <label>Descrição do Produto</label>
          <textarea
            name="descricao" 
            placeholder="Descrição do produto"
            rows="5"

            value={descricao}
            onChange={(event) => {
              var tempDescricao = event.target.value
              if(tempDescricao.length >= 200){
                tempDescricao = tempDescricao.substr(0, 200)
              }
              setDescricao(tempDescricao)
            }}/>
        </div>

        <div className="formulario">  
          <label>Preço de Custo</label>
          <input onBlur={(event) => {
              setPrecoCusto(event.target.value)
            }}
            type="number" 
            step="0.01"
            name="precoCusto" 
            placeholder="Preço de custo"
            onChange={(event) => {
              setPrecoCusto(event.target.value)
            }}/>
        </div>

        <div className="formulario">  
          <label>Margem de lucro %</label>
          <input onBlur={(event) => {
              setMargem(event.target.value / 100)
            }}
            type="number"
            step="0.01"
            name="margem"
            placeholder="Margem de lucro %"
          />
        </div>

        <div className="formulario">  
          <label>Preço de Venda</label>
          <input 
            value={precoDeVenda} 
            type="number"
            step="0.01"
            name="precoVenda" 
            placeholder="Preço de venda"
            />
        </div>

        <div className="formulario">          
          <label>Quantidade Estoque</label>
          <input 
            type="number" 
            name="quantidadeEstoque" 
            placeholder="Quantidade"
            onChange={(event) => {
              setQuantidadeEstoque(event.target.value)
            }}/>
        </div>
        <button className="btn-cadastrar">Cadastrar</button>
      </form>
    </div>
  )
}

export default CadastroProdutos
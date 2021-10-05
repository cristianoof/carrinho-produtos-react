import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function CadastroProdutos() {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [precoCusto, setPrecoCusto] = useState()
  const [margem, setMargem] = useState()
  const [precoVenda, setPrecoVenda] = useState(0)
  const [quantidadeEstoque, setQuantidadeEstoque] = useState()
  const [imagemProduto, setImagemProduto] = useState('')
  
  const [sucessoCadastro, setSucessoCadastro] = useState(false)
  const [erroCadastro, setErroCadastro] = useState(false)
  
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
      .then(response => response.json())
      .then((result) => {
        if(result.id){
          var idImagem = result.id
          var formdata = new FormData();
          formdata.append("arquivo", imagemProduto, `${idImagem}.jpg`)

          var requestOptionsImg = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
          }

          fetch("http://localhost:5000/api/Produtos/upload-imagem-produto", requestOptionsImg)
            .then((response) => {
              if(response.ok){
                setSucessoCadastro(true)
                setNome("")
                setDescricao("")
                setPrecoCusto(0)
                setMargem(0)
                setPrecoVenda(0)
                setQuantidadeEstoque(0)
                setImagemProduto('')
              }
            })
            .catch(error => console.log('error', error))
        }
      })
      .catch((error) => {
        console.log('error', error)
        if(error){
          setErroCadastro(true)
        }
      })
  }

  return (
    <main>
      <div className="container">
        <h2>Cadastro de Produtos</h2>
        {sucessoCadastro ? <span className="sucesso-cadastro">Cadastro realizado com sucesso!</span> : ""}
        {erroCadastro ? <span className="erro-cadastro">Ocorreu um erro, tente mais tarde!</span> : ""}
        <div>
          <Link to="/produtos/editar">Editar Produto</Link>
        </div>
        <form 
          onSubmit={(event) => {
            event.preventDefault()
            const produto = {
              "nome": nome,
              "descricao": descricao,
              "precoVenda": precoVenda,
              "precoCusto": parseFloat(precoCusto),
              "quantidadeEstoque": parseInt(quantidadeEstoque)
            }
            cadastrar({produto})
          }}
        >
          <div className="formulario">
            <label>Nome do Produto</label>
            <input
              value={nome}
              type="text"
              name="nome"
              placeholder="Nome do produto (max 50 caracteres)"
              required
              onChange={(event) => {
                var tempNome = event.target.value
                if(tempNome.length >= 50){
                  tempNome = tempNome.substr(0, 50)
                }
                setNome(tempNome)
              }}
            />
          </div>

          <div className="formulario">
            <label>Descrição do Produto</label>
            <textarea
              value={descricao}
              name="descricao" 
              placeholder="Descrição do produto (max 200 caracteres)"
              rows="5"
              required
              onChange={(event) => {
                var tempDescricao = event.target.value
                if(tempDescricao.length >= 200){
                  tempDescricao = tempDescricao.substr(0, 200)
                }
                setDescricao(tempDescricao)
              }}
            />
          </div>

          <div className="formulario">  
            <label>Preço de Custo</label>
            <input
              type="number" 
              step="0.01"
              name="precoCusto" 
              placeholder="Preço de custo"
              required
              onChange={(event) => {
                setPrecoCusto(event.target.value)
              }}
              onBlur={(event) => {
                if(precoVenda !== 0){
                  let tmpMargem = 0
                  tmpMargem = ((precoVenda - precoCusto) / precoCusto) * 100
                  setMargem(tmpMargem.toFixed(2))
                }
              }}
            />
          </div>

          <div className="formulario">  
            <label>Margem de lucro %</label>
            <input 
              value={margem}
              type="number"
              step="0.01"
              name="margem"
              placeholder="Margem de lucro %"
              onChange={(event) => {
                let tmpPrecoVenda = 0
                let tmpMargem = event.target.value
                setMargem(tmpMargem)
                tmpMargem = parseFloat(tmpMargem) /100
                tmpPrecoVenda = (parseFloat(tmpMargem * precoCusto)) + parseFloat(precoCusto)
                setPrecoVenda(tmpPrecoVenda)
              }}
              onBlur={(event) => {
                let tmpMargem = parseFloat(event.target.value)
                setMargem(tmpMargem.toFixed(2))
              }}
            />
          </div>

          <div className="formulario">  
            <label>Preço de Venda</label>
            <input 
              value={precoVenda} 
              type="number"
              step="0.01"
              name="precoVenda" 
              placeholder="Preço de venda"
              required
              onChange={(event) => {
                setPrecoVenda(event.target.value)
              }}
              onBlur={(event) => {
                let tmpMargem = 0
                tmpMargem = ((precoVenda - precoCusto) / precoCusto) * 100
                setMargem(tmpMargem.toFixed(2))
                setPrecoVenda(event.target.value)
              }}
            />
          </div>

          <div className="formulario">          
            <label>Quantidade Estoque</label>
            <input 
              type="number" 
              name="quantidadeEstoque" 
              placeholder="Quantidade"
              required
              onChange={(event) => {
                setQuantidadeEstoque(event.target.value)
              }}
            />
          </div>

          <div className="formulario">          
            <label>Foto do Produto (Formato ideal quadrado)</label>
            <input 
              type="file" 
              name="imagemProduto"
              accept="image/*"
              required
              onChange={(event) => {
                setImagemProduto(event.target.files[0])
              }}
            />
          </div>

          <button className="btn-cadastrar">Cadastrar</button>
        </form>
      </div>
    </main>
  )
}

export default CadastroProdutos
import React, { useState } from 'react'
import './style.css'

function CadastroProdutos() {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [precoCusto, setPrecoCusto] = useState('')
  const [margem, setMargem] = useState('')
  const [precoVenda, setPrecoVenda] = useState('')
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('')
  const [imagemProduto, setImagemProduto] = useState('')

  const [validacaoPCusto, setValidacaoPCusto] = useState(true)
  const [validacaoPVenda, setValidacaoPVenda] = useState(true)
  const [validacaoQuantidade, setValidacaoQuantidade] = useState(true)
  
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
                setPrecoCusto('')
                setMargem('')
                setPrecoVenda('')
                setQuantidadeEstoque('')
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
            if(produto.precoCusto === 0 || produto.precoCusto === ""){
              setValidacaoPCusto(false)
            }
            else if(produto.precoVenda === 0 || produto.precoVenda === ""){
              setValidacaoPVenda(false)
            }
            else if(produto.quantidadeEstoque === 0 || produto.quantidadeEstoque === ""){
              setValidacaoQuantidade(false)
            }
            else{
              cadastrar({produto})
            }
          }}
        >
          <div className="formulario-cadastro-produto">
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

          <div className="formulario-cadastro-produto">
            <label>Descri????o do Produto</label>
            <textarea
              value={descricao}
              name="descricao" 
              placeholder="Descri????o do produto (max 200 caracteres)"
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
          
          <div className="formulario-cadastro-produto">  
            <label>Pre??o de Custo</label>
            <input
              value={precoCusto}
              type="number" 
              step="0.01"
              name="precoCusto" 
              placeholder="Pre??o de custo"
              required
              onChange={(event) => {
                setPrecoCusto(event.target.value)
              }}
              onBlur={(event) => {
                let tmpMargem = 0
                tmpMargem = ((precoVenda - precoCusto) / precoCusto) * 100
                if(tmpMargem > 0){
                  setMargem(tmpMargem.toFixed(2))
                }
                if(event.target.value <= 0){
                  setValidacaoPCusto(false)
                }
                else{
                  setValidacaoPCusto(true)
                }
              }}
            />
            {validacaoPCusto === false ? <span>Erro: O pre??o de custo deve ser maior que zero!</span> : "" }
          </div>

          <div className="formulario-cadastro-produto">  
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

          <div className="formulario-cadastro-produto">  
            <label>Pre??o de Venda</label>
            <input 
              value={precoVenda} 
              type="number"
              step="0.01"
              name="precoVenda" 
              placeholder="Pre??o de venda"
              required
              onChange={(event) => {
                setPrecoVenda(event.target.value)
              }}
              onBlur={(event) => {
                let tmpMargem = 0
                tmpMargem = ((precoVenda - precoCusto) / precoCusto) * 100
                
                if(event.target.value <= 0){
                  setValidacaoPVenda(false)
                }
                else{
                  setValidacaoPVenda(true)
                  setMargem(tmpMargem.toFixed(2))
                  setPrecoVenda(event.target.value)
                }
              }}
            />
            {validacaoPVenda === false ? <span>Erro: O pre??o de venda deve ser maior que zero!</span> : "" }
          </div>

          <div className="formulario-cadastro-produto">          
            <label>Quantidade Estoque</label>
            <input
              value={quantidadeEstoque}
              type="number" 
              name="quantidadeEstoque" 
              placeholder="Quantidade"
              required
              onChange={(event) => {
                setQuantidadeEstoque(event.target.value)
              }}
              onBlur={(event) => {
                if(event.target.value <= 0){
                  setValidacaoQuantidade(false)
                }
                else{
                  setValidacaoQuantidade(true)
                }
              }}
            />
            {validacaoQuantidade === false ? <span>Erro: A quantidade deve ser maior que zero!</span> : "" }
          </div>

          <div className="formulario-cadastro-produto">          
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
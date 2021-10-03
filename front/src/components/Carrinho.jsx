import React from 'react'
import './style.css'

function Carrinho ({carrinho, remove, limparCarrinho, aumentarQuantidade, diminuiQuantidade}) {
 
  const totalCarrinho = Object.keys(carrinho).reduce((prev, curr) =>{
    return prev + carrinho[curr].qtd * carrinho[curr].item.precoVenda
  }, 0)

  const totalItens = Object.keys(carrinho).length

  return(
    <div className="container">
      <h2>Carrinho de Produtos</h2>
      {totalItens === 0 ? "" : <h3>Total Carrinho = {totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>}
      {totalItens === 0 ? "" : <button onClick={() => limparCarrinho()}>Limpar Carrinho</button>}
      {totalItens === 0 ? <span>Carrinho vazio...</span> : ""}
      <div className="lista-carrinho">
          {Object.keys(carrinho).map((item, i) => {
            return (
              <div key={carrinho[item].item.id} className="item-carrinho">
                <div className="foto">Foto</div>
                <div className="descricao-item-carrinho">
                  <h3>{carrinho[item].item.nome}</h3>
                  <p>{carrinho[item].item.descricao}</p>
                </div>
                <a href onClick={() => diminuiQuantidade(carrinho[item].item)}>-</a>
                <p>{carrinho[item].qtd}</p>
                <a href onClick={() => aumentarQuantidade(carrinho[item].item)}>+</a>
                <button onClick={() => remove(carrinho[item].item.id)}>Remover</button>
                <span>Subtotal = {(carrinho[item].item.precoVenda * carrinho[item].qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>)
            })}
        </div>
    </div>
  )
}

export default Carrinho
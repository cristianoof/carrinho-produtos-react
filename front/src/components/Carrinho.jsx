import React from 'react'
import './style.css'

function Carrinho ({carrinho, remove, limparCarrinho, aumentarQuantidade, diminuiQuantidade}) {
 
  const totalCarrinho = Object.keys(carrinho).reduce((prev, curr) =>{
    return prev + carrinho[curr].qtd * carrinho[curr].item.precoVenda
  }, 0)

  const totalQtdProdutos = Object.keys(carrinho).reduce((prev, curr) =>{
    return prev + carrinho[curr].qtd
  }, 0)

  const totalItens = Object.keys(carrinho).length

  return(
    <main>
      <div className="container">
        <h2>Carrinho de Produtos</h2>
        {totalItens === 0 ? "" :
        <div className="total-carrinho">
          <p>Total Itens ({totalItens})</p>
          <p>Total Qtd Produtos ({totalQtdProdutos})</p>
          <h3>Total Carrinho {totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
          <button className="btn-limpar-carrinho" onClick={() => limparCarrinho()}>Limpar Carrinho</button>
        </div>}
        {totalItens === 0 ? <div className="carrinho-vazio"><span>Carrinho vazio...</span></div> : ""}

        <table>
          {totalItens === 0 ? "" :
          <thead> 
            <tr>
              <th colspan="2">Produto</th>
              <th>Quantidade</th>
              <th>Valor Unit.</th>
              <th>SubTotal</th>
            </tr>
          </thead>}
          {Object.keys(carrinho).map((item, i) => {
            return (
              <tr className="itens-carrinho" key={carrinho[item].item.id}>
                <td id="img"><img className="foto-produto-small" src={`http://localhost:5000/produtos-imagens/${carrinho[item].item.id}.jpg`} alt={carrinho[item].item.nome}/></td>
                <td id="descricao"><b>{carrinho[item].item.nome}</b><br/><p className="itens-carrinho-descricao">{carrinho[item].item.descricao}</p></td>
                <td id="quantidade">
                  <div className="flex-quantidade">
                    <a href onClick={() => diminuiQuantidade(carrinho[item].item)}>-</a>
                    <p>{carrinho[item].qtd}</p>
                    <a href onClick={() => aumentarQuantidade(carrinho[item].item)}>+</a>
                  </div>
                  <div className="flex-quantidade">
                    <button onClick={() => remove(carrinho[item].item.id)}>Remover Item</button>
                  </div>
                </td>
                <td id="valor-unitario" className="preco"><span>Valor Unit.</span>{carrinho[item].item.precoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td id="subtotal" className="preco"><span>Subtotal</span><b>{(carrinho[item].item.precoVenda * carrinho[item].qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></td>
              </tr>
            )
          })}
        </table>
      </div>
    </main>
  )
}

export default Carrinho
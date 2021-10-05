import React from 'react'
import './style.css'

function EditarProdutos ({carrinho, remove, limparCarrinho, aumentarQuantidade, diminuiQuantidade}) {
 
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
        <h2>Editar Produtos</h2>
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
          <tr>
            <th colspan="2">Produto</th>
            <th>Quantidade</th>
            <th>Valor Unit.</th>
            <th>SubTotal</th>
          </tr>}
          {Object.keys(carrinho).map((item, i) => {
            return (
              <tr className="itens-carrinho" key={carrinho[item].item.id}>
                <td style={{width: "110px"}}><img className="foto" style={{ width: "100px", height: "100px" }} src={`http://localhost:5000/produtos-imagens/${carrinho[item].item.id}.jpg`} alt={carrinho[item].item.nome}/></td>
                <td><b>{carrinho[item].item.nome}</b><br/>{carrinho[item].item.descricao}</td>
                <td>
                  <div className="flex-quantidade">
                    <a href onClick={() => diminuiQuantidade(carrinho[item].item)}>-</a>
                    <p>{carrinho[item].qtd}</p>
                    <a href onClick={() => aumentarQuantidade(carrinho[item].item)}>+</a>
                  </div>
                  <div className="flex-quantidade">
                    <button onClick={() => remove(carrinho[item].item.id)}>Remover Item</button>
                  </div>
                </td>
                <td style={{ textAlign: "center" }} className="preco">{carrinho[item].item.precoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td className="preco"><b>{(carrinho[item].item.precoVenda * carrinho[item].qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></td>
              </tr>
            )
          })}
        </table>
      </div>
    </main>
  )
}

export default EditarProdutos
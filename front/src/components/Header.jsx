import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Header ({carrinho}) {

  const totalItens = Object.keys(carrinho).length

  return (
    <header className="header">
      <div className="itens-header">
        <h1>Loja.<b>Teste</b></h1>
        <div>
          <Link to="/">Home</Link>
          <Link to="/produtos/cadastrar">Cadastrar</Link>
          <Link to="carrinho">Carrinho {totalItens === 0 ? "" : totalItens}</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
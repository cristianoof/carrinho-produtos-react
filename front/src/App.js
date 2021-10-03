import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CadastroProdutos from './components/CadastroProdutos'
import Header from './components/Header'
import ListaProdutos from './components/ListaProdutos'
import Carrinho from './components/Carrinho'


function App() {

  const [carrinho, setCarrinho] = useState({})

  function handleAddItemCarrinho(item){
    setCarrinho((old) => {
      let qtd = 0
      if(old[item.id]){
        qtd = old[item.id].qtd
      }
      return {...old, [item.id]:{
        qtd: qtd + 1,
        item
      }}})
  }

  function handleRemoveItemCarrinho(itemId){
    delete carrinho[itemId]
    setCarrinho({...carrinho})
  }

  function aumentarQuantidade(item){
    setCarrinho((old) => {
      let qtd = 0
      if(old[item.id]){
        qtd = old[item.id].qtd
      }
      return {...old, [item.id]:{
        qtd: qtd + 1,
        item
      }}})
  }

  function diminuiQuantidade(item){
    setCarrinho((old) => {
      let qtd = 0
      if(old[item.id]){
        qtd = old[item.id].qtd
      }
      return {...old, [item.id]:{
        qtd: qtd === 1 ? 1 : qtd - 1,
        item
      }}})
  }

  function limparCarrinho(){
    setCarrinho({})
  }

  return (
    <Router>
      <Header carrinho={carrinho}/>
      <Switch>
        <Route exact path='/'>
          <ListaProdutos add={handleAddItemCarrinho}/>
        </Route>
        <Route path='/cadastro'>
          <CadastroProdutos />
        </Route>
        <Route path='/carrinho'>
          <Carrinho carrinho={carrinho} add={handleAddItemCarrinho} remove={handleRemoveItemCarrinho} limparCarrinho={limparCarrinho} aumentarQuantidade={aumentarQuantidade} diminuiQuantidade={diminuiQuantidade}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App

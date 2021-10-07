# Listagem de Produtos e add ao Carrinho

## Pré requisitos para rodar o projeto

* Ter o [Dotnet SDK](https://dotnet.microsoft.com/download) instalado na Versão >=5.*
* Ter o [Node](https://nodejs.org/en/download/) instalado na Versão >=12.18.*
* Ter o gerenciador de pacotes [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) instalado na Versão >=1.22.*
* Faça o download do projeto zip aqui do Github


## Instalando o projeto React e suas dependências

Abrir a pasta do projeto **/front** no terminal e digitar o comando:
```
npm install
```
*Aguardar terminar a instalação.*

## Dotnet - Backend

Abrir a pasta do projeto **/WebApi/WebApi** no terminal e digitar o comando:
```
dotnet run
```

*O servidor subirá no enderço http://localhost:5000*

![terminal dotnet](https://github.com/cristianoof/carrinho-produtos-react/blob/main/_imgs-do-projeto/terminal-dotnet.jpg?raw=true)


## React - Frontend

Abrir a pasta **/front** no terminal e digitar o comando:
```
yarn start
```

*A aplicação subirá no enderço http://localhost:3000* você poderá acessá-la no browser.

![terminal yarn](https://github.com/cristianoof/carrinho-produtos-react/blob/main/_imgs-do-projeto/terminal-yarn.jpg?raw=true)

<br/>
Ao abrir o localhost:3000 no browser a página home com a listagem dos produtos é carregada, onde poderá adicionar os produtos ao carrinho.

![Pg Home](https://github.com/cristianoof/carrinho-produtos-react/blob/main/_imgs-do-projeto/home.jpg?raw=true)

<br/>
Clicando no botão (Adicionar ao Carrinho) o item é adicionando e no menu (Carrinho) no cabeçalho é iniciado a contagem dos itens. A contagem é somente de itens, logo se clicar mais de uma vez no mesmo produto a contagem de intem não se altera, porém dentro do carrinho a quantidade do produto é alterada conforme a quantidade de cliques.

![Pg Home add produto](https://github.com/cristianoof/carrinho-produtos-react/blob/main/_imgs-do-projeto/home-add-item.jpg?raw=true)

<br/>
Ao clicar no menu (Carrinho) no cabeçalho será direcionado para página do carrinho, onde teremos os itens adicionados e as informações: *Total Itens, Total Qtd Produtos, Total do Carrinho*. Em cada item tem a informação de *Valor Unitário* e *Subtotal*.

![pg carrinho](https://github.com/cristianoof/carrinho-produtos-react/blob/main/_imgs-do-projeto/carrinho.jpg?raw=true)

<br/>
Clicando no botão de (+) no item, a quantidade é incrementada e o subtotal do item e total do carrinho recalculados. A operação inversa ocorre ao clicar no botão de (-).
Clicando no botão (Remover Item) o item expecífico é removido e os valores recalculados. Clicando no botão (Limpar Carrinho) todos os itens são removidos e o carrinho fica vazio.

![pg carrinho add](https://github.com/cristianoof/carrinho-produtos-react/blob/main/_imgs-do-projeto/carrinho-add-produtos.jpg?raw=true)

<br/>
Ao clicar no menu (Cadastrar) no cabeçalho será direcionado para página de cadastro de produto. Deverá preencher todos os campos e inserir uma imagem para cadastrar um produto.
Opcionalmente é possível informar um valor de *Margem de Lucro* para calcular o *Preço de Venda*.

![cadastro produto](https://github.com/cristianoof/carrinho-produtos-react/blob/main/_imgs-do-projeto/cadastro-produtos.jpg?raw=true)

<br/>
Todas as operações acima são possíveis de serem realizadas em Tablet ou Celular, pois o layout ficou responsivo. Abaixo as telas de como ficou a visualização em mobile:

![telas mobile](https://github.com/cristianoof/carrinho-produtos-react/blob/main/_imgs-do-projeto/mobile.jpg?raw=true)

<br/>

### *Todas as imagens e valores de produtos são meramente ilustrativos para o projeto.*

*Projeto realizado por **Cristiano Fernandes***
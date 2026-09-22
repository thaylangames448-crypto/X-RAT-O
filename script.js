/* =========================================
   MENU
========================================= */

function abrirMenu() {

    const menu = document.getElementById("menu");

    menu.classList.toggle("ativo");

}



/* =========================================
   CARRINHO
========================================= */

let carrinho = [];



/* =========================================
   ADICIONAR PRODUTO
========================================= */

function adicionarCarrinho(nome, preco) {

    const produtoExistente = carrinho.find(
        item => item.nome === nome
    );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: preco,

            quantidade: 1

        });

    }


    atualizarCarrinho();

    abrirCarrinho();

}



/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function atualizarCarrinho() {

    const container =
        document.getElementById("itens-carrinho");

    const totalElemento =
        document.getElementById("total-carrinho");

    const contador =
        document.getElementById("contador-carrinho");


    container.innerHTML = "";


    let total = 0;

    let quantidadeTotal = 0;



    if (carrinho.length === 0) {

        container.innerHTML = `

            <p class="carrinho-vazio">
                Seu carrinho está vazio.
            </p>

        `;

    }



    carrinho.forEach((item, index) => {

        const subtotal =
            item.preco * item.quantidade;


        total += subtotal;

        quantidadeTotal += item.quantidade;



        container.innerHTML += `

            <div class="item-carrinho">


                <div class="informacoes-item">

                    <h3>
                        ${item.nome}
                    </h3>

                    <p>
                        R$ ${item.preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </p>

                </div>



                <div class="controles-item">

                    <button
                        onclick="diminuirQuantidade(${index})"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantidade}
                    </span>


                    <button
                        onclick="aumentarQuantidade(${index})"
                    >
                        +
                    </button>

                </div>



                <strong class="subtotal">

                    R$ ${subtotal
                        .toFixed(2)
                        .replace(".", ",")}

                </strong>



                <button
                    class="remover-item"
                    onclick="removerItem(${index})"
                    aria-label="Remover produto"
                >
                    🗑
                </button>


            </div>

        `;

    });



    totalElemento.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;


    contador.textContent =
        quantidadeTotal;

}



/* =========================================
   AUMENTAR QUANTIDADE
========================================= */

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();

}



/* =========================================
   DIMINUIR QUANTIDADE
========================================= */

function diminuirQuantidade(index) {

    carrinho[index].quantidade--;


    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }


    atualizarCarrinho();

}



/* =========================================
   REMOVER PRODUTO
========================================= */

function removerItem(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}



/* =========================================
   ABRIR CARRINHO
========================================= */

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    const fundo =
        document.getElementById("fundo-carrinho");


    carrinhoElemento.classList.add("aberto");

    fundo.classList.add("ativo");

}



/* =========================================
   FECHAR CARRINHO
========================================= */

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    const fundo =
        document.getElementById("fundo-carrinho");


    carrinhoElemento.classList.remove("aberto");

    fundo.classList.remove("ativo");

}



/* =========================================
   FINALIZAR PEDIDO
========================================= */

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }


    let mensagem =
        "🍔 *PEDIDO - X RATÃO*%0A%0A";


    let total = 0;



    carrinho.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;


        total += subtotal;


        mensagem +=
            `${item.quantidade}x ${item.nome} - R$ ${subtotal
                .toFixed(2)
                .replace(".", ",")}%0A`;

    });



    mensagem +=
        `%0A💰 *TOTAL: R$ ${total
            .toFixed(2)
            .replace(".", ",")}*`;



    /*
       COLOQUE AQUI O NÚMERO
       DO WHATSAPP DA HAMBURGUERIA.

       Exemplo:

       5533999999999
    */

    const telefone = 5533999498677
        "SEU_NUMERO_AQUI";



    window.open(
        `https://wa.me/${telefone}?text=${mensagem}`,
        "_blank"
    );

}
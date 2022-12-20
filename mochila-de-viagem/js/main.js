const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens= JSON.parse(localStorage.getItem("itens")) || [];


itens.forEach((elemento) => {
    criaElemento(elemento)
});

function criaElemento(itemAtual) {

    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numItem = document.createElement('strong');
    numItem.innerHTML = itemAtual.quantidade;
    numItem.dataset.id = itemAtual.id

    novoItem.appendChild(numItem)
    novoItem .innerHTML += itemAtual.nome
    novoItem.appendChild(botaoDeleta(itemAtual.id))
    lista.appendChild(novoItem);
}

function deletaElemento(tag, id){
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id),1); 
    localStorage.setItem("itens",  JSON.stringify(itens));
}

function atualizaElemento(itemAtual){
    document.querySelector("[data-id='"+itemAtual.id+"']").innerHTML = itemAtual.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X"
    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const itemExiste = itens.find(elemento => elemento.nome === nome.value)
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value 
    }

    if(itemExiste){
        itemAtual.id = itemExiste.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === itemExiste.id)] = itemAtual
    }else{
        itemAtual.id = itens[itens.length -1] ? itens[itens.length -1].id+1 : 0;
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }

    localStorage.setItem("itens",  JSON.stringify(itens));
    
    nome.value = ""
    quantidade.value = ""
})


let nomeCidade = document.querySelector(".Nome-Cidade h2")
let graus = document.querySelector(".Graus")


async function Clima(){

    let inputCidade = document.querySelector(".background input");

    let cidade = inputCidade.value;

  

    try {

      

        const resposta = await fetch(`http://localhost:3000/clima/${cidade}`);

        console.log("Depois do fetch");
        

        const dados = await resposta.json();



        console.log(dados);


        nomeCidade.innerHTML = dados.name
       graus.innerHTML = dados.main.temp

    }
    catch(error){
        console.log("ERRO:", error);
    }
}
let buttonCidade = document.querySelector(".background i").addEventListener("click",()=>{
    Clima()    
    })
console.log("SCRIPT CARREGOU");

let valoremail = document.querySelector("#email");
let valorsenha = document.querySelector("#password");
let checkbox = document.querySelector("#termos");
let button = document.querySelector(".enviar");


button.addEventListener("click", () => {
    if (validadaDados()) {
        enviarDados();
    }
});

function validadaDados() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let email = valoremail.value;
    let password = valorsenha.value;

    if (email === "" || !regexEmail.test(email)) {
        const divEmail = document.querySelector(".email");

        divEmail.classList.add("treme");

        setTimeout(() => {
            divEmail.classList.remove("treme");
        }, 300);

        return false;
    }

    if (password === "") {
        const divSenha = document.querySelector(".senha");

        divSenha.classList.add("treme");

        setTimeout(() => {
            divSenha.classList.remove("treme");
        }, 300);

        return false;
    }

    if (!checkbox.checked) {
        return false;
    }

    return true;
}
   

 async function enviarDados() {
    let resposta = await fetch("https://api-clima-ijt0.onrender.com/cadastro",{
        method:"POST",
       headers:{
    "Content-Type":"application/json"
},
        body: JSON.stringify({
          email:valoremail.value,
          senha:valorsenha.value 
        })
    })

  let dados = await resposta.json();

console.log(dados)

if (dados.estado === true) {
  
        window.location.href = "https://api-clima-ijt0.onrender.com/Clima/clima.html";
    
}

else{
 mostrarMensagem();
}

    valoremail.value = ""
    valorsenha.value = ""
   
 }

 function mostrarMensagem() {
    const card = document.createElement("div");
const mensagem = document.createElement("p");

card.classList.add("cardMensagem");

mensagem.innerText = "Não foi possível criar a conta.";

card.appendChild(mensagem);
body.appendChild(card);

setTimeout(() => {
    card.remove();
}, 3000);
}
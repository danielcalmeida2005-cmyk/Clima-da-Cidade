let valoremail = document.querySelector("#email")
let valorsenha = document.querySelector("#password")
let confirmasenha = document.querySelector("#confirm_password")
let button = document.querySelector(".enviar")
let body = document.querySelector("body")

button.addEventListener("click",()=>{
if(validadaDados()){
   enviarDados() 
}
    
})
function validadaDados(){
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = valoremail.value
    let password = valorsenha.value
    let confirmPassword = confirmasenha.value

    if(email === "" || !regexEmail.test(email) ){
const divEmail = document.querySelector(".email");

    divEmail.classList.add("treme");

    setTimeout(() => {
    divEmail.classList.remove("treme");
}, 300);
    return false;
    }

    if(password === "" || password !== confirmPassword){
const divsenha = document.querySelector(".senha");

    divsenha.classList.add("treme");

    setTimeout(() => {
    divsenha.classList.remove("treme");
}, 300);

  return false;
    }

    if(confirmPassword === ""){
       const divsenha = document.querySelector(".confirmSenha");

    divsenha.classList.add("treme"); 

    setTimeout(() => {
    divsenha.classList.remove("treme");
}, 300);
  return false;
    }
    return true
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
    setTimeout(() => {
        window.location.href = "https://api-clima-ijt0.onrender.com/Clima/index.html";
    }, 3000);
}

else{
 mostrarMensagem();
}

    valoremail.value = ""
    valorsenha.value = ""
    confirmasenha.value = ""


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
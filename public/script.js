const email = document.querySelector("#email");
const senha = document.querySelector("#password");
const inputs = document.querySelectorAll(".input");
let buttonEnviar = document.querySelector(".enviar")



buttonEnviar.addEventListener("click",(e)=>{
     e.preventDefault();
     
      if (validaDados()) {
        enviarDados();
    }
})
function validaDados() {
    let valorEmail = email.value.trim();
    let valorSenha = senha.value.trim();
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (valorEmail === "") {
    const divEmail = document.querySelector(".email");

    divEmail.classList.add("treme");

    setTimeout(() => {
        divEmail.classList.remove("treme");
    }, 300);
    return
}
else{
    if(!regexEmail.test(valorEmail)){
        return
    }
}

if (valorSenha === "") {
    const divsenha = document.querySelector(".senha");

    divsenha.classList.add("treme");

    setTimeout(() => {
        divsenha.classList.remove("treme");
    }, 300);
    return
}

    console.log("Dados válidos!");
}

async function enviarDados() {
 
    let respostadoBack = await fetch('https://api-clima-ijt0.onrender.com/login',{
        method: "POST",
        header:{"content-Type":"application/json"},
body: JSON.stringify({
    email:email.value,
    senha:senha.value
})
    });
     
    let dados = await respostadoBack.json()

if (dados.estado === true) {
    setTimeout(() => {
        window.location.href = "https://api-clima-ijt0.onrender.com/Clima/index.html";
    }, 3000);
}

}
let nomeCidade = document.querySelector(".Nome-Cidade h2")
let ProbalidadeDechuva = document.querySelector(".Nome-Cidade .Probali")
let graus = document.querySelector(".Graus")
let cards = document.querySelector(" .painel .cards")
async function Clima() {

    let inputCidade = document.querySelector(".background input");

    let cidade = inputCidade.value;

    console.log("Cidade digitada:", cidade);

    try {

        console.log("Antes do fetch");

        const resposta = await fetch(`http://localhost:3000/clima/${cidade}`);
        // console.log("Depois do fetch");
        const dados = await resposta.json();
        // console.log("Dados recebidos:");
        console.log(dados);

        nomeCidade.innerHTML = dados.clima.name;
        graus.innerHTML = `${Math.round(dados.clima.main.temp)}°C`;
        ProbalidadeDechuva.innerHTML = `Chances de chuva ${dados.previsao.list[0].pop * 100}%`;




        for (let i = 0; i < 4; i++) {

            let climaHora = document.createElement("div");
            let pHora = document.createElement("p");
            let icon = document.createElement("img");
            let pTemp = document.createElement("p");

            climaHora.className = "climaHora";
            pHora.className = "hora";
            icon.className = "icone";
            pTemp.className = "temperatura";

            const previsao = dados.previsao.list[i];

            console.log(previsao)

            pHora.textContent = previsao.dt_txt.split(" ")[1].slice(0, 5);
            icon.src = `https://openweathermap.org/img/wn/${previsao.weather[0].icon}@2x.png`;
            pTemp.textContent = `${Math.round(previsao.main.temp)}°C`;

            console.log(previsao);

            climaHora.appendChild(pHora)
            climaHora.appendChild(icon)
            climaHora.appendChild(pTemp)
            cards.appendChild(climaHora)
        }

    let SensacaoTermica = document.querySelector(".SensacaoTermica")
let PorcetagemDeChuva = document.querySelector(".PorcetagemDeChuva")
let velocidadeDoVento = document.querySelector(".velociVento h4")
let Uv = document.querySelector(".Uv h4")


SensacaoTermica.innerHTML = Math.round(dados.clima.main.feels_like);
PorcetagemDeChuva.innerHTML = `${dados.previsao.list[0].pop * 100}%`;

velocidadeDoVento.innerHTML =`${Math.round(dados.clima.wind.speed)} Km/h`
}
    catch (error) {
        console.log("ERRO:", error);
    }
}

let buttonCidade = document.querySelector(".background i").addEventListener("click", () => {
    Clima()
})
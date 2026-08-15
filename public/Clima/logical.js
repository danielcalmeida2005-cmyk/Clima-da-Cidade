
let body = document.querySelector("body")



const data = new Date();
const dia = String(data.getDate()).padStart(2, "0");
const mes = String(data.getMonth() + 1).padStart(2, "0");
const ano = data.getFullYear();

const DataCompleta = `${dia}/${mes}/${ano}`;





const menus = [
    // Menu principal
    {
        menu: "principal",
        nome: "history",
        icone: "fa-solid fa-cloud",
        evento: "Historico"
    },

    {
        menu: "principal",
        nome: "Save",
        icone: "fa-solid fa-map-location-dot",
        evento: "salvar"
    },
    {
        menu: "principal",
        nome: "Maps",
        icone: "fa-solid fa-map-location-dot",
        evento: "maps"
    },
    {
        menu: "principal",
        nome: "Settings",
        icone: "fa-solid fa-gear",
        evento: "configuracoes"
    },

    // Menu de configurações
    {
        menu: "configuracoes",
        nome: "theme",
        icone: "fa-solid fa-palette",
        evento: "tema"
    },

    {
        menu: "configuracoes",
        nome: "Language",
        icone: "fa-solid fa-language",
        evento: "idioma"
    },
    {
        menu: "configuracoes",
        nome: "Back",
        icone: "fa-solid fa-arrow-left",
        evento: "voltar"
    }
];

function executarAcao(acao) {
    switch (acao) {
        case "configuracoes":
            carregarMenu("configuracoes");
            break;

        case "Historico":
            Historico()
            break;

        case "maps":
            abrirMaps();
            break;

        case "salvar":
            salvarDados(dados)
            break
        case "tema":
            menuTema()
            break;

        case "idioma":

            break;

        case "voltar":
            carregarMenu("principal");
            break;
    }
}

// Menu do Aside
let opcoesMenu = document.querySelectorAll(".opcao-menu")
let historicoMenu = document.querySelector(".Historico")
let option = document.querySelector(".option")
let maps = document.querySelector(".maps")
let settings = document.querySelector(".settings")
let menuPrincipal = "principal";

// 
function carregarMenu(acao) {
    menuPrincipal = acao;

    let MenuFiltrado = menus.filter(menu => menu.menu === acao)

    MenuFiltrado.forEach((item, index) => {

        const botao = opcoesMenu[index];

        const icone = botao.querySelector("i");
        const texto = botao.querySelector("span");

        icone.className = item.icone;
        texto.textContent = item.nome;

    })
};

opcoesMenu.forEach((botao, index) => {

    botao.addEventListener("click", () => {
        const menuAtual = menus.filter(menu => menu.menu === menuPrincipal);

        executarAcao(menuAtual[index].evento);
    });
});


let conteudo = document.querySelector(".conteudo")
let containerHistorico = document.querySelector(".historico-container")
let GuardarDados = []



function pegarHora() {
    const agora = new Date();

    let hora = agora.getHours();
    let minuto = agora.getMinutes();

    minuto = String(minuto).padStart(2, "0");
    hora = String(hora).padStart(2, "0");

    return `${hora}:${minuto}`;
}



function salvarDados() {
    console.log(dados)
    const horaAtual = pegarHora()
    let clima = {
        cidade: dados.clima.name,
        data: DataCompleta,
        hora: horaAtual,
        temperatura: Math.round(dados.clima.main.temp),
        condicao: dados.clima.weather[0].main,
        icone: `https://openweathermap.org/img/wn/${dados.clima.weather[0].icon}@2x.png`
    };

    GuardarDados.push(clima)


}






function Historico() {

    containerHistorico.innerHTML = "";

    GuardarDados.forEach(item => {

        const card = document.createElement("div");
        card.className = "card-historico";

        // Primeira div
        const imagem = document.createElement("img");
        imagem.src = item.icone
        imagem.className = "card-imagem";

        // Segunda div
        const inforcard = document.createElement("div");
        inforcard.className = "card-conteudo";

        const cidade = document.createElement("h3");
        cidade.innerText = item.cidade;

        const topo = document.createElement("div");
        topo.className = "card-topo";

        const clima = document.createElement("strong");
        clima.innerText = item.condicao;

        const temperatura = document.createElement("strong");
        temperatura.innerText = `${item.temperatura}°C`;

        const baixo = document.createElement("div");
        baixo.className = "card-baixo";

        const data = document.createElement("span");
        data.innerText = item.data;

        const hora = document.createElement("span");
        hora.innerText = item.hora;

        topo.appendChild(temperatura);
        topo.appendChild(clima);

        baixo.appendChild(data);
        baixo.appendChild(hora);

        // Tudo fica dentro da div de conteúdo
        inforcard.appendChild(cidade);
        inforcard.appendChild(topo);
        inforcard.appendChild(baixo);

        // As duas divs ficam dentro do card
        card.appendChild(imagem);
        card.appendChild(inforcard);

        containerHistorico.appendChild(card);
    });

    conteudo.classList.toggle("aparece");



}




function abrirMaps() {
    const cidade = inputCidade.value.trim();

    if (!cidade) {
        alert("Digite uma cidade.");
        return;
    }

    window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cidade)}`
    );
}


function informacoesAdicionais(resposta) {

    let moreinfor = document.querySelector(".more-infor")

    moreinfor.innerHTML = ""





    moreinfor.innerHTML = ""

    const cards = [
        {
            nome: "Umidade",
            valor: resposta.clima.main.humidity + "%",
            icone: "fa-solid fa-droplet"
        },
        {
            nome: "Vento",
            valor: resposta.clima.wind.speed + " m/s",
            icone: "fa-solid fa-wind"
        },
        {
            nome: "Pressão",
            valor: resposta.clima.main.pressure + " hPa",
            icone: "fa-solid fa-gauge-high"
        },
        {
            nome: "Visibilidade",
            valor: (resposta.clima.visibility / 1000) + " km",
            icone: "fa-solid fa-eye"
        }
    ];

    cards.forEach(item => {


        let DivMoreInfor = document.createElement("div")
        DivMoreInfor.classList.add("DivMoreInfor")
        let icone = document.createElement("i")
        icone.className = item.icone
        let Divinfor = document.createElement("div")
        let h3Nome = document.createElement("h3")
        h3Nome.innerText = item.nome
        let number = document.createElement("strong")
        number.innerText = item.valor



        moreinfor.appendChild(DivMoreInfor)
        DivMoreInfor.appendChild(icone)
        DivMoreInfor.appendChild(Divinfor)

        Divinfor.appendChild(h3Nome)
        Divinfor.appendChild(number)



    })

}

// Tema 
const temas = [
    {
        nome: "Azul",
        fundo: "#0F2027",
        painel: "#D9ECFF",
        texto: "#172033",
        destaque: "#00C6FF"
    },

    {
        nome: "Cinza",
        fundo: "#232526",
        painel: "#DEE1E5",
        texto: "#202124",
        destaque: "#AAB2B8"
    },

    {
        nome: "Verde",
        fundo: "#0B3D2E",
        painel: "#D6F0E3",
        texto: "#17352A",
        destaque: "#00C878"
    },

    {
        nome: "Roxo",
        fundo: "#240046",
        painel: "#E3DAFF",
        texto: "#2B2145",
        destaque: "#9D4EDD"
    },

    {
        nome: "Padrao",
        fundo: mostraImagem
    }
];
let caixa = document.createElement("div");
caixa.classList.add("caixaMenu");

let setaParaCima = document.createElement("i");
setaParaCima.className = "fa-solid fa-chevron-up";
setaParaCima.classList.add("setaparacima");

let setaParaBaixo = document.createElement("i");
setaParaBaixo.className = "fa-solid fa-chevron-down";
setaParaBaixo.classList.add("setaparabaixo");

let PTema = document.createElement("p");
PTema.classList.add("Ptema")
PTema.innerText = "Padrao"

caixa.appendChild(setaParaCima);
caixa.appendChild(PTema);
caixa.appendChild(setaParaBaixo);

body.appendChild(caixa);




function menuTema() {
    caixa.classList.toggle("MenuAparece");
}


let posicaoAtual = 0
let temaAtual;
setaParaCima.addEventListener("click",()=>{
    if(posicaoAtual < temas.length - 1 ){
       posicaoAtual++  
    }
  
   atualizarTema()
})

setaParaBaixo.addEventListener("click",()=>{

    if(posicaoAtual > 0){
      posicaoAtual--  
    }
   atualizarTema()
})


function atualizarTema(){
    temaAtual = temas[posicaoAtual];
console.log(posicaoAtual)
 body.style.backgroundImage = "none";
body.style.background = temaAtual.fundo

PTema.innerText = temaAtual.nome



PTema.style.color = temaAtual.destaque

 if (typeof temaAtual.fundo === "function") {
        temaAtual.fundo();
    } else {
        body.style.background = temaAtual.fundo;
    }
}





//  cria o card e setas,trasnfom

// cria uma funcao que vai pecorre os valores
// cria dois button que faz um for menos leghnt para sabe se vai mostra o valor de cima ou de baixo
// cria uma funcao que atualiza as imagem
// um evento de click na imagem selecionada



// 
let nomeCidade = document.querySelector(".Nome-Cidade h2")
let ProbalidadeDechuva = document.querySelector(".Nome-Cidade .Probali")
let graus = document.querySelector(".Graus")
let cards = document.querySelector(" .painel .cards")
let inputCidade = document.querySelector(".background input");

let dados;
async function Clima(cidade) {

    if (cidade === "") {
        alert("preencha o campo")
        return
    }


    try {

        const resposta = await fetch(`https://api-clima-ijt0.onrender.com/clima/${cidade}`);

        dados = await resposta.json();


        informacoesAdicionais(dados)
        console.log(dados);

        nomeCidade.innerHTML = dados.clima.name;
        graus.innerHTML = `${Math.round(dados.clima.main.temp)}°C`;
        ProbalidadeDechuva.innerHTML = `Chance of Rain ${dados.previsao.list[0].pop * 100}%`;



        cards.innerHTML = "";
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

        let SensacaoTermica = document.querySelector(".feel_like")
        let PorcetagemDeChuva = document.querySelector(".PorcetagemDeChuva")
        let velocidadeDoVento = document.querySelector(".speedWind")
        let Uv = document.querySelector(".Uv h4")


        SensacaoTermica.innerHTML = Math.round(dados.clima.main.feels_like);
        PorcetagemDeChuva.innerHTML = `${dados.previsao.list[0].pop * 100}%`;

        velocidadeDoVento.innerHTML = `${Math.round(dados.clima.wind.speed)} Km/h`
    }
    catch (error) {
        console.log("ERRO:", error);
    }

}

let buttonCidade = document.querySelector(".background i").addEventListener("click", () => {

    let cidade = inputCidade.value;

    Clima(cidade)


})

window.addEventListener("DOMContentLoaded", () => {
    Clima("vitoria da conquista");


});


async function mostraImagem() {
    try {
        const url = "https://picsum.photos/1920/1080";

        const img = new Image();

        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
        });

        document.body.style.backgroundImage = `url(${img.src})`;

    } catch (erro) {
        console.log("Erro ao carregar a imagem:", erro);
    }
}

mostraImagem();




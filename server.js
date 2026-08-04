
const express = require("express");
require("dotenv").config();


const apiKey = process.env.OPENWEATHER_KEY;


const cors = require("cors");
const app = express()
app.use(cors());
app.use(express.static("public"));
app.use(express.json())



async function buscarClima(cidade) {
    const requisicao = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    return await requisicao.json();
}

async function buscarPrevisao(cidade) {
    const requisicao = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade},BR&appid=${apiKey}&units=metric&lang=pt_br`
    );

    return await requisicao.json();
}




app.get("/clima/:cidade", async (req, res) => {
    const clima = await buscarClima(req.params.cidade);
 const previsao = await buscarPrevisao(req.params.cidade);

console.log("Rota nova executada");

    res.json({
      previsao,
      clima

       
    });
});

// Fazer login
app.post("/login",(req,res)=>{
    const {email,senha} = req.body

    res.json({
        mensagem:"errro"
    })
})


// Rota para banco de dados

// const db = require("./database/db")

// db.exec(`CREATE TABLE NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT,nome TEXT,email TEXT UNIQUE,senha TEXT)`)


// app.post("/cadastro",(req,res)=>{

// const { nome, email, senha } = req.body;

// const comando = db.prepare(` INSERT INTO usuarios (nome,email,senha)
//     VALUEs (?,?,?)
//     `)

// comando.run(nome, email, senha);

// res.json({
//     mensagem:"usuario cadastrado com sucesso"
// })


// })




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});
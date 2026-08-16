import cors  from "cors";
import express from "express";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
dotenv.config();


const apiKey = process.env.OPENWEATHER_KEY;



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


// Cria uma conta




// Rota para banco de dados

import db from "./database/db.js"

db.exec(`CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,email TEXT UNIQUE,senha TEXT)`)

console.log("SERVIDOR ATUALIZADO");
// create account
// create account
app.post("/cadastro", async (req, res) => {

    console.log("BODY:", req.body)
    try {
        console.log("ROTA CADASTRO NOVA");
        console.log(req.body);
        const { email, senha } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        console.log(email);
        
        
        const comando = db.prepare(`
            INSERT INTO usuarios (email, senha)
            VALUES (?, ?)
        `);

       comando.run(email, hashedPassword);

return res.json({
    etapa: "CHEGOU NO INSERT"
});

const usuarios = db.prepare("SELECT * FROM usuarios").all();



res.json({
    teste: "SERVIDOR LOCAL",
    estado: true,
    mensagem: "ESTA RESPOSTA VEIO DO MEU PC"
});
       
        // res.json({
        //     teste: "funcionou",
        //     estado: true,
        //     mensagem: "Usuário cadastrado com sucesso"
        // });

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        
       
        if (error.message.includes("UNIQUE constraint failed")) {
            return res.status(400).json({
                estado: false,
                mensagem: "Este e-mail já está cadastrado."
            });
        }

        res.status(500).json({
            estado: false,
            mensagem: "Erro interno no servidor ao cadastrar."
        });
    }
});




// Fazer login

app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    console.log("Login recebido:", req.body);

    const usuario = db.prepare(`
        SELECT * FROM usuarios
        WHERE email = ?
    `).get(email);

    if (!usuario) {
        return res.json({
            estado: false,
            mensagem: "E-mail ou senha inválidos"
        });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (senhaCorreta) {
        res.json({
            estado: true,
            mensagem: "Login realizado com sucesso"
        });
    } else {
        res.json({
            estado: false,
            mensagem: "E-mail ou senha inválidos"
        });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
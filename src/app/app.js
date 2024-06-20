const express = require("express");
const morgan = require ("morgan")
const cors = require ("cors")
const instirouter =require ("../router/institucion.router")
const regisrouter =require ("../router/registro.router")
const usuarouter =require ("../router/usuario.router")
const actirouter =require ("../router/actividad.router")
const usuaprouter =require ("../router/usuariosp.router")
const perfilrouter =require ("../router/perfil.router")
const diarouter =require ("../router/dia.router")
const progrouter= require ("../router/programa.router")
const salarouter= require ("../router/sala.router")
const horarouter= require ("../router/horario.router")
const hordirouter= require ("../router/horadia.router")
const evenrouter= require ("../router/evento.router")
const evarouter= require ("../router/evaluador.router")
const caterobot= require ("../router/categoriarobot.router")

const app = express();
app.use(cors())
app.use (morgan("dev")) 
app.get("/",(req,res)=>{
    res.send('Iniciando bd');  
}); 
app.use(express.json())
app.use ("/insti",instirouter); 
app.use ("/regis",regisrouter);
app.use ("/api",usuarouter);
app.use ("/activ",actirouter);
app.use ("/userp",usuaprouter);
app.use ("/perf",perfilrouter);
app.use ("/dia",diarouter);
app.use ("/prog",progrouter);
app.use ("/sala",salarouter);
app.use ("/hora",horarouter);
app.use ("/hd",hordirouter);
app.use ("/even",evenrouter);
app.use ("/eva",evarouter);
app.use ("/robot",caterobot);

module.exports= app;


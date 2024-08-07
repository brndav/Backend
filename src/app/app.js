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
const linearouter= require ("../router/linea.router")
const ejerouter= require ("../router/ejes.router")
const linejerouter= require ("../router/linea_eje.router")
const formaprouter= require ("../router/forma_presentacion")
const modexporouter = require ("../router/mod_expo")
const pagosrouter = require ("../router/pagos.router")
const asisrouter= require ("../router/asistencia.router")
const membrouter= require ("../router/membresia.router")
const registroperfrouter =require ("../router/registro_perfil.router")
const autorrouter =require ("../router/autores.router")








require('dotenv').config();



const app = express();
app.use(cors())
app.use (morgan("dev")) 
app.use(express.json())
app.get("/",(req,res)=>{
    res.send('Iniciando bd');  
}); 

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
app.use ("/linea",linearouter);
app.use ("/eje",ejerouter);
app.use ("/lineje",linejerouter);
app.use ("/formap",formaprouter);
app.use ("/modexp",modexporouter);
app.use ("/pago",pagosrouter);
app.use ("/asist",asisrouter);
app.use ("/membresia",membrouter);
app.use ("/autor",autorrouter);
app.use ("/registroperf",registroperfrouter);



module.exports= app;


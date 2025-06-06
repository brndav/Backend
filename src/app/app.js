const express = require("express");
const { initializeDatabase } = require('../model/conexionbd');
const { autoRestartMiddleware } = require('../middleware/autoRestart');
const { HealthMonitor } = require('../utils/healthMonitor');
const morgan = require ("morgan")
const cors = require ("cors")
const instirouter =require ("../router/institucion.router")
const regisrouter =require ("../router/registro.router")
const usuarouter =require ("../router/usuario.router")
const perfilrouter =require ("../router/perfil.router")
const diarouter =require ("../router/dia.router")
const progrouter= require ("../router/programa.router")
const salarouter= require ("../router/sala.router")
const horarouter= require ("../router/horario.router")
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
const autorrouter =require ("../router/autores.router")
const statusrouter =require ("../router/status_registro.router")
const perfildatosgenrouter =require ("../router/perfil_datosgen.router")
const asesorregrouter =require ("../router/asesor_reg.router")
const diaeventorouter =require ("../router/dia_evento.router")
const detalleseventorouter =require ("../router/detalles_evento.router")
const imagenesrouter =require ("../router/imagenes.router")
const instieventorouter =require ("../router/instituciones_evento.router")
const contactoevenrouter =require ("../router/contacto_evento.router")
const direccionevenrouter =require ("../router/direccion_evento.router")

const tipopagorouter = require ("../router/tipo_pago.router")
const infopagorouter = require ("../router/info_pago.router")

require('dotenv').config();


const app = express();
app.use(cors())
app.use (morgan("dev")) 
app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use (morgan("dev")) 
app.use(express.json())

app.get("/",(req,res)=>{
    res.send('Iniciando bd');  
}); 


app.use ("/insti",instirouter); 
app.use ("/regis",regisrouter);
app.use ("/api",usuarouter);
app.use ("/perf",perfilrouter);
app.use ("/dia",diarouter);
app.use ("/prog",progrouter);
app.use ("/sala",salarouter);
app.use ("/hora",horarouter);
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
app.use ("/status",statusrouter);
app.use ("/perfildatosgen",perfildatosgenrouter);
app.use ("/asesor",asesorregrouter);
app.use ("/diaevento",diaeventorouter);
app.use ("/detallesevento",detalleseventorouter);
app.use ("/imagenes",imagenesrouter);
app.use ("/instievento",instieventorouter);
app.use ("/direccion",direccionevenrouter);
app.use ("/contacto",contactoevenrouter);


app.use ("/tipopago",tipopagorouter);
app.use ("/infopago",infopagorouter);

app.use(autoRestartMiddleware);

// Middleware general de errores (después del de reinicio)
app.use((error, req, res, next) => {
    console.error('❌ Error general:', error.message);
    
    if (!res.headersSent) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: error.message
        });
    }
});
async function startServer() {
    try {
       
        const connectionOk = await initializeDatabase();
        
        if (!connectionOk) {
            console.error('🚫 No se puede iniciar el servidor sin conexión a BD');
            process.exit(1); // Terminar si no hay conexión
        }
      
        // Iniciar monitor de salud
        const healthMonitor = new HealthMonitor(30000); // cada 30 segundos
        healthMonitor.start();

        const PORT = process.env.PORT || 3000;
        const server = app.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
            console.log(`🏥 Monitor de salud activo`);
            console.log(`🔄 Reinicio automático habilitado`);
        });
        
        // Manejar cierre graceful
        process.on('SIGINT', () => {
            console.log('\n🔄 Cerrando servidor...');
            healthMonitor.stop();
            server.close(() => {
                console.log('✅ Servidor cerrado correctamente');
                process.exit(0);
            });
        });
        
        process.on('SIGTERM', () => {
            console.log('🔄 Señal SIGTERM recibida, cerrando...');
            healthMonitor.stop();
            server.close(() => {
                process.exit(0);
            });
        });
        
    } catch (error) {
        console.error('💥 Error fatal al iniciar:', error.message);
        process.exit(1);
    }
}

startServer();
// Manejo adicional de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

module.exports= app;

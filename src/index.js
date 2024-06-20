const app = require('./app/app')
const port = process.env.PORT || 3501;

app.listen(port,()=>{
    console.log('Servidor corriendo en puerto 3501');
});

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("congreso_bd", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
    port: "3306",
    logging: false
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la BD "congreso_bd" establecida correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al conectar con la BD "congreso_bd":', error.message);
        return false;
    }
}

// Función para verificar si la conexión sigue activa (opcional)
async function checkConnection() {
    try {
        await sequelize.authenticate();
        return true;
    } catch (error) {
        console.error('❌ Conexión perdida con la BD:', error.message);
        return false;
    }
}

// Cerrar conexión correctamente al terminar la app
process.on('SIGINT', async () => {
    console.log('\n🔄 Cerrando conexión a la BD...');
    try {
        await sequelize.close();
        console.log('✅ Conexión cerrada correctamente');
    } catch (error) {
        console.error('❌ Error al cerrar conexión:', error.message);
    }
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🔄 Cerrando conexión a la BD...');
    try {
        await sequelize.close();
        console.log('✅ Conexión cerrada correctamente');
    } catch (error) {
        console.error('❌ Error al cerrar conexión:', error.message);
    }
    process.exit(0);
});

module.exports = {
    sequelize,
    initializeDatabase,
    checkConnection
};
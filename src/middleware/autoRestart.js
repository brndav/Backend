const { initializeDatabase } = require('../model/conexionbd');

// Contador de errores para evitar bucles infinitos
let errorCount = 0;
const MAX_RESTART_ATTEMPTS = 3;
const RESTART_COOLDOWN = 5000; // 5 segundos

async function attemptReconnection() {
    try {
        console.log('🔄 Intentando reconectar a la base de datos...');
        const connected = await initializeDatabase();
        if (connected) {
            console.log('✅ Reconexión exitosa');
            errorCount = 0; // Reset contador
            return true;
        }
        return false;
    } catch (error) {
        console.error('❌ Error en reconexión:', error.message);
        return false;
    }
}

function restartServer() {
    console.log('🔄 Reiniciando servidor en 3 segundos...');
    setTimeout(() => {
        console.log('🚀 Reiniciando servidor...');
        process.exit(1); // El gestor de procesos (PM2/nodemon) lo reiniciará
    }, 3000);
}

// Middleware para manejar errores críticos de BD
async function handleCriticalDBError(error, req, res, next) {
    console.error('💥 Error crítico de base de datos:', error.message);
    
    // Incrementar contador de errores
    errorCount++;
    
    // Responder al cliente primero
    if (!res.headersSent) {
        res.status(503).json({
            error: 'Servicio temporalmente no disponible',
            message: 'Error en la base de datos. El sistema se está reiniciando.',
            code: 'DB_ERROR_RESTART'
        });
    }
    
    // Si hay muchos errores seguidos, reiniciar
    if (errorCount >= MAX_RESTART_ATTEMPTS) {
        console.error(`❌ Demasiados errores de BD (${errorCount}). Reiniciando servidor...`);
        restartServer();
        return;
    }
    
    // Intentar reconectar
    setTimeout(async () => {
        const reconnected = await attemptReconnection();
        if (!reconnected && errorCount >= 2) {
            console.error('❌ No se pudo reconectar. Reiniciando servidor...');
            restartServer();
        }
    }, RESTART_COOLDOWN);
}

// Middleware para detectar errores específicos que requieren reinicio
function autoRestartMiddleware(error, req, res, next) {
    // Errores que requieren reinicio inmediato
    const criticalErrors = [
        'SequelizeConnectionError',
        'SequelizeConnectionRefusedError',
        'SequelizeHostNotFoundError',
        'SequelizeAccessDeniedError',
        'ECONNREFUSED',
        'ETIMEDOUT'
    ];
    
    const isCritical = criticalErrors.some(errorType => 
        error.name === errorType || 
        error.code === errorType ||
        error.message.includes(errorType)
    );
    
    if (isCritical) {
        handleCriticalDBError(error, req, res, next);
    } else {
        // Error normal, pasar al siguiente middleware
        next(error);
    }
}

module.exports = {
    autoRestartMiddleware,
    handleCriticalDBError,
    attemptReconnection
};
const { checkConnection } = require('../model/conexionbd');

class HealthMonitor {
    constructor(checkInterval = 30000) { // cada 30 segundos
        this.checkInterval = checkInterval;
        this.isMonitoring = false;
        this.consecutiveFailures = 0;
        this.maxFailures = 3;
    }
    
    async checkHealth() {
        try {
            const isHealthy = await checkConnection();
            
            if (isHealthy) {
                if (this.consecutiveFailures > 0) {
                    console.log('✅ Base de datos recuperada');
                    this.consecutiveFailures = 0;
                }
                return true;
            } else {
                this.consecutiveFailures++;
                console.warn(`⚠️  Fallo de conexión #${this.consecutiveFailures}`);
                
                if (this.consecutiveFailures >= this.maxFailures) {
                    console.error('💥 Demasiados fallos consecutivos. Reiniciando...');
                    this.restart();
                }
                return false;
            }
        } catch (error) {
            this.consecutiveFailures++;
            console.error(`❌ Error verificando salud: ${error.message}`);
            
            if (this.consecutiveFailures >= this.maxFailures) {
                console.error('💥 Sistema crítico. Reiniciando...');
                this.restart();
            }
            return false;
        }
    }
    
    restart() {
        console.log('🔄 Reiniciando sistema en 5 segundos...');
        setTimeout(() => {
            process.exit(1);
        }, 5000);
    }
    
    start() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        console.log('🏥 Monitor de salud iniciado');
        
        this.intervalId = setInterval(() => {
            this.checkHealth();
        }, this.checkInterval);
    }
    
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.isMonitoring = false;
            console.log('🛑 Monitor de salud detenido');
        }
    }
}
exports.HealthMonitor = HealthMonitor; 
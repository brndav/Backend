const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_bd","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

    class membresias extends Model{}

    membresias.init({
        idtipo_membresia:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        opciones:{
            type: DataTypes.STRING
        },
        
    },{
        sequelize,
        modelName: 'membresias',
        timestamps: false,
        freezeTableName: true,
    });
    module.exports = membresias;
    async function testConnection(){
        try{
            await membresias.sync();
            console.log("Conectado a la base de datos");
        }catch(error){
            console.log("Error de conexión a la base de datos", error);
        }
    }
    testConnection();
    
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

    class asistencias extends Model {}

    asistencias.init({
        id_asistencia:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        id_actividad:{
            type: DataTypes.INTEGER
        },
        idusuario:{
            type: DataTypes.INTEGER
        }
    },{
        sequelize,
        modelName: 'asistencia',
        timestamps: false,
        freezeTableName: true,
        //createdAt: "createdAt",
        //updatedAt: "updatedAt"
    });
    module.exports = asistencias;

    async function testConnection(){
        try{
            await asistencias.sync();
            console.log("Conectado a la base de datos");
        }catch(error){
            console.log("Error al conectar a la base de datos", error);
        }
    }
    testConnection();
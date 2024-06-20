const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","tese","1234",{
    host:"45.79.198.62",dialect:"mysql",port:"3306"});

    class categoriarobots extends Model {}

    categoriarobots.init({
        id_categoria:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false
        },
        nombre:{
            type: DataTypes.STRING,
            
        }
        
    },
    {
        sequelize,
        modelName: 'categoriarobot',
        timestamps: false,
        freezeTableName: true,
    });

    module.exports = categoriarobots;



    async function testConnection(){
        try{
            await sequelize.authenticate();
            console.log("Conexión a la BD correcta")
        } catch(error){
            console.error("Conexión a la BD fallida", error)
        }
    }
     testConnection();
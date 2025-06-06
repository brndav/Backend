const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');



class programasr extends Model{}

programasr.init({
    id_programa_registro:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_horario:{
        type:DataTypes.INTEGER
    },
    id_dia_evento:{
        type:DataTypes.INTEGER
    },
    id_sala:{
        type:DataTypes.INTEGER
    },
    id_evaluador:{
        type:DataTypes.INTEGER
    },
    Liga:{
        type:DataTypes.STRING
    },

  
},{ 
   sequelize,
   modelName: "programa_registro",  
   timestamps: false, 
   freezeTableName: true,
}
);

programasr.belongsTo(require ('./dia_evento'), {  as: 'dia_evento',foreignKey: 'id_dia_evento' });
programasr.belongsTo(require ('./horario'), {  as: 'horario',foreignKey: 'id_horario' });
programasr.belongsTo(require ('./sala'), {  as: 'sala',foreignKey: 'id_sala' });
programasr.belongsTo(require ('./evaluador'), {  as: 'evaluador',foreignKey: 'id_evaluador' });


module.exports =programasr;








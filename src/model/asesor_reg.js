const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class asesor_reg extends Model {}

asesor_reg.init({
    id_asesor_reg: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },   
    id_perfil_datosgen: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_registros: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    modelName: 'asesor_reg',
    timestamps: false, 
    freezeTableName: true,
});

asesor_reg.belongsTo(require('./perfil_datosgen'), {as: 'perfil_datosgen',foreignKey: 'id_perfil_datosgen' });



module.exports = asesor_reg;


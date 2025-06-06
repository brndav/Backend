const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../model/conexionbd');

const Curso = sequelize.define('Curso', {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING
    },
    fecha_inicio: {
      type: DataTypes.DATE
    },
    link: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'cursos',
    timestamps: false
  });
  
  module.exports = Curso;
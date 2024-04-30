import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const incomes = db.define('incomes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING(150),
        allowNull: false // Assuming name can be nullable
    },
    income_id: {
        type: DataTypes.INTEGER,
        allowNull: false // Assuming afm can be nullable
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: true // Assuming phone can be nullable
    }
},{
    freezeTableName: true
});

export default incomes;
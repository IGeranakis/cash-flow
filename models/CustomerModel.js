import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Customer = db.define('customers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: true // Assuming name can be nullable
    },
    afm: {
        type: DataTypes.STRING(45),
        allowNull: true // Assuming afm can be nullable
    },
    phone: {
        type: DataTypes.STRING(45),
        allowNull: true // Assuming phone can be nullable
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: true // Assuming email can be nullable
    },
    address: {
        type: DataTypes.STRING(45),
        allowNull: true // Assuming address can be nullable
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: true // Assuming postal_code can be nullable
    }
},{
    freezeTableName: true
});

export default Customer;

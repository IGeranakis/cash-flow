import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Customer from "./CustomerModel.js";
const {DataTypes} = Sequelize;

const ErgaCategories = db.define('erga_categories',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true, // Allow empty values
        validate: {
            len: [3, 100]
        }
    }
},{
    freezeTableName: true
});

export default ErgaCategories;
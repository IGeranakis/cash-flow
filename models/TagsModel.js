import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const {DataTypes} = Sequelize;

const Tags = db.define('tags',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true, // Allow empty values
        validate: {
            len: [1, 200]
        }
    }
},{
    freezeTableName: true
});


export default Tags;

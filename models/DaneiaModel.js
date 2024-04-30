import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Daneia = db.define('daneia',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:
    {
        type: DataTypes.STRING[100],
        allowNull: false,
    },
    ammount:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false

    }
},{
    freezeTableName: true
});

export default Daneia;

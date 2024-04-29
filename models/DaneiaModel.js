import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Timologia from "./TimologiaModel.js";
const {DataTypes} = Sequelize;

const Daneia = db.define('daneia',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    loan_type:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    }
},{
    freezeTableName: true
});

Daneia.belongsTo(Timologia, { foreignKey: 'timologia_id', allowNull: true });
export default Daneia;

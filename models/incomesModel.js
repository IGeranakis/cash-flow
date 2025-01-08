import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Paradotea from "./ParadoteaModel.js";
import Timologia from "./TimologiaModel.js";
import Ekxorimena_Timologia from "./Ekxorimena_TimologiaModel.js";
import Erga from "./ErgaModel.js";

const {DataTypes} = Sequelize;

const incomes = db.define('incomes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
},{
    freezeTableName: true
});

incomes.belongsTo(Paradotea, { foreignKey: 'paradotea_id', allowNull: true,onDelete: 'CASCADE' });
incomes.belongsTo(Timologia, { as:'timologia', foreignKey: 'timologia_id', allowNull: true,onDelete:"SET NULL" });
incomes.belongsTo(Ekxorimena_Timologia, { foreignKey: 'ekxorimena_timologia_id', allowNull: true });




export default incomes;
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
    paradotea_erga_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "paradotea",
            key: "erga_id"
        },
        allowNull: true
    },
    paradotea_timologia_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "paradotea",
            key: "timologia_id"
        },
        allowNull: true
    }




},{
    freezeTableName: true
});

incomes.belongsTo(Paradotea, { foreignKey: 'paradotea_id', allowNull: true });
incomes.belongsTo(Timologia, { foreignKey: 'timologia_id', allowNull: true });
incomes.belongsTo(Ekxorimena_Timologia, { foreignKey: 'ekxorimena_timologia_id', allowNull: true });

// incomes.belongsTo(Paradotea, { foreignKey: 'timologia_id', allowNull: true });
// incomes.belongsTo(Timologia, { foreignKey: 'timologia_id', allowNull: true });


export default incomes;
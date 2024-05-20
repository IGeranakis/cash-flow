import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import dotenv from "dotenv";
import  SequelizeStore  from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js"
import ErgaRoute from "./routes/ErgaRoute.js";
import ParadoteaRoute from "./routes/ParadoteaRoute.js";
import DaneiaRoute from "./routes/DaneiaRoute.js";

import Ek_timologiaRoute from "./routes/Ek_timologiaRoute.js"
import IncomeRoute from "./routes/IncomeRoute.js"
import Queries from "./routes/QueriesRoute.js"

import AuthRoute from "./routes/AuthRoute.js";
import Timologia_Route from "./routes/Timologia_Route.js";
import bodyParser from "body-parser";
import Paradotea from "./models/ParadoteaModel.js";
import Customer from "./models/CustomerModel.js";
import Erga from "./models/ErgaModel.js";
import timologia from "./models/TimologiaModel.js";
import Users from "./models/UserModel.js";
import incomes from "./models/incomesModel.js";
import Daneia from "./models/DaneiaModel.js";
import Ekxorimena_Timologia from "./models/Ekxorimena_TimologiaModel.js"

dotenv.config();

const app = express();
app.use(bodyParser.json());

const sessionStore=SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});

(async()=>{
    //await db.sync();
    await Customer.sequelize.sync();
    await Erga.sequelize.sync();
    await Daneia.sequelize.sync();
    await timologia.sequelize.sync();
    await Paradotea.sequelize.sync();
    await Users.sequelize.sync();
    await incomes.sequelize.sync();
    await Ekxorimena_Timologia.sequelize.sync();
    
    
})();




app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:"true",
    store:store,
    cookie:{
        secure:'auto'
    }
}))

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(CustomerRoute);
app.use(ErgaRoute);
app.use(Timologia_Route)
app.use(ParadoteaRoute);
app.use(DaneiaRoute);
app.use(Ek_timologiaRoute);
app.use(IncomeRoute);
app.use(Queries);
// store.sync();

app.listen(process.env.APP_PORT,()=>{
    console.log('Server up and runningg....');
});
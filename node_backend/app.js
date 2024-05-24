import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/routes.js";
import { sequelize } from "./model/ModelSequalizer.js";

const app = express();
const port = 5000;




app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
sequelize.sync({force:false})
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

export default app;
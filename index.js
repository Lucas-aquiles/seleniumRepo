import express from "express";
import bodyParser from "body-parser"; // Importación de body-parser
import cors from "cors"; // Importación de cors
import router from "./src/routes/index.js"; // Ajusta la ruta según la ubicación real

const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/',router)

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

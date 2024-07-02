// routes/userRoutes.js
import  express from 'express';
const router = express.Router();
import { allPosition } from '../controllers/allPosition.js';
// import {allPosition} from "../../controllers/allPosition"; // Ajusta la ruta según la ubicación real



router.get('/', allPosition

);

export default router;
import express from "express";
import cow from "../controller/controllerCows.js";
import farmers from "../controller/controllerFarmers.js";
import {registerUser, signInUser, verifyJwt} from "../model/ModelSequalizer.js"
const router = express.Router();

router.get('/cow',cow.getAllCows);
router.get('/cow/:id', cow.getCow);
router.post('/cow', cow.createCow);
router.put('/cow/:id', cow.updateCow);
router.delete('/cow/:id', cow.deleteCow);

router.get('/farmer', farmers.getAllFarmers);
router.get('/farmer/:id', farmers.getFarmer);
router.post('/farmer',farmers.createFarmer);
router.put('/farmer/:id',farmers.updateFarmer);
router.delete('/farmer/:id',farmers.deleteFarmer);

router.post('/sign-up', registerUser);
router.post('/sign-in', signInUser);

export default router;
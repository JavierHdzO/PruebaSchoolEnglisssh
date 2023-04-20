import { Router } from 'express';
import { check } from 'express-validator';
import { createUser,deleteUser,getUser, getUsers,updateUser } from "../controllers/user.controller.js";
import checkValidator from '../middleware/checkValidator.js';

const router = Router();

router.get("/", getUsers);

router.post("/", [
    check('nombre').not().isEmpty(),
    check('apellidos').not().isEmpty(),
    check('usuario').not().isEmpty(),
    check("contrasena").not().isEmpty(),
    checkValidator
],  createUser );

router.get("/:id", getUser );

router.put("/:id", updateUser );

router.delete("/:id", deleteUser );

export default router;
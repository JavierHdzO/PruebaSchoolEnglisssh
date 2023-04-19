import { validationResult } from "express-validator";

const checkValidation = (req, res, next) => {

    const result = validationResult(req);

    if(!result.isEmpty()){
        res.json({
            errors: result.array(),
            ok: false
        });
    }

    next();
}

export default checkValidation;
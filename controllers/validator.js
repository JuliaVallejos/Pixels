const Joi=require("joi");

const validator={
    validateNewAccount: (req,res,next)=>{
        if(!req.body.userGoogle){
            const schema=Joi.object({
                userName: Joi.string().trim().required().email().rule({ message: '"username" must be a valid email' }),
                userPass: Joi.string().required().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/).rule({ message: '"password" must contain at least one number, one lowercase and one uppercase letter, six characters' }),
                userFirstName:Joi.string().trim().required().min(2).max(13).messages({
                    "string.base": "Should be a type of 'text'",
                    "string.empty": "This field can't be empty",
                    "any.required": "This field is required",
                    "string.min": "Must contain at least 2 letters",
                  }),
                userLastName:Joi.string().trim().required().min(2).max(13).messages({
                    "string.base": "Should be a type of 'text'",
                    "string.empty": "This field can't be empty",
                    "any.required": "This field is required",
                    "string.min": "Must contain at least 2 letters",
                  }),
                userImg:Joi.string().uri().required().trim().rule({ message: '"user pic" must be a valid url' }),
                userPhone:Joi.number(),
                userPayPal:Joi.string(),
                userGoogle:Joi.boolean(),
                userRol:Joi.string().trim()
            })
            const validation = schema.validate(req.body,{abortEarly:false});
            if(!validation.error){next();
            }else{
                console.log(validation.error.details.message)
                res.json({sucess:false,errors:validation.error.details})
            }
        }else{
            next();
        }
    }
    
}
module.exports=validator;
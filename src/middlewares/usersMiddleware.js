import { userSignUpSchema, userSignInSchema } from "../schemas/usersSchema.js";

export async function ValidateUserSignUp(req, res, next) {
  const validation = userSignUpSchema.validate(req.body, {abortEarly: false});

  if (validation.error){
      console.log(validation.error.details);
      res.sendStatus(422);
      return;
  }
  next();
}

export async function validateUserSignIn(req, res, next){
  const validation = userSignInSchema.validate(req.body, {abortEarly:false});
  
  if (validation.error){
      console.log(validation.error.details);
      res.sendStatus(422);
      return;
  }
  next();
}
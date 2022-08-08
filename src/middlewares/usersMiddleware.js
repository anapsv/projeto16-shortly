import { userSignUpSchema, userSignInSchema } from "../schemas/usersSchema.js";

export async function userSignUpMiddleware(req, res, next) {
  const validation = userSignUpSchema.validate(req.body, {abortEarly: false});

  if (validation.error){
      console.log(validation.error.details);
      res.sendStatus(422);
      return;
  }
  next();
}

export async function userSignInMiddleware(req, res, next){
  const validation = userSignInSchema.validate(req.body, {abortEarly:false});
  
  if (validation.error){
      console.log(validation.error.details);
      res.sendStatus(422);
      return;
  }
  next();
}
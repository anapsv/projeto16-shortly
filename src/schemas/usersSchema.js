import joi from "joi";

export const userSignUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
});

export const userSignInSchema = joi.object({
  email: joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
  password: joi.string().required(),
});
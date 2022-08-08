import { urlsSchema } from '../schemas/urlsSchema.js';

export async function urlsMiddleware(req, res, next){
    const validation = urlsSchema.validate(req.body, {abortEarly: false});

    if(validation.error){
        console.log(validation.error.details);
        return res.sendStatus(422);
    }
    next();
}
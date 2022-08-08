import jwt from 'jsonwebtoken';

export async function tokenMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;

    try {
        const { id: userId } = jwt.verify(token, secretKey);
        res.locals.userId = userId;
        next();
    } catch (error) {
        return res.status(401).send(error);
    }
}
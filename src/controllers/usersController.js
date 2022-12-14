import connection from '../dbStrategy/dbShortly.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function addUser(req, res) {
    const hashparam = 10;
    const passwordEncrypt = bcrypt.hashSync(req.body.password, hashparam);
    const user = { ...req.body, password: passwordEncrypt};
    const { name, email, password } = user;

    try {
        const { rows: emailExists } = await connection.query(
            "SELECT * FROM users WHERE email = $1;",
            [user.email]
        );

        if (emailExists.length !== 0) {
            return res.sendStatus(409);
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(422).send("As senhas inseridas não são iguais!");
        }

        await connection.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
            [name, email, password]
        );

        res.sendStatus(201);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }

}

export async function loginUser(req, res) {

    const {email, password} = req.body;

    try {
        const { rows } = await connection.query(
          `SELECT * FROM users WHERE email = $1;`,
          [email]
        );
        const user = rows[0];
    
        if (user.length === 0) {
          return res.status(401).send("O usuário não existe");
        }
    
        const checkPassword = bcrypt.compareSync(password, user.password);
    
        if (!checkPassword) {
          return res.status(401).send("Usuário ou senha incorretos");
        }
    
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.id }, secretKey);
  
        return res.status(200).send({ token });
      } catch (error) {
        console.log(error.stack);
        return res.status(400).send(error);
    }

}

export async function getUsersData(req, res){

    const userId = res.locals.userId;

    try {
        
        const { rows: totalViews } = await connection.query(
            `SELECT urls."userId" AS id, users.name AS name, CAST(SUM(urls."viewsCount") AS INTEGER) AS "viewsCount" FROM urls JOIN users ON urls."userId" = users.id WHERE urls."userId" = $1 GROUP BY urls."userId", users.name`, [userId]
        );

        const { rows: urls } = await connection.query(
            `SELECT id, "userId", url, "viewsCount" FROM urls WHERE "userId" = $1`, [userId]
        );

        const userData = totalViews[0] ? {...totalViews[0], shortUrls: urls} : `Nenhuma URL registrada`;

        return res.status(200).send(userData);

    } catch (error) {
        return res.status(500).send(error);
    }

}
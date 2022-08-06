import connection from '../dbStrategy/dbShortly.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function addUser(req, res) {
    const hashparam = 10;
    const passwordEncrypt = bcrypt.hashSync(req.body.password, hashparam);
    const user = { ...req.body, password: passwordEncrypt};
    const { name, email, password } = user;

    try {
        const { rows: emailExists } = await connection.query(
            "SELECT * FROM users WHERE email = $1;",
            [email]
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
        const { rows: user } = await connection.query(
          `SELECT * FROM users WHERE email = $1;`,
          [email]
        );
    
        if (user.length === 0) {
          return res.sendStatus(401);
        }
    
        const checkPassword = bcrypt.compareSync(password, user[0].password);
    
        if (!checkPassword) {
          return res.sendStatus(401);
        }
    
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user[0].id }, secretKey);
       
        await connection.query(
          `INSERT INTO sessions (token,user_id) VALUES ($1,$2);`,
          [token,user[0].id]
        );
  
        return res.status(200).send({ token });
      } catch (error) {
        return res.status(400).send(error);
    }

}
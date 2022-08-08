import connection from "../dbStrategy/dbShortly.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

export async function postNewURL(req, res) {

    const { url } = req.body;
    const id = res.locals.id;

    const shortenedUrl = nanoid(10);

    try {
        await connection.query(
            `INSERT INTO urls ("url", "shortURL", "userId") VALUES ($1, $2, $3);`, [url, shortenedUrl, id]
        );

        return res.status(201).send({ shortenedUrl });

    } catch (error) {
        return res.status(500).send(error);
    }

}

export async function getURLById(req, res) {

    const { id } = req.params;

    const { rows: url } = await connection.query(
      `SELECT id, "shortURL", url FROM urls WHERE id = $1`,
      [id]
    );
  
    if (url.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(url);
    }

}
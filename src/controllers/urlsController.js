import connection from "../dbStrategy/dbShortly.js";
import { nanoid } from 'nanoid';

export async function postNewURL(req, res) {

    const { url } = req.body;
    const userId = res.locals.userId;
    console.log(userId);

    const shortenedUrl = nanoid(10);

    try {
        await connection.query(
            `INSERT INTO urls ("url", "shortURL", "userId") VALUES ($1, $2, $3);`, [url, shortenedUrl, userId]
        );

        return res.status(201).send({ shortenedUrl });

    } catch (error) {
        return res.status(500).send(error);
    }

}

export async function getURLById(req, res) {

    const { id } = req.params;

    const { rows: urlById } = await connection.query(
      `SELECT id, "shortURL", url FROM urls WHERE id = $1`,
      [id]
    );
  
    if (urlById.length === 0) {
      res.status(404).send("A URL não existe");
    } else {
      res.status(200).send(urlById);
    }

}

export async function getShortenedURL(req, res){

    const { shortUrl } = req.params;

    try {
        
        const {rows: urlShortened} = await connection.query(
            `SELECT * FROM urls WHERE "shortURL" = $1`, [shortUrl]
        );

        if(!urlShortened){
            return res.status(404).send("A URL não existe");
        }

        await connection.query(
            `UPDATE urls SET "viewsCount" = "viewsCount" + 1 WHERE "shortURL" = $1`, [shortUrl]
        );

        return res.redirect(urlShortened[0].url);

    } catch (error) {
        res.status(500).send(error);
    }

}

export async function deleteURLById(req, res) {

    const { id: URLId } = req.params;
    const userId = res.locals.userId;
    console.log(URLId);
    console.log(userId);
    
    try {
        
        const { rows } = await connection.query(
            `SELECT * FROM urls WHERE id = $1`, [URLId]
        );
            
            const urlById = rows[0];
            console.log(urlById.userId);

        if (!urlById) {

            return res.status(404).send("A URL não existe");

        }

        if (urlById.userId !== userId) {

            return res.status(401).send("A URL não pertence ao usuário");

        }

        await connection.query(
            `DELETE FROM urls WHERE id = $1`, [URLId]
        );

        return res.sendStatus(204);

    } catch (error) {

        return res.status(500).send(error);

    }
}
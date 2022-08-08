import connection from "../dbStrategy/dbShortly.js";

export async function createRanking(req, res){

    try {
        
        const {rows: ranking} = await connection.query(
            `SELECT users.id AS id, users.name AS name, CAST(COUNT(urls.url) AS INTEGER) AS "linksCount", COALESCE(CAST(SUM(urls."viewsCount") AS INTEGER), 0) AS "visitCount" FROM users LEFT JOIN urls ON urls."userId" = users.id GROUP BY users.id, users.name ORDER BY "visitCount" DESC, "linksCount" DESC, name ASC LIMIT 10`            
        );

        return res.status(200).send(ranking);

    } catch (error) {
        return res.status(500).send(error);
    }

}
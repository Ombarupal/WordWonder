var pg = require('pg');
var conString = "postgres://mydbfirst_user:hx4fSKEuiqa7rWzOI01hSx5zBRSVtQzr@dpg-ck677itdrqvc73avefpg-a.frankfurt-postgres.render.com/mydbfirst";

var client = new pg.Client({
    connectionString: conString,
    ssl: {
        rejectUnauthorized: false
    }
});
try {
    client.connect();
    client.query("CREATE TABLE Attempts ( username TEXT, word TEXT, attempts INT)"
    );
    client.query("CREATE TABLE Scores ( username TEXT, score INT)"
    );
    
} catch (error) {
    console.log(error);
}






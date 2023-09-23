const { response } = require('express');
var express = require('express');
var pg = require('pg');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.json());

var conString = "postgres://mydbfirst_user:hx4fSKEuiqa7rWzOI01hSx5zBRSVtQzr@dpg-ck677itdrqvc73avefpg-a.frankfurt-postgres.render.com/mydbfirst";

var client = new pg.Client({
    connectionString: conString,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

var PORT = 5400;

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/getword', function (req, res) {
    var words = ['rock', 'paper', 'scissors', 'lamp', 'curtain', 'pillow'];
    var vis = [0, 0, 0, 0, 0, 0];
    var number = Math.floor(Math.random() * words.length);
    var word = words[number];
    vis[word] = 1;
    res.json({
        "word": word
    })
});

app.post('/wrongAns', function (req, res) {
    var user = req.body["username"];
    var userWord = req.body["word"];
    var result ;
    client.query(`SELECT attempts FROM Attempts WHERE username='${user}'`)
    .then((response) => {
        if ((response["rows"].length > 0)) {
            result = response["rows"][0]["attempts"]+1;
            client.query(`UPDATE Attempts SET attempts='${result}' WHERE username='${user}'`);
            // window.alert(`Total number of attempts are : ${result + 1}`);
        }
        else {
            result = 1;
            client.query(`INSERT INTO Attempts VALUES ('${user}', '${userWord}', ${result})`);
        }
    });

    res.json({
        attempt : result
    });

});

app.post('/rightAns', function (req, res) {
    console.log(req.body);
    var user = req.body["userna"];
    var userScore= req.body["userscore"];
    var totalscore=0 ;
    var totalattempts=0
    console.log(`SELECT score FROM Scores WHERE username = '${user}'`);
    

// WHERE username = '" + user + "'
    client.query(`SELECT score, attempts FROM Score_attempt WHERE username = '${user}'`)
        .then((response) => {
            
            console.log(response);
            if (response["rows"].length == 0) {
                console.log("length 0");
                client.query(`INSERT into Score_attempt VALUES ('${user}',${userScore},1)`);
                totalscore= userScore ;
               
            }
            else {
                // userScore = req.body["score"];
                // userScore= response.rows[0].score ;
                totalscore=userScore + response.rows[0].score ;
                client.query(`UPDATE Score_attempt SET score=${totalscore} , attempts=attempts+1 WHERE username='${user}'`);
                totalattempts=response.rows[0].attempts ;
            }
            
            
console.log(totalscore) 
console.log(totalattempts) ;

res.json({
    score : totalscore,
    attempts : totalattempts
});
                        
        })

        

});

app.listen(PORT, function () {
    console.log('server running on http://localhost:5400');
});

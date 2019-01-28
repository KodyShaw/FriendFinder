let express = require('express');
let router = express.Router();
let fs = require('fs');

let friends = require("../data/friends");

function addToFriends(newFriend, frineds) {
    friends.push(newFriend);

    const data = "var friends = " + JSON.stringify(friends, null, 2) + "\n module.exports = friends"

    fs.writeFile("./app/data/friends.js", data, err => {
        if (err) {
            console.log(err);
        }
    })
};

let findMatch = (newFriend, friends) =>{
    let scoreComparison = 100;
    let closestMatch;
    friends.forEach(friend =>{
        let currentScore = 0;
        for(let i = 0; i < friend.answers.length; i++){
            currentScore += (Math.abs(parseInt(friend.answers[i]) - parseInt(newFriend.answers[i])));
        }
        console.log("Current Score: " + currentScore);
        if(currentScore < scoreComparison){
            scoreComparison = currentScore;
            closestMatch = friend;
        }
    })
    return closestMatch;
}

router.get("/friends", (req, res)=>{
    fs.readFile("./app/data/friends.js", "utf-8", (err, data) =>{
        if (err) {
            console.log(err);
            res.send("Something went wrong, please try again. There is someone waiting for some friends.");
        }

        res.send("<code>" + JSON.stringify(friends, undefined, 2) + "<code>");
    })
});

router.post("/", (req, res) => {

    req = req.body;
    const newFriend = {
        name: req.name,
        answers: []
    };

    for(answers in req.q) {
        newFriend.answers.push(req.q[answers]);
    }

    const match = findMatch(newFriend, frineds);
    addToFriends(newFriend, friends);

    res.jsonp(JSON.stringify(match));
});

module.exports = router;
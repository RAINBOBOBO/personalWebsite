sessionStorage.setItem("waiting", "0");
sessionStorage.setItem("clickCt", "0");
sessionStorage.setItem("score", "0");
sessionStorage.setItem("turns", "0");
let arr = [];
sessionStorage.setItem('solved', JSON.stringify(arr));

localStorage.setItem('tempScore', null);

function generatePositions(){
    let result = []
    let bag = [
        "red",
        "red",
        "orange",
        "orange",
        "yellow",
        "yellow",
        "green",
        "green",
        "blue",
        "blue",
        "pink",
        "pink",
        "purple",
        "purple",
        "brown",
        "brown"
    ]
    for (let i=16; i>0; i--){
        index = Math.floor(Math.random() * i);
        color = bag[index];
        bag.splice(index, 1);
        result.push(color);
    }
    console.log(result);
    return result;
}

function flipCard(index, card1, cardPositions){
    let solvedIndexes = JSON.parse(sessionStorage.getItem('solved'));
    if (sessionStorage.getItem("waiting") === "0" && sessionStorage.getItem("otherCard") !== ""+index  && solvedIndexes.every(x => x !== ""+index)){
        if (cardPositions[index-1] === "red"){
            card1.setAttribute("src", "redCard.png");
        } else if (cardPositions[index-1] === "orange"){
            card1.setAttribute("src", "orangeCard.png");
        } else if (cardPositions[index-1] === "yellow"){
            card1.setAttribute("src", "yellowCard.png");
        } else if (cardPositions[index-1] === "green"){
            card1.setAttribute("src", "greenCard.png");
        } else if (cardPositions[index-1] === "blue"){
            card1.setAttribute("src", "blueCard.png");
        } else if (cardPositions[index-1] === "pink"){
            card1.setAttribute("src", "pinkCard.png");
        } else if (cardPositions[index-1] === "purple"){
            card1.setAttribute("src", "purpleCard.png");
        } else if (cardPositions[index-1] === "brown"){
            card1.setAttribute("src", "brownCard.png");
        }

        if (sessionStorage.getItem("clickCt") === "0"){
            sessionStorage.setItem("clickCt", "1");
            sessionStorage.setItem("otherCard", index);
            sessionStorage.setItem("otherCardColor", cardPositions[index-1]);
        } else if (sessionStorage.getItem("clickCt") === "1"){
            sessionStorage.setItem("clickCt", "0");
            sessionStorage.setItem("waiting", "1");
            if (sessionStorage.getItem("otherCardColor") !== cardPositions[index-1]){
                setTimeout(function(card){
                    document.getElementById("card "+sessionStorage.getItem("otherCard")).setAttribute("src", "cardBack.png");
                    card.setAttribute("src", "cardBack.png");
                    sessionStorage.setItem("waiting", "0");
                    sessionStorage.setItem("otherCard", -1);
                    sessionStorage.setItem("otherCardColor", "reset");
                }, 1000, card1);
            } else {
                sessionStorage.setItem("waiting", "0");
                sessionStorage.setItem("score", ""+(parseInt(sessionStorage.getItem("score"))+1));
                document.getElementById("scoreCounter").innerHTML = "Score: " + sessionStorage.getItem("score");

                solvedIndexes.push(sessionStorage.getItem("otherCard"));
                solvedIndexes.push(""+index);

                sessionStorage.setItem("otherCard", -1);
                sessionStorage.setItem("otherCardColor", "reset");
                
                if (parseInt(sessionStorage.getItem("score")) >= 8){
                    setTimeout(function(){
                        localStorage.setItem('tempScore', sessionStorage.getItem("turns"));
                        window.location.replace("victory.html")
                    }, 1500);
                }
            }
            sessionStorage.setItem("turns", ""+(parseInt(sessionStorage.getItem("turns"))+1));
            document.getElementById("turnCounter").innerHTML = "Turns: " + sessionStorage.getItem("turns");
        }
    }
    sessionStorage.setItem('solved', JSON.stringify(solvedIndexes));
    console.log(index, cardPositions[index-1], sessionStorage.getItem("otherCard"), sessionStorage.getItem("otherCardColor"))
}

//clicking 2x on solved cards counts score
//solved cards can get unsolved
//title, description
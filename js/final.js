/*
---------------------------------------
Document Ready
---------------------------------------
*/
$(document).ready(function () {
    $('#p1Dice2').css('display', 'none');
    $('#p2Dice2').css('display', 'none');
});
/*
---------------------------------------
Player Class
---------------------------------------
*/
class Player {
    constructor(name) {
        this.name = name;
        this.roundCounter = 1;
        this.rolledDice = [];
        this.scores = [];
        this.totalScore = 0;
    }
    //Pushing rolled dice to array
    addRolledDice(dice) {
        this.rolledDice.push(dice);
    }

    //Pushing scores to array
    addScores(score) {
        this.scores.push(score);
    }

    calcTotalScore(scores) {
        this.totalScore = scores.reduce((a, b) => a + b, 0);
    }
};
/*
---------------------------------------
New Game Button
---------------------------------------
*/
$('#btnNewGame').click(function () {

    window.clearTimeout();

    //Initialize game enciroment
    $('#p1Dice2').css('display', 'none');
    $('#p2Dice2').css('display', 'none');
    $('.dice img').attr('src', 'images/rolling-dices.png');
    $('.roll-result img').attr('src', 'images/Blank.png');

    //Clear past roll dice scores
    $('#p1Roll1Score').text('Score: '); $('#p1Roll2Score').text('Score: '); $('#p1Roll3Score').text('Score: ');
    $('#p2Roll1Score').text('Score: '); $('#p2Roll2Score').text('Score: '); $('#p2Roll3Score').text('Score: ');

    //Clear past players score
    $('#p1TotalScore').text('Total Score: '); $('#p2TotalScore').text('Total Score: ');

    //Define Player 1
    player1 = new Player(this.name = prompt("Enter Player name!"));
    $('#p1Name').text(player1.name);
    //define Player2 (Computer)
    player2 = new Player(this.name = 'Computer');
    $('#p2Name').text(player2.name);
    
    //Start with player 1
    //$('#divPlayer1').removeClass('current-player');
    $('#divPlayer2').removeClass('current-player');
    $('#divPlayer1').addClass('current-player');
    $('#btnRollDice').removeAttr('disabled');
    $('#btnRollDice').removeClass('btn-rolldice-disabled');
    $('#btnRollDice').addClass('btn-rolldice-active');
});
/*
---------------------------------------
Roll Dice Button
---------------------------------------
*/
$('#btnRollDice').click(function () {
    RollDice();
});
/*

---------------------------------------
Functions
---------------------------------------
*/
//Generating random integer number between min and max
function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Player 1 rolling dice
//Generate random dices, show images, calculate scores
function RollDice() {
    $('#btnNewGame').hide();
    for (let i = 0; i < 2; i++) {
        player1.addRolledDice(generateRandomInteger(1, 6));
    }

    //Show current pair of dices
    $('#p1Dice1').attr('src', 'images/Dice-' + player1.rolledDice[player1.rolledDice.length - 1] + '.png');
    $('#p1Dice2').css('display', '');
    $('#p1Dice2').attr('src', 'images/Dice-' + player1.rolledDice[player1.rolledDice.length - 2] + '.png');

    //Show current rolled dice results
    $('#p1Roll' + player1.roundCounter + 'Dice1').attr('src', 'images/Dice-' + player1.rolledDice[player1.rolledDice.length - 1] + '.png');
    $('#p1Roll' + player1.roundCounter + 'Dice2').attr('src', 'images/Dice-' + player1.rolledDice[player1.rolledDice.length - 2] + '.png');

    //Calculation current score
    Currentscore = calcScore(player1, player1.rolledDice[player1.rolledDice.length - 1], player1.rolledDice[player1.rolledDice.length - 2]);

    //Show current score
    $('#p1Roll' + player1.roundCounter + 'Score').text('Score: ' + player1.scores[player1.scores.length - 1]);

    player1.roundCounter += 1;

    $('#divPlayer1').removeClass('current-player');
    $('#divPlayer2').addClass('current-player');
    $('#btnRollDice').attr('disabled', true);
    $('#btnRollDice').removeClass('btn-rolldice-active');
    $('#btnRollDice').addClass('btn-rolldice-disabled');

    while (player1.roundCounter > 3) {
        player1.calcTotalScore(player1.scores);
        $('#p1TotalScore').text('Total Score: ' + player1.totalScore);
        computerRollDice();
        return;
    }
    //Computer turn for rolling dice
    computerRollDice();
}

//Player 2 (Computer) rolling dice
function computerRollDice() {
    //Just making a short delay to make it more real
    setTimeout(function () {

        for (let i = 0; i < 2; i++) {
            player2.addRolledDice(generateRandomInteger(1, 6));
        }

        //Show current pair of dices
        $('#p2Dice1').attr('src', 'images/Dice-' + player2.rolledDice[player2.rolledDice.length - 1] + '.png');
        $('#p2Dice2').css('display', '');
        $('#p2Dice2').attr('src', 'images/Dice-' + player2.rolledDice[player2.rolledDice.length - 2] + '.png');

        //Show rolled dice results
        $('#p2Roll' + player2.roundCounter + 'Dice1').attr('src', 'images/Dice-' + player2.rolledDice[player2.rolledDice.length - 1] + '.png');
        $('#p2Roll' + player2.roundCounter + 'Dice2').attr('src', 'images/Dice-' + player2.rolledDice[player2.rolledDice.length - 2] + '.png');

        //Calculation current score
        Currentscore = calcScore(player2, player2.rolledDice[player2.rolledDice.length - 1], player2.rolledDice[player2.rolledDice.length - 2]);

        //Show current score
        $('#p2Roll' + player2.roundCounter + 'Score').text('Score: ' + player2.scores[player2.scores.length - 1]);

        player2.roundCounter += 1;

        $('#divPlayer2').removeClass('current-player');
        $('#divPlayer1').addClass('current-player');
        $('#btnRollDice').removeAttr('disabled');
        $('#btnRollDice').removeClass('btn-rolldice-disabled');
        $('#btnRollDice').addClass('btn-rolldice-active');

        while (player2.roundCounter > 3) {
            player2.calcTotalScore(player2.scores);
            $('#p2TotalScore').text('Total Score: ' + player2.totalScore);
            $('#btnRollDice').attr('disabled', true);
            $('#btnRollDice').addClass('btn-rolldice-disabled');
            $('#divPlayer1').removeClass('current-player');
            $('#divPlayer2').removeClass('current-player');

            //Player 1 won
            if (player1.totalScore > player2.totalScore) {
                //$('#p1Dice1').css('display', 'none');
                $('#p1Dice2').css('display', 'none');
                $('#p1Dice1').attr('src', 'images/Champion.png');
                fadeInJs(document.getElementById("p1Dice1"));
                $('#p1Name').text(player1.name + ' Won the Game :)')

                $('#p2Dice2').css('display', 'none')
                $('#p2Dice1').attr('src', 'images/Looser.png');
                fadeInJs(document.getElementById("p2Dice1"));
                $('#p2Name').text(player2.name + ' Loosed :(');
                $('#btnNewGame').show();
            }
            // Computer won
            else {
                //$('#p2Dice1').css('display', 'none');
                $('#p2Dice2').css('display', 'none');
                $('#p2Dice1').attr('src', 'images/Champion.png');
                fadeInJs(document.getElementById("p2Dice1"));
                $('#p2Name').text(player2.name + ' Won the Game)')

                $('#p1Dice2').css('display', 'none')
                $('#p1Dice1').attr('src', 'images/Looser.png');
                fadeInJs(document.getElementById("p1Dice1"));
                $('#p1Name').text(player1.name + ' Loosed :(');
                $('#btnNewGame').show();

            }
            return;
        }

    }, 2500);
}


//Calculation Score of each rolling dice
function calcScore(obj, dice1, dice2) {
    switch (true) {
        case (dice1 == 1 || dice2 == 1):
            obj.addScores(0);
            break;
        case (dice1 == dice2):
            obj.addScores((dice1 + dice2) * 2);
            break;
        default:
            obj.addScores(dice1 + dice2);
            break;
    }
}

//Fade-in function
function fadeInJs(element) {
    //Opacity
    var op = 0.1;

    element.style.opacity = op;
    var timer = setInterval(function () {
        if (op <= 1) {
            op += 0.1;
            element.style.opacity = op;

        } else {
            clearInterval(timer);
        }
    }, 500);
}



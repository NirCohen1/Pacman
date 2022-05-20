$(document).ready(function() {
    var context = canvas.getContext("2d");
    var m_TargetScore = 0;
    //random
    var m_GhostNum = 3;
    var m_TotalBalls;
    var m_MaxTime = 180;
    var m_PacDirection = 4;

    //The direction of the ghost path
    let GhostOneDirection = "DOWN";
    var GhostTwoDirection = "RIGHT";
    var GhostThreeDirection = "RIGHT";
    var GhostFourDirection = "DOWN";

    var m_PacmanPosition = new Object();
    var FirstGhostPosition = new Object(); //Position of First Ghost
    var SecondGhostPosition = new Object(); //Position of Second Ghost
    var ThirdGhostPosition = new Object(); //Position of Third Ghost
    var FourthGhostPosition = new Object(); //Position of Fourth Ghost
    var bonus_pos = new Object();

    var special_pos = new Object();
    var m_special;
    //if there was food before the ghosts stepped in the tile
    var m_GhostOnePrev = 0;
    var m_GhostTwoPrev = 0;
    var m_GhostThreePrev = 0;
    var m_GhostFourPrev = 0;


    var m_livesUser;
    var m_TimesCatched;
    var board;
    var m_GameScore;
    var m_PacColor;
    var m_StartTime;
    var time_elapsed;
    var interval;
    var m_PlayerName = "Shachar"

    //scores for each ball
    var m_FirstBallScore = 5;
    var m_SecondBallScore = 15;
    var m_ThirdBallScore = 25;

    //has the game been completed
    var m_GameWon = false;
    var m_GameOver = false;

    //Game Keys Values
    var m_KeyUpUser = 38;
    var m_KeyDownUser = 40
    var m_KeyLeftUser = 37;
    var m_KeyRightUser = 39;


    Start();

    function Start() {
        playMusic();
        /*
        Movement: ArrowUp,ArrowDown,ArrowLeft,ArrowRight
        food: 90
        FirstBall Color1 num1 num1Points
        SecondBall Color2 num2 num2Points
        ThirdBall Color2 num3 num3Points
        GameTime: x seconds
        Ghosts: 3
    */
        board = [];
        m_GameScore = 0;
        m_TimesCatched = 0
        m_PacColor = "yellow";
        var cnt = 288;
        var food_remain = 29;
        var pacman_remain = 1;
        m_livesUser = 5;
        m_StartTime = new Date();
        m_special = 1;
        var m_FirstBallNum = Math.round(0.6 * m_TotalBalls);
        var m_SecondBallNum = Math.round(0.3 * m_TotalBalls);
        var m_ThirdBallNum = Math.round(0.1 * m_TotalBalls);


        board = [
            [4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 4],
            [4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
            [4, 0, 4, 0, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4],
            [4, 0, 4, 0, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 4],
            [4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 4, 0, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4],
            [4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 4, 0, 4, 0, 4],
            [4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 4],
            [4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4],
            [4, 0, 4, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 4, 4, 0, 4],
            [4, 0, 4, 0, 4, 4, 4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
            [4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 4, 4, 0, 4, 4, 0, 4],
            [4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4, 0, 0, 0, 4, 4, 0, 4],
            [4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4],
            [4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4]
        ]


        //Ghosts start in corners
        FirstGhostPosition.i = 1;
        FirstGhostPosition.j = 1;

        SecondGhostPosition.i = 16;
        SecondGhostPosition.j = 16;

        ThirdGhostPosition.i = 16;
        ThirdGhostPosition.j = 1;

        FourthGhostPosition.i = 1;
        FourthGhostPosition.j = 16;

        m_PacmanPosition.i=12;
        m_PacmanPosition.j=12;

        tempRed = Math.floor(0.6 * food_remain);
        tempGreen = Math.floor(0.3 * food_remain);
        tempDragon = Math.floor(0.1 * food_remain);
        food_remain = tempRed + tempGreen + tempDragon;

        /*
    2 = pacman
    3,5,6 = ghosts
    4 = wall
    7 = redBall
    8 = GreenBall
    9 = DragonBall
    */
        for (var i = 0; i < 18; i++) { //18 is the number of rows and columns
            for (var j = 0; j < 18; j++) {
                if (board[i][j] !== 0) {
                    continue;
                }
                //place food and pacman
                else {
                    var randomNum = Math.random();
                    if (randomNum <= 1.0 * food_remain / cnt) {
                        if (tempRed !== 0) {
                            board[i][j] = 7;
                            tempRed--;
                            food_remain--;
                            m_TargetScore += m_FirstBallScore;
                        } else if (tempRed === 0 && tempGreen !== 0) {
                            board[i][j] = 8;
                            tempGreen--;
                            food_remain--;
                            m_TargetScore += m_SecondBallScore;
                        } else if (tempRed === 0 && tempGreen === 0 && tempDragon !== 0) {
                            board[i][j] = 9;
                            tempDragon--;
                            food_remain--;
                            m_TargetScore += m_ThirdBallScore;
                        }
                    } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) { //place pacman
                        m_PacmanPosition.i = i;
                        m_PacmanPosition.j = j;
                        pacman_remain--;
                        board[i][j] = 2;
                    } else {
                        board[i][j] = 0;
                    }
                    cnt--;
                }
            }
        }

        while (food_remain > 0) {
            var emptyCell = findRandomEmptyCell(board);
            if (tempRed !== 0) {
                board[emptyCell[0]][emptyCell[1]] = 7;
                tempRed--;
                food_remain--;
                m_TargetScore += m_FirstBallScore;
            } else if (tempRed === 0 && tempGreen !== 0) {
                board[emptyCell[0]][emptyCell[1]] = 8;
                tempGreen--;
                food_remain--;
                m_TargetScore += m_SecondBallScore;
            } else if (tempRed === 0 && tempGreen === 0 && tempDragon !== 0) {
                board[emptyCell[0]][emptyCell[1]] = 9;
                tempDragon--;
                food_remain--;
                m_TargetScore += m_ThirdBallScore;
            }
        }
        var keysDown = new Object();
        addEventListener("keydown", function (e) {
            keysDown[e.keyCode] = true;
        }, false);
        addEventListener("keyup", function (e) {
            keysDown[e.keyCode] = false;
        }, false);
        Draw();
        interval = setInterval(UpdatePosition, 150);
        interval = setInterval(UpdatePositionGhosts, 600);
    }

    //Find Cells For the balls
    function findRandomEmptyCell(board) {
        var i = Math.floor((Math.random() * 9) + 1);
        var j = Math.floor((Math.random() * 9) + 1);
        if (board[i][j] === 0) {
            return [i, j];
        } else {
            while (board[i][j] !== 0) {
                i = Math.floor((Math.random() * 9) + 1);
                j = Math.floor((Math.random() * 9) + 1);
            }
        }
        return [i, j];
    }

    //Receive as input the key on which the user clicks and return value accordingly
    function GetKeyPressed() {
        //ArrowUp
        if (keysDown[m_KeyUpUser]) {
            return 1;
        }
        //ArrowDown
        if (keysDown[m_KeyDownUser]) {
            return 2;
        }
        //ArrowLeft
        if (keysDown[m_KeyLeftUser]) {
            return 3;
        }
        //ArrowRight
        if (keysDown[m_KeyRightUser]) {
            return 4;
        }
    }

    //Allow the user to enter random game values
    function Randomize() {
        m_GhostNum = Math.floor(Math.random() * 4);
        m_TotalBalls = Math.floor(Math.random() * 51) + 40;
        m_MaxTime = 60 + Math.floor(Math.random() * 150);
    }


    function Draw() {
        canvas.width = canvas.width; //clean board
        lblScore.value = m_GameScore;
        lblTime.value = m_MaxTime - time_elapsed;
        LivesLeft.value = m_livesUser;
        PlayerNameLabel.value = m_PlayerName;
        TargetScore.value = m_TargetScore;

        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 18; j++) {
                var center = {};
                center.x = i * 40 + 30;
                center.y = j * 40 + 30;

                //draw pacman
                if (board[i][j] === 2) {
                    //UP
                    if (m_PacDirection === 1) {
                        context.beginPath();
                        context.arc(center.x, center.y, 20, 1.85 * Math.PI, 1.45 * Math.PI); // half circle
                        context.lineTo(center.x, center.y);
                        context.fillStyle = m_PacColor; //color 
                        context.fill();
                        context.beginPath();
                        context.arc(center.x - 5, center.y + 13, 4, 0, 2 * Math.PI); // circle
                        context.fillStyle = "black"; //color 
                        context.fill();
                    }
                    //Down
                    if (m_PacDirection === 2) {
                        context.beginPath();
                        context.arc(center.x, center.y, 20, 0.6 * Math.PI, 0.3 * Math.PI); // half circle
                        context.lineTo(center.x, center.y);
                        context.fillStyle = m_PacColor; //color 
                        context.fill();
                        context.beginPath();
                        context.arc(center.x + 5, center.y - 13, 4, 0, 2 * Math.PI); // circle
                        context.fillStyle = "black"; //color 
                        context.fill();
                    }
                    //Left
                    if (m_PacDirection === 3) {
                        context.beginPath();
                        context.arc(center.x, center.y, 20, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
                        context.lineTo(center.x, center.y);
                        context.fillStyle = m_PacColor; //color 
                        context.fill();
                        context.beginPath();
                        context.arc(center.x + 5, center.y - 13, 4, 0, 2 * Math.PI); // circle
                        context.fillStyle = "black"; //color 
                        context.fill();
                    }
                    //Right
                    if (m_PacDirection === 4) {
                        context.beginPath();
                        context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                        context.lineTo(center.x, center.y);
                        context.fillStyle = m_PacColor; //color 
                        context.fill();
                        context.beginPath();
                        context.arc(center.x + 5, center.y - 13, 4, 0, 2 * Math.PI); // circle
                        context.fillStyle = "black"; //color 
                        context.fill();
                    }
                }
                //draw foods
                else if (board[i][j] === 7) {
                    context.beginPath();
                    context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                    context.fillStyle = "red"; //color 
                    context.fill();
                } else if (board[i][j] === 8) {
                    context.beginPath();
                    context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                    context.fillStyle = "green"; //color 
                    context.fill();
                } else if (board[i][j] === 9) {
                    context.beginPath();
                    context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                    context.fillStyle = "orange"; //color 
                    context.fill();
                }
                //draw Ghost1
                else if (board[i][j] === 3) {
                    var base_image = new Image();
                    base_image.src = 'ghost1.png';
                    context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
                }
                //draw Wall
                else if (board[i][j] === 4) {

                    base_image = new Image();
                    base_image.src = 'wall7.png';
                    context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
                }
                //draw Ghost2
                else if (board[i][j] === 5) {
                    base_image = new Image();
                    base_image.src = 'ghost2.png';
                    context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
                }
                //draw Ghost3
                else if (board[i][j] === 6) {
                    base_image = new Image();
                    base_image.src = 'ghost3.png';
                    context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
                }
                //draw Ghost4
                else if (board[i][j] === 10) {
                    base_image = new Image();
                    base_image.src = 'ghost4.png';
                    context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
                }
            }
        }
    }

    //Makes the ghosts chase Pacman
    function UpdatePositionGhosts() {
        //Ghost1: 3, Ghost2:5, Ghost3:6, Ghost4:10
        if (m_GhostNum === 1) {
            FirstGhostMovement();
        }
        if (m_GhostNum === 2) {
            FirstGhostMovement();
            SecondGhostMovement();
        }
        if (m_GhostNum === 3) {
            FirstGhostMovement();
            SecondGhostMovement();
            ThirdGhostMovement();
        }
        if (m_GhostNum === 4) {
            FirstGhostMovement();
            SecondGhostMovement();
            ThirdGhostMovement();
            FourthGhostMovement();
        }

    }

    /* Update the position of pacman according
    to what key has been pressed
    */
    function UpdatePosition() {
        board[m_PacmanPosition.i][m_PacmanPosition.j] = 0;
        var x = GetKeyPressed()
        //Move Pacman Up
        if (x === 1) {
            if (m_PacmanPosition.j > 0 && board[m_PacmanPosition.i][m_PacmanPosition.j - 1] != 4) {
                m_PacmanPosition.j--;
                m_PacDirection = 1;
            }
        }
        //Move Pacman Down
        if (x === 2) {
            if (m_PacmanPosition.j < 17 && board[m_PacmanPosition.i][m_PacmanPosition.j + 1] !== 4) {
                m_PacmanPosition.j++;
                m_PacDirection = 2;
            }
        }
        //Move Pacman To The Left
        if (x === 3) {
            if (m_PacmanPosition.i > 0 && board[m_PacmanPosition.i - 1][m_PacmanPosition.j] !== 4) {
                m_PacmanPosition.i--;
                m_PacDirection = 3;
            }
        }
        //Move Pacman To The Right
        if (x === 4) {
            if (m_PacmanPosition.i < 17 && board[m_PacmanPosition.i + 1][m_PacmanPosition.j] !== 4) {
                m_PacmanPosition.i++;
                m_PacDirection = 4;
            }
        }
        //Pacman moves to a place where there is food
        if (board[m_PacmanPosition.i][m_PacmanPosition.j] === 7) {
            m_GameScore = m_GameScore + m_FirstBallScore;
        }
        if (board[m_PacmanPosition.i][m_PacmanPosition.j] === 8) {
            m_GameScore = m_GameScore + m_SecondBallScore;
        }
        if (board[m_PacmanPosition.i][m_PacmanPosition.j] === 9) {
            m_GameScore = m_GameScore + m_ThirdBallScore;
        }
        board[m_PacmanPosition.i][m_PacmanPosition.j] = 2; //Draw pacman in his new position
        var currentTime = new Date();
        time_elapsed = (currentTime - m_StartTime) / 1000;

        if (m_GameScore === m_TargetScore) {
            window.clearInterval(interval);
            window.alert("Winner!!!");
            m_GameWon = true;
            m_TargetScore = 0;
            playMusic();
        }

        /*
        In case of a ghost catching pacman
        */
        if ((m_PacmanPosition.i === FirstGhostPosition.i && m_PacmanPosition.j === FirstGhostPosition.j) || (m_PacmanPosition.i === SecondGhostPosition.i && m_PacmanPosition.j === SecondGhostPosition.j) || ((m_PacmanPosition.i == ThirdGhostPosition.i && m_PacmanPosition.j == ThirdGhostPosition.j) || ((m_PacmanPosition.i == FourthGhostPosition.i && m_PacmanPosition.j == FourthGhostPosition.j)))) {
            board[m_PacmanPosition.i][m_PacmanPosition.j] = 0;
            board[FirstGhostPosition.i][FirstGhostPosition.j] = m_GhostOnePrev;
            board[SecondGhostPosition.i][SecondGhostPosition.j] = m_GhostTwoPrev;
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = m_GhostThreePrev;
            board[FourthGhostPosition.i][FourthGhostPosition.j] = m_GhostFourPrev;
            m_GhostOnePrev = 0;
            m_GhostTwoPrev = 0;
            m_GhostThreePrev = 0;
            m_GhostFourPrev = 0;
            m_GameScore -= 10;
            m_TargetScore -= 10;
            m_TimesCatched++;
            m_livesUser--;
            FirstGhostPosition.i = 1;
            FirstGhostPosition.j = 1;
            SecondGhostPosition.i = 16;
            SecondGhostPosition.j = 16;
            ThirdGhostPosition.i = 16;
            ThirdGhostPosition.j = 1;
            FourthGhostPosition.i = 1;
            FourthGhostPosition.j = 16;
            board[FirstGhostPosition.i][FirstGhostPosition.j] = 3;
            board[SecondGhostPosition.i][SecondGhostPosition.j] = 5;
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = 6;
            board[FourthGhostPosition.i][FourthGhostPosition.j] = 10;
            emptyCell = findRandomEmptyCell(board)
            m_PacmanPosition.i = emptyCell[0];
            m_PacmanPosition.j = emptyCell[1];
            if (m_livesUser === 0) {
                window.clearInterval(interval);
                window.alert("Loser!!!");
                m_GameOver = true;
                playMusic();
            }
        } else {
            Draw();
        }
    }
    function playMusic() {
        if (m_GameOver === false && m_GameWon === false) {
            var dbgt_audio = document.getElementById("DBGT");
            dbgt_audio.play();
        }
        if (m_GameOver === true) {
            dbgt_audio.pause();
            var GameOverAudio = document.getElementById("GameOver");
            GameOverAudio.play();
        }
        if (m_GameWon === true) {
            dbgt_audio.pause();
            var GameWonAudio = document.getElementById("GameWon");
            GameWonAudio.play();
        }

    }

    function FirstGhostMovement() {
        var UpDistGhost1 = pythagorean(m_PacmanPosition.i - FirstGhostPosition.i, m_PacmanPosition.j - (FirstGhostPosition.j - 1));
        var DownDistGhost1 = pythagorean(m_PacmanPosition.i - FirstGhostPosition.i, m_PacmanPosition.j - (FirstGhostPosition.j + 1));
        var LeftDistGhost1 = pythagorean(m_PacmanPosition.i - (FirstGhostPosition.i - 1), m_PacmanPosition.j - FirstGhostPosition.j);
        var RightDistGhost1 = pythagorean(m_PacmanPosition.i - (FirstGhostPosition.i + 1), m_PacmanPosition.j - FirstGhostPosition.j);
        //check for collision before moving
        //and update dist to infinity so it will not choose it in case there is collision
        if (board[FirstGhostPosition.i][FirstGhostPosition.j - 1] === 4 || board[FirstGhostPosition.i][FirstGhostPosition.j - 1] === 3 || board[FirstGhostPosition.i][FirstGhostPosition.j - 1] === 5 || board[FirstGhostPosition.i][FirstGhostPosition.j - 1] === 6 || board[FirstGhostPosition.i][FirstGhostPosition.j - 1] === 10) {
            UpDistGhost1 = Infinity;
        }
        if (board[FirstGhostPosition.i][FirstGhostPosition.j + 1] === 4 || board[FirstGhostPosition.i][FirstGhostPosition.j + 1] === 3 || board[FirstGhostPosition.i][FirstGhostPosition.j + 1] === 5 || board[FirstGhostPosition.i][FirstGhostPosition.j + 1] === 6 || board[FirstGhostPosition.i][FirstGhostPosition.j + 1] === 10) {
            DownDistGhost1 = Infinity;
        }
        if (board[FirstGhostPosition.i - 1][FirstGhostPosition.j] === 4 || board[FirstGhostPosition.i - 1][FirstGhostPosition.j] === 3 || board[FirstGhostPosition.i - 1][FirstGhostPosition.j] === 5 || board[FirstGhostPosition.i - 1][FirstGhostPosition.j] === 6 || board[FirstGhostPosition.i - 1][FirstGhostPosition.j] === 10) {
            LeftDistGhost1 = Infinity;
        }
        if (board[FirstGhostPosition.i + 1][FirstGhostPosition.j] === 4 || board[FirstGhostPosition.i + 1][FirstGhostPosition.j] === 3 || board[FirstGhostPosition.i + 1][FirstGhostPosition.j] === 5 || board[FirstGhostPosition.i + 1][FirstGhostPosition.j] === 6 || board[FirstGhostPosition.i + 1][FirstGhostPosition.j] === 10) {
            RightDistGhost1 = Infinity;
        }
        var PrefferdDirection1 = GetPrefDir(UpDistGhost1, DownDistGhost1, LeftDistGhost1, RightDistGhost1, GhostOneDirection);

        if (PrefferdDirection1.localeCompare("UP") === 0) {
            board[FirstGhostPosition.i][FirstGhostPosition.j] = m_GhostOnePrev;
            m_GhostOnePrev = board[FirstGhostPosition.i][FirstGhostPosition.j - 1];
            FirstGhostPosition.j--;
            board[FirstGhostPosition.i][FirstGhostPosition.j] = 3;
            GhostOneDirection = "UP";
        }
        if (PrefferdDirection1.localeCompare("DOWN") === 0) {
            board[FirstGhostPosition.i][FirstGhostPosition.j] = m_GhostOnePrev;
            m_GhostOnePrev = board[FirstGhostPosition.i][FirstGhostPosition.j + 1];
            FirstGhostPosition.j++;
            board[FirstGhostPosition.i][FirstGhostPosition.j] = 3;
            GhostOneDirection = "DOWN";
        }
        if (PrefferdDirection1.localeCompare("LEFT") === 0) {
            board[FirstGhostPosition.i][FirstGhostPosition.j] = m_GhostOnePrev; //place the food back if there was one
            m_GhostOnePrev = board[FirstGhostPosition.i - 1][FirstGhostPosition.j]; //keep whats in the tile before moving for later
            FirstGhostPosition.i--; //move LEFT
            board[FirstGhostPosition.i][FirstGhostPosition.j] = 3; //Update
            GhostOneDirection = "LEFT";
        }
        if (PrefferdDirection1.localeCompare("RIGHT") === 0) {
            board[FirstGhostPosition.i][FirstGhostPosition.j] = m_GhostOnePrev;
            m_GhostOnePrev = board[FirstGhostPosition.i + 1][FirstGhostPosition.j];
            FirstGhostPosition.i++;
            board[FirstGhostPosition.i][FirstGhostPosition.j] = 3;
            GhostOneDirection = "RIGHT";
        }
        if (m_GhostOnePrev === 2) {
            m_GhostOnePrev = 0;
        }
    }

    function SecondGhostMovement() {
        var UpDistGhost2 = pythagorean(m_PacmanPosition.i - SecondGhostPosition.i, m_PacmanPosition.j - (SecondGhostPosition.j - 1));
        var DownDistGhost2 = pythagorean(m_PacmanPosition.i - SecondGhostPosition.i, m_PacmanPosition.j - (SecondGhostPosition.j + 1));
        var LeftDistGhost2 = pythagorean(m_PacmanPosition.i - (SecondGhostPosition.i - 1), m_PacmanPosition.j - SecondGhostPosition.j);
        var RightDistGhost2 = pythagorean(m_PacmanPosition.i - (SecondGhostPosition.i + 1), m_PacmanPosition.j - SecondGhostPosition.j);
        //check for collision before moving
        //and update dist to infinity so it will not choose it in case there is collision
        if (board[SecondGhostPosition.i][SecondGhostPosition.j - 1] === 4 || board[SecondGhostPosition.i][SecondGhostPosition.j - 1] === 3 || board[SecondGhostPosition.i][SecondGhostPosition.j - 1] === 5 || board[SecondGhostPosition.i][SecondGhostPosition.j - 1] === 6 || board[SecondGhostPosition.i][SecondGhostPosition.j - 1] === 10) {
            UpDistGhost2 = Infinity;
        }
        if (board[SecondGhostPosition.i][SecondGhostPosition.j + 1] === 4 || board[SecondGhostPosition.i][SecondGhostPosition.j + 1] === 3 || board[SecondGhostPosition.i][SecondGhostPosition.j + 1] === 5 || board[SecondGhostPosition.i][SecondGhostPosition.j + 1] === 6 || board[SecondGhostPosition.i][SecondGhostPosition.j + 1] === 10) {
            DownDistGhost2 = Infinity;
        }
        if (board[SecondGhostPosition.i - 1][SecondGhostPosition.j] === 4 || board[SecondGhostPosition.i - 1][SecondGhostPosition.j] === 3 || board[SecondGhostPosition.i - 1][SecondGhostPosition.j] === 5 || board[SecondGhostPosition.i - 1][SecondGhostPosition.j] === 6 || board[SecondGhostPosition.i - 1][SecondGhostPosition.j] === 10) {
            LeftDistGhost2 = Infinity;
        }
        if (board[SecondGhostPosition.i + 1][SecondGhostPosition.j] === 4 || board[SecondGhostPosition.i + 1][SecondGhostPosition.j] === 3 || board[SecondGhostPosition.i + 1][SecondGhostPosition.j] === 5 || board[SecondGhostPosition.i + 1][SecondGhostPosition.j] === 6 || board[SecondGhostPosition.i + 1][SecondGhostPosition.j] === 10) {
            RightDistGhost2 = Infinity;
        }
        var PrefferdDirection2 = GetPrefDir(UpDistGhost2, DownDistGhost2, LeftDistGhost2, RightDistGhost2, GhostTwoDirection);

        if (PrefferdDirection2.localeCompare("UP") === 0) {
            board[SecondGhostPosition.i][SecondGhostPosition.j] = m_GhostTwoPrev;
            m_GhostTwoPrev = board[SecondGhostPosition.i][SecondGhostPosition.j - 1];
            SecondGhostPosition.j--;
            board[SecondGhostPosition.i][SecondGhostPosition.j] = 5;
            GhostTwoDirection = "UP";
        }
        if (PrefferdDirection2.localeCompare("DOWN") === 0) {
            board[SecondGhostPosition.i][SecondGhostPosition.j] = m_GhostTwoPrev;
            m_GhostTwoPrev = board[SecondGhostPosition.i][SecondGhostPosition.j + 1];
            SecondGhostPosition.j++;
            board[SecondGhostPosition.i][SecondGhostPosition.j] = 5;
            GhostTwoDirection = "DOWN";
        }
        if (PrefferdDirection2.localeCompare("LEFT") === 0) {
            board[SecondGhostPosition.i][SecondGhostPosition.j] = m_GhostTwoPrev; //place the food back if there was one
            m_GhostTwoPrev = board[SecondGhostPosition.i - 1][SecondGhostPosition.j]; //keep whats in the tile before moving for later
            SecondGhostPosition.i--; //move LEFT
            board[SecondGhostPosition.i][SecondGhostPosition.j] = 5; //Update
            GhostTwoDirection = "LEFT";
        }
        if (PrefferdDirection2.localeCompare("RIGHT") === 0) {
            board[SecondGhostPosition.i][SecondGhostPosition.j] = m_GhostTwoPrev;
            m_GhostTwoPrev = board[SecondGhostPosition.i + 1][SecondGhostPosition.j];
            SecondGhostPosition.i++;
            board[SecondGhostPosition.i][SecondGhostPosition.j] = 5;
            GhostTwoDirection = "RIGHT";
        }
        if (m_GhostTwoPrev === 2) {
            m_GhostTwoPrev = 0;
        }
    }

    function ThirdGhostMovement() {
        var UpDistGhost3 = pythagorean(m_PacmanPosition.i - ThirdGhostPosition.i, m_PacmanPosition.j - (ThirdGhostPosition.j - 1));
        var DownDistGhost3 = pythagorean(m_PacmanPosition.i - ThirdGhostPosition.i, m_PacmanPosition.j - (ThirdGhostPosition.j + 1));
        var LeftDistGhost3 = pythagorean(m_PacmanPosition.i - (ThirdGhostPosition.i - 1), m_PacmanPosition.j - ThirdGhostPosition.j);
        var RightDistGhost3 = pythagorean(m_PacmanPosition.i - (ThirdGhostPosition.i + 1), m_PacmanPosition.j - ThirdGhostPosition.j);
        //check for collision before moving
        //and update dist to infinity so it will not choose it in case there is collision
        if (board[ThirdGhostPosition.i][ThirdGhostPosition.j - 1] === 4 || board[ThirdGhostPosition.i][ThirdGhostPosition.j - 1] === 3 || board[ThirdGhostPosition.i][ThirdGhostPosition.j - 1] === 5 || board[ThirdGhostPosition.i][ThirdGhostPosition.j - 1] === 6 || board[ThirdGhostPosition.i][ThirdGhostPosition.j - 1] === 10) {
            UpDistGhost3 = Infinity;
        }
        if (board[ThirdGhostPosition.i][ThirdGhostPosition.j + 1] === 4 || board[ThirdGhostPosition.i][ThirdGhostPosition.j + 1] === 3 || board[ThirdGhostPosition.i][ThirdGhostPosition.j + 1] === 5 || board[ThirdGhostPosition.i][ThirdGhostPosition.j + 1] === 6 || board[ThirdGhostPosition.i][ThirdGhostPosition.j + 1] === 10) {
            DownDistGhost3 = Infinity;
        }
        if (board[ThirdGhostPosition.i - 1][ThirdGhostPosition.j] === 4 || board[ThirdGhostPosition.i - 1][ThirdGhostPosition.j] === 3 || board[ThirdGhostPosition.i - 1][ThirdGhostPosition.j] === 5 || board[ThirdGhostPosition.i - 1][ThirdGhostPosition.j] === 6 || board[ThirdGhostPosition.i - 1][ThirdGhostPosition.j] === 10) {
            LeftDistGhost3 = Infinity;
        }
        if (board[ThirdGhostPosition.i + 1][ThirdGhostPosition.j] === 4 || board[ThirdGhostPosition.i + 1][ThirdGhostPosition.j] === 3 || board[ThirdGhostPosition.i + 1][ThirdGhostPosition.j] === 5 || board[ThirdGhostPosition.i + 1][ThirdGhostPosition.j] === 6 || board[ThirdGhostPosition.i + 1][ThirdGhostPosition.j] === 10) {
            RightDistGhost3 = Infinity;
        }
        var PrefferdDirection3 = GetPrefDir(UpDistGhost3, DownDistGhost3, LeftDistGhost3, RightDistGhost3, GhostThreeDirection);

        if (PrefferdDirection3.localeCompare("UP") === 0) {
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = m_GhostThreePrev;
            m_GhostThreePrev = board[ThirdGhostPosition.i][ThirdGhostPosition.j - 1];
            ThirdGhostPosition.j--;
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = 6;
            GhostThreeDirection = "UP";
        }
        if (PrefferdDirection3.localeCompare("DOWN") === 0) {
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = m_GhostThreePrev;
            m_GhostThreePrev = board[ThirdGhostPosition.i][ThirdGhostPosition.j + 1];
            ThirdGhostPosition.j++;
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = 6;
            GhostThreeDirection = "DOWN";
        }
        if (PrefferdDirection3.localeCompare("LEFT") === 0) {
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = m_GhostThreePrev; //place the food back if there was one
            m_GhostThreePrev = board[ThirdGhostPosition.i - 1][ThirdGhostPosition.j]; //keep whats in the tile before moving for later
            ThirdGhostPosition.i--; //move LEFT
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = 6; //Update
            GhostThreeDirection = "LEFT";
        }
        if (PrefferdDirection3.localeCompare("RIGHT") === 0) {
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = m_GhostThreePrev;
            m_GhostThreePrev = board[ThirdGhostPosition.i + 1][ThirdGhostPosition.j];
            ThirdGhostPosition.i++;
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = 6;
            GhostThreeDirection = "RIGHT";
        }
        if (m_GhostThreePrev === 2) {
            m_GhostThreePrev = 0;
        }
    }

    function FourthGhostMovement() {
        return 1;
    }

    function pythagorean(sideA, sideB) {
        return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
    }

    //Get the Preffered direction for the ghost to go to
    function GetPrefDir(UpDist, DownDist, LeftDist, RightDist, GhostPrevDir) {
        //CHECK UP
        if (Math.min(UpDist, DownDist, LeftDist, RightDist) === UpDist) {
            if (GhostPrevDir.localeCompare("DOWN") !== 0) {
                return "UP"
            }
            if (Math.min(DownDist, LeftDist, RightDist) === Infinity) {
                return "UP";
            }
            if (Math.min(DownDist, LeftDist, RightDist) === DownDist) {
                return "DOWN";
            }
            if (Math.min(DownDist, LeftDist, RightDist) === LeftDist) {
                return "LEFT";
            }
            if (Math.min(DownDist, LeftDist, RightDist) === RightDist) {
                return "RIGHT";
            }
        }
        //CHECK DOWN
        if (Math.min(UpDist, DownDist, LeftDist, RightDist) === DownDist) {
            if (GhostPrevDir.localeCompare("UP") !== 0) {
                return "DOWN"
            }
            if (Math.min(UpDist, LeftDist, RightDist) === Infinity) {
                return "DOWN";
            }
            if (Math.min(UpDist, LeftDist, RightDist) === UpDist) {
                return "UP";
            }
            if (Math.min(UpDist, LeftDist, RightDist) === LeftDist) {
                return "LEFT";
            }
            if (Math.min(UpDist, LeftDist, RightDist) === RightDist) {
                return "RIGHT";
            }
        }

        //CHECK LEFT
        if (Math.min(UpDist, DownDist, LeftDist, RightDist) === LeftDist) {
            if (GhostPrevDir.localeCompare("RIGHT") !== 0) {
                return "LEFT"
            }
            if (Math.min(UpDist, DownDist, RightDist) === Infinity) {
                return "LEFT";
            }
            if (Math.min(UpDist, DownDist, RightDist) === UpDist) {
                return "UP";
            }
            if (Math.min(UpDist, DownDist, RightDist) === DownDist) {
                return "DOWN";
            }
            if (Math.min(UpDist, DownDist, RightDist) === RightDist) {
                return "RIGHT";
            }
        }

        //CHECK RIGHT
        if (Math.min(UpDist, DownDist, LeftDist, RightDist) === RightDist) {
            if (GhostPrevDir.localeCompare("LEFT") !== 0) {
                return "RIGHT";
            }
            if (Math.min(UpDist, DownDist, LeftDist) === Infinity) {
                return "RIGHT";
            }
            if (Math.min(UpDist, DownDist, LeftDist) === UpDist) {
                return "UP";
            }
            if (Math.min(UpDist, DownDist, LeftDist) === DownDist) {
                return "DOWN";
            }
            if (Math.min(UpDist, DownDist, LeftDist) === LeftDist) {
                return "LEFT";
            }
        }
    }

});

$(document).ready(function(){
    
    function RandomWord(){
        var url = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=1000&maxCorpusCount=-1&minDictionaryCount=20&maxDictionaryCount=-1&minLength=3&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
        $.getJSON(url, function(wordData){
            gameData.gameWord = wordData.word.toLowerCase();
            GamePlay(gameData.gameWord);
        });
    }
    var bodyParts = ["#head", "#body", "#left_arm", "#right_arm", "#left_leg", "#right_leg"];
    var gameData;
    var let;
    // var letterClass ='';
    // var hangManHangs ='';
    // var incorrectGuesses=0;
    // var correctGuesses=0;
    // var lettersGuessed = [];

    // function GamePlay(word){
    function GamePlay(word){
        gameData.lettersGuessed = [];
        gameData.incorrectGuesses = 0;
        gameData.correctGuesses = 0;

        // Create the game board
        for (var i=0; i<word.length; i++){
            gameData.gameBoard = '<div class="letter ' + word[i] + ' id="'+ i + '">' + word[i] + '</div>';
            $('#letters').append(gameData.gameBoard);
        }
        // Check a guess against the word
        $('form').submit(function(event){
            event.preventDefault();
            let = $('input').val();
            // Check if letter was guessed already
            for (var k=0; k < gameData.lettersGuessed.length; k++){
                if (let == gameData.lettersGuessed[k]){
                    return;
                }
            }
            if (let == '' || let == " "){
                return;
            }
            $('input').val('');
            
            // Add letter to list of already guessed
            gameData.lettersGuessed.push(let);
            
            // Check the letter against each letter until you find a match or the end of the word
            var j=0;
            while(word[j]!=let && j<word.length){
                j++;
            }
            // Guess did not match - display a body part
            if (j==word.length){
                gameData.hangManHangs = bodyParts[gameData.incorrectGuesses];
                gameData.incorrectGuesses ++;
                $(gameData.hangManHangs).show();
            } else {
            // Guess matched - Display matching letters
                gameData.letterClass = "." + let;
                $(gameData.letterClass).css('color', 'black');
                gameData.correctGuesses += $(gameData.letterClass).length;
            }
            // Losing the game
            if (gameData.incorrectGuesses == 6){
                $('#head').css('background-image','url("dead_face.jpeg")');
                $('#loss').append(word);
                $('#start_over').focus();
                $( function() {
                    $("#loss").dialog();
                });

            }
            // Winning the game
            if (gameData.correctGuesses == word.length){
                $('.hung_man').show();
                $('.hung_man').css('border-color', 'white');
                $('#head').css('background-image','url("smile.jpeg")');
                $('#gallows').css('background-image','url("fireworks.gif"');
                $('#start_over').focus();
                $( function() {
                    $("#win").dialog();
                });
            }
            // console.log(gameData);
        });

    }

    function StartGame(){
        gameData = {};
        // console.log(gameData);
        $(".hung_man").css('display', 'none');
        $('#head').css('background-image', 'none');
        $('#letters').html('');
        $('#guessing').show();
        // $(this).hide();
        // $(this).siblings('button').show();
        RandomWord();
    }

    StartGame();

    $('#start_over').click(function(){
        window.location.reload();
    });
});

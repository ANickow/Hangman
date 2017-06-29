$(document).ready(function(){

    function RandomWord(){
        var url = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
        var gameWord;
        $.getJSON(url, function(wordData){
            console.log(wordData.word);
            GamePlay(wordData.word);
        });
        return gameWord;
    }
    var bodyParts = ["#head", "#body", "#left_arm", "#right_arm", "#left_leg", "#right_leg"];
    var $letters = $('#letters');
    var letterClass ='';
    var hangManHangs ='';
    var incorrectGuesses=0;
    var correctGuesses=0;
    var lettersGuessed = [];

    function GamePlay(word){
        // Create the game board
        var str;
        for (var i=0; i<word.length; i++){
            str = '<div class="letter ' + word[i] + ' id="'+ i + '">' + word[i] + '</div>';
            $letters.append(str);
        }
        // Check a guess against the word
        $('form').submit(function(event){
            event.preventDefault();
            var let = $('input').val();
            for (var k=0; k<lettersGuessed.length; k++){
                if (let == lettersGuessed[k]){
                    alert("You guessed that letter already.  Try another one");
                    return;
                }
            }
            $('input').val('');
            lettersGuessed.push(let);
            var j=0;
            while(word[j]!=let && j<word.length){
                j++;
            }
            // Guess did not match - display a body part
            if (j==word.length){
                hangManHangs = bodyParts[incorrectGuesses];
                incorrectGuesses ++;
                $(hangManHangs).show();
            } else {
            // Guess matched - Display matching letters
                letterClass = "." + let;
                $(letterClass).css('color', 'black');
                correctGuesses += $(letterClass).length;
            }
            // Losing the game
            if (incorrectGuesses == 6){
                $('#head').css('background-image','url("dead_face.jpeg")');
                GameReset();
            }
            // Winning the game
            if (correctGuesses == word.length){
                $('.hung_man').show();
                $('#head').css('background-image','url("smile.jpeg")');
                GameReset();
            }
            console.log("Incorrect Guesses = " + incorrectGuesses);
            console.log("Correct Guesses = " + correctGuesses);
        });

    }

    function GameReset(){
        letterClass ='';
        hangManHangs ='';
        incorrectGuesses=0;
        correctGuesses=0;
        lettersGuessed = [];
    }

    $('#start').click(function(){
        $(".hung_man").css('display', 'none');
        $('#head').css('background-image', 'none');
        $letters.html('');
        $('#guessing').show();
        $(this).text('Start Over?');
        RandomWord();
    });

});

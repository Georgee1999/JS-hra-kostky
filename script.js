
//Základní promněnné
let totalScore, roundScore, activePlayer, dice, playGame;

newStart();

function newStart()
{   
totalScore = [0,0];
roundScore = 0;
// active player = 0(první hráč)
// active player = 1(druhý hráč)
activePlayer = 0;
playGame = true;

// Vynulování a odstranění kostky
document.getElementById("totalScorePlayer-0").textContent = 0;
document.getElementById("totalScorePlayer-1").textContent = 0;
document.getElementById("currentScore-0").textContent = 0;
document.getElementById("currentScore-1").textContent = 0;

// Skrytí kostky
document.querySelector(".diceImage").style.display = "none";

// Texty do původního stavu, aby se smazal text "Vítěz Vítěz"
document.querySelector("#name-0").textContent = "Skóre 1. hráče"; 
document.querySelector("#name-1").textContent = "Skóre 2. hráče"; 

// Vrátíme zvýraznění aktivního hráče k prvnímu, a u druhého odstraníme
document.querySelector(".totalScore0").classList.add("active");
document.querySelector(".totalScore1").classList.remove("active");
}


// Měníme obrázek podle náhodného čísla
document.querySelector(".rollDice").addEventListener("click", function()
{
    if(playGame)
    {
        // 1. Generujeme nahodne číslo mezi 1 - 6
    let dice = Math.ceil(Math.random() * 6);

        // 2. Zobrazit správný obrázek
    let diceElement = document.querySelector(".diceImage");
    diceElement.style.display = "block";
    console.log(diceElement.src = "picture/" + dice + ".jpg");

        // 3. Nasčítáme čísla s kostky
    if(dice !== 1)
    {
        roundScore = roundScore +  dice;
        document.getElementById("currentScore-" + activePlayer).textContent = roundScore;
    } else
        {
            // Bude hrát další hráč.
            nextPlayer();
        }

    }
});

function nextPlayer()
{
    if(activePlayer === 0)
    {
        activePlayer = 1;
    } else
        {
            activePlayer = 0;
        }
    
    roundScore = 0;

    // Když padne "jedna", tak současné skóré se vynuluje a současné skoré se zobrazí jako hodnata 0.
    document.getElementById("currentScore-0").textContent = 0;
    document.getElementById("currentScore-1").textContent = 0;

    // Skrytí kostky když padne jedna
    document.querySelector(".diceImage").style.display = "none";

    
    // .toggle = v sobě skrýva add i remove
    // toogle říká : pokud .totalScore0 má .active, tak mu odeber(remove) .active
    // pokud ho nemá, tak ho přidej.
    document.querySelector(".totalScore0").classList.toggle("active");

    // toogle říká : pokud .totalScore1 má .active, tak mu odeber(remove) .active
    // pokud ho nemá, tak ho přidej.
    document.querySelector(".totalScore1").classList.toggle("active");
}


//Když hráč klikne na podržet score
document.querySelector(".holdScore").addEventListener("click", function()
{   
    if(playGame)
    {
         // Celkové skore se vyplní současným skóre
    totalScore[activePlayer] = totalScore[activePlayer] + roundScore;

    // Změní skóre hráče 1/2 na totalSkore
    document.querySelector("#totalScorePlayer-" + activePlayer).textContent =
    totalScore[activePlayer];
    if(totalScore[activePlayer] >= 60)
    {
        // Změní mi text Skore1/2. hráče na "Vítěz Vítěz"
        document.querySelector("#name-" + activePlayer).textContent = "Vítěz!! Vítěz!!"; 
        // Skryje kostku
        document.querySelector(".diceImage").style.display = "none";
        playGame = false;
    }else
        {   // Zavoláme funkci nextPlayer()
            nextPlayer();
        }
    }
});


// Přidání EventListener na tlačítko "Nová Hra" (click)
document.querySelector(".newGame").addEventListener("click",newStart);
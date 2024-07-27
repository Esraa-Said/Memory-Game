//#endregion
//#region variables declaration
const prepare = {
    selectedCard_1: undefined,
    selectedCard_2: undefined,
    selectedIndex_1: -1,
    selectedIndex_2: -1,
};
prepare.cards = [];
prepare.completeAudio = new Audio("../assets/audio/level_completed.wav");
prepare.flipAudio = new Audio("../assets/audio/cardFlip.mp3");
prepare.correctAudio = new Audio("../assets/audio/earn.wav");
prepare.wrongAudio = new Audio("../assets/audio/wrong.wav");
prepare.gameOverAudio = new Audio("../assets/audio/game_over.wav");
prepare.progress = 0;
const numberOfCards = 20;
const tempNumbers = [];
let cardsHtmlContent = "";
let gameTimeout; // Variable to store the timeout ID
//#endregion
//#region Functions Declaration
// get random number not exist
const getRandomInt = (min, max) => {
    let result;
    let exist = true;
    min = Math.ceil(min);
    max = Math.floor(max);
    while (exist) {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!tempNumbers.find((no) => no === result.toString())) {
            exist = false;
            tempNumbers.push(result.toString());
        }
    }
    return result;
};
const toggleFlip = (index) => {
    const card = prepare.cards[index];
    if (!card.flip && card.clicked) {
        flip(card, index);
        selectCard(card, index);
    }
};
const flip = (card, index) => {
    prepare.flipAudio.play();
    if (card) {
        card.flip = card.flip === "" ? "flip" : "";
        document.getElementById(`card-flip-${index}`).classList.value = card.flip;
    }
};
const selectCard = (card, index) => {
    // The first card
    if (!prepare.selectedCard_1) {
        prepare.selectedCard_1 = card;
        prepare.selectedIndex_1 = index;
    }
    else if (!prepare.selectedCard_2) {
        prepare.selectedCard_2 = card;
        prepare.selectedIndex_2 = index;
    }
    if (prepare.selectedCard_1 && prepare.selectedCard_2) {
        if (prepare.selectedCard_1.src === prepare.selectedCard_2.src) {
            prepare.selectedCard_1.clicked = false;
            prepare.selectedCard_2.clicked = false;
            prepare.selectedCard_1 = null;
            prepare.selectedCard_2 = null;
            stopAudio(prepare.wrongAudio);
            stopAudio(prepare.correctAudio);
            prepare.correctAudio.play();
            changeProgress();
            checkEnd();
        }
        else {
            setTimeout(() => {
                stopAudio(prepare.wrongAudio);
                stopAudio(prepare.correctAudio);
                prepare.wrongAudio.play();
                flip(prepare.selectedCard_1, prepare.selectedIndex_1);
                flip(prepare.selectedCard_2, prepare.selectedIndex_2);
                prepare.selectedCard_1 = null;
                prepare.selectedCard_2 = null;
            }, 1000);
        }
    }
};
const changeProgress = () => {
    const progress = (prepare.cards.filter((card) => !card.clicked).length / numberOfCards) *
        100;
    const progressElement = document.getElementById("progress");
    progressElement.style.width = `${progress}%`;
    progressElement.innerText = `${progress}%`;
};
const checkEnd = () => {
    if (prepare.cards.filter((card) => !card.clicked).length === numberOfCards) {
        stopAudio(prepare.wrongAudio);
        stopAudio(prepare.correctAudio);
        prepare.completeAudio.play();
        clearTimeout(gameTimeout); // Clear the timeout if the game is completed
    }
};
const stopAudio = (audio) => {
    if (audio && audio.played) {
        audio.pause();
        audio.currentTime = 0;
    }
};
const startGameTimer = () => {
    gameTimeout = setTimeout(() => {
        prepare.gameOverAudio.play();
        alert("Game Over! Time Out.");
        prepare.cards.forEach((card, index) => {
            card.clicked = false; // Disable clicking on all cards
        });
    }, 3 * 60 * 1000); // 3 minutes 
};
//#endregion
//#region Game Logic
for (let index = 0; index < numberOfCards / 2; index++) {
    prepare.cards.push({
        id: getRandomInt(0, numberOfCards),
        src: `../assets/images/image_${index}.png`,
        flip: ``,
        clicked: true,
        index,
    });
    prepare.cards.push({
        id: getRandomInt(0, numberOfCards),
        src: `../assets/images/image_${index}.png`,
        flip: ``,
        clicked: true,
        index,
    });
}
prepare.cards.sort((a, b) => (a.id > b.id ? 1 : -1));
prepare.cards.forEach((item, index) => {
    cardsHtmlContent += `
    <span class = "col-sm-4 col-lg-3">
        <div onclick="toggleFlip(${index})" class="card-flip">
        <div id="card-flip-${index}">
        <div class="front">
        <div class = "card">
        <img class="card-image" src="../assets/cardsBack.png" alt="Loading...">
        </div>
        </div>
        <div class="back">
        <div class="card">
        <img src= "../assets/images/image_${item.index + 1}.png" alt = "Image"  style="height:120px;width:100%; display:block;">
        </div>
        </div>
        </div>
        </div>
    </span>
    `;
});
document.getElementById("cards").innerHTML = cardsHtmlContent;
// Start the game timer 
startGameTimer();
//#endregion
//  <span class = "card-content">${index + 1}</span>

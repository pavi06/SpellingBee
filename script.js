wordsList = {
    'ACHOO': 0, 'ARCH': 0, 'ARCHAIC': 0, 'ARHAT': 0, 'ARTHRITIC': 0, 'ATTACH': 0, 'CATARRH': 0, 'CATCH': 0, 'CATHARTIC': 0, 'CHAI': 0, 'CHAIR': 0,
    'CHAOTIC': 0, 'CHAR': 0, 'CHARIOT': 1, 'CHART': 0, 'CHAT': 0, 'CHIA': 0, 'CHIC': 0, 'CHICA': 0, 'CHICHI': 0, 'CHIT': 0, 'CHITCHAT': 0, 'CHOIR': 0, 'COACH': 0, 'COCHAIR': 0, 'COHO': 0, 'COHORT': 0,
    'CROTCH': 0, 'HAIR': 0, 'HARICOT': 1, 'HART': 0, 'HATCH': 0, 'HATH': 0, 'HATHA': 0, 'HITCH': 0, 'HOAR': 0, 'HOOCH': 0, 'HOORAH': 0, 'HOOT': 0, 'HORA': 0, 'HORCHATA': 0, 'HORROR': 0, 'ICHOR': 0,
    'ITCH': 0, 'OATH': 0, 'ORTHOTIC': 0, 'RHOTIC': 0, 'RICH': 0, 'ROACH': 0, 'TACH': 0, 'THAT': 0, 'THATCH': 0, 'THORACIC': 1, 'THROAT': 0, 'TOOTH': 0, 'TORAH': 0, 'TORCH': 0, 'TROTH': 0
}

charList = [['I', 'T', 'R', 'A', 'C', 'O', 'H'], ['I', 'T', 'R', 'C', 'O', 'A', 'H'], ['I', 'T', 'O', 'R', 'C', 'A', 'H']]
foundWords = []

let totalScore = 0;
var currentWord = "";
let wordsCount = 0;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('wordsCount').innerHTML = wordsCount;
    document.getElementById('word').innerHTML = " ";
    update(0, "Beginner")
    chooseRandomAndBuildContainer();
})

var chooseRandomAndBuildContainer = () => {
    document.getElementById('container').innerHTML = "";
    const randomIndex = Math.floor(Math.random() * charList.length);
    generateContainer(charList[randomIndex]);
}

var generateContainer = (charList) => {
    charList.forEach(char => {
        document.getElementById('container').innerHTML += `
        <div class="hexagon" onclick="letterPressed('${char}')" id="Key${char}">
            <p class="letter">${char}</p>
        </div>`;
    });
}

var setTooltipContent = (content) => {
    tooltip.textContent = content;
    tooltip.classList.add('active');

    setTimeout(function () {
        tooltip.classList.remove('active');
    }, 800);
}

var update = (currScoreDiv, phrase) => {
    document.querySelector(`[data-score="${currScoreDiv}"]`).classList.add('active');
    document.getElementById(`s${currScoreDiv}`).innerHTML = totalScore;
    document.getElementById(`s${currScoreDiv}`).classList.add('active');
    document.getElementById('phrase').innerHTML = `${phrase}`;
}

var updateTimeline = (prevScoreDiv, currScoreDiv, phrase) => {
    document.getElementById(`s${prevScoreDiv}`).classList.remove('active');
    update(currScoreDiv, phrase);
}

var checkScoreAndUpdate = (totalScore) => {
    switch (true) {
        case totalScore >= 0 && totalScore < 6:
            update(0, "Beginner");
            break;
        case totalScore >= 6 && totalScore < 14:
            updateTimeline(0, 6, "Good Start")
            break;
        case totalScore >= 14 && totalScore < 22:
            updateTimeline(6, 14, "Moving Up")
            break;
        case totalScore >= 22 && totalScore < 41:
            updateTimeline(14, 22, "Good")
            break;
        case totalScore >= 41 && totalScore < 69:
            updateTimeline(22, 41, "Solid")
            break;
        case totalScore >= 69 && totalScore < 110:
            updateTimeline(41, 69, "Nice")
            break;
        case totalScore >= 110 && totalScore < 138:
            updateTimeline(69, 110, "Great")
            break;
        case totalScore >= 138 && totalScore < 193:
            updateTimeline(110, 138, "Amazing")
            break;
        case totalScore === 193:
            updateTimeline(138, 193, "Genius")
            break;
        default:
            update(0, "Beginner");
    }
}

var addPoints = (word) => {
    if (foundWords.includes(word)) {
        setTooltipContent("Already found!")        
        setTimeout(() => {
            currentWord = "";
            document.getElementById('word').innerHTML = "";
        }, 400);
        return;
    }
    if (!word) {
        setTooltipContent("Invalid word");
        return;
    }
    if (wordsList.hasOwnProperty(word)) {
        if (word.length > 4) {
            totalScore += word.length;
            if (wordsList[word]) {
                totalScore += wordsList[word] * 7;
                setTooltipContent(`Awesome, +${word.length + wordsList[word] * 7} points`);
                wordsCount += 1;
                checkScoreAndUpdate(totalScore);
                foundWords.push(word)
            }
            else {
                setTooltipContent(`great, +${word.length}points`);
                wordsCount += 1;
                checkScoreAndUpdate(totalScore)
                foundWords.push(word)
            }
            document.getElementById('wordsList').innerHTML += `<div style="border-bottom: 1px solid grey;width: 30%;margin-bottom:10px;">${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}</div>`;
            document.getElementById('wordsCount').innerHTML = wordsCount;
        }
        else {
            totalScore += 1;
            wordsCount += 1;
            setTooltipContent("good, +1 points");
            document.getElementById('wordsList').innerHTML += `<div style="border-bottom: 1px solid grey;width: 30%;margin-bottom:10px;">${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}</div>`;
            document.getElementById('wordsCount').innerHTML = wordsCount;
            checkScoreAndUpdate(totalScore)
            foundWords.push(word)
        }
    } else if (word.length === 4) {
        if (!word.includes('H')) {
            setTooltipContent("Missing Center Letter!")
        }
        else {
            setTooltipContent("Not in word list!");
        }
    }
    else {
        setTooltipContent("Too short!");
    }
    currentWord = "";
    document.getElementById('word').innerHTML = "";
}

var letterPressed = (char) => {
    document.getElementById(`Key${char}`).classList.add('scale');
    setTimeout(() => {
        document.getElementById(`Key${char}`).classList.remove('scale');
    }, 100);
    if (char === 'H') {
        document.getElementById('word').innerHTML += `<span style="color: rgb(237, 237, 40);">${char}</span>`;
    }
    else {
        document.getElementById('word').innerHTML += char;
    }
    currentWord += char;
}

var DeleteLetter = () => {
    currentWord = currentWord.slice(0, -1);
    document.getElementById('word').innerHTML = currentWord;
}

var processInput = () => {
    addPoints(currentWord)
}
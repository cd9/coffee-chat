const SAMPLE_NAMES = "First0 Last\nFirst1 Last\nFirst2 Last\nFirst3 Last\nFirst4 Last\nFirst5 Last";
const SAMPLE_PAIRS = "Week1,,Week2,\nAlice Alice,Bob Bob,Alice Alice,Bob Bob\nAlice Alice,Bob Bob,Alice Alice,Bob Bob";
const DELIMITER = ",";

window.onload = function() {
    const namesBox = document.getElementById('names');
    namesBox.value = SAMPLE_NAMES;
    const pairsBox = document.getElementById('history');
    pairsBox.value = SAMPLE_PAIRS;
}

function getSortedPair(name1, name2) {
    var names = [name1, name2]
    names.sort()
    return names[0] + DELIMITER + names[1]
}

function onButtonClick() {
    const namesElement = document.getElementById('names');
    const namesList = namesElement.value.split("\n");
    const uniqueNames = [...new Set(namesList)];

    const uniquePairs = [];
    for (var i = 0; i < uniqueNames.length; i++) {
        for (var j = i + 1; j < uniqueNames.length; j++) {
            uniquePairs.push(getSortedPair(uniqueNames[i], uniqueNames[j]));
        }
    }

    const historyElement = document.getElementById('history');
    const historyLines = historyElement.value.split("\n");
    const formattedLines = [];
    for (var i = 0; i < historyLines.length; i++) {
        formattedLines.push(historyLines[i].split(','));
    }

    const usedPairs = [];
    const weeks = formattedLines[0].length / 2;
    for (var i = 1; i < formattedLines.length; i++) {
        for (var j = 0; j < weeks * 2; j += 2) {
            usedPairs.push(getSortedPair(formattedLines[i][j], formattedLines[i][j + 1]));
        }
    }

    const usedPairsSet = new Set(usedPairs);
    var filteredPairs = new Set(uniquePairs.filter(x => !usedPairsSet.has(x)));
    const selectedPairs = []
    for (var i = 0; i < uniqueNames.length / 2; i++) {
        const randomPair = [...filteredPairs][Math.floor(Math.random() * filteredPairs.size)];
        people = randomPair.split(DELIMITER)
        filteredPairs = new Set([...filteredPairs].filter(x => !(x.includes(people[0]) || x.includes(people[1]))))
        selectedPairs.push(randomPair);
    }

    const outputBox = document.getElementById('output');
    output.value = selectedPairs.join('\n')
}

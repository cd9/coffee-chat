const SAMPLE_NAMES = "First0 Last\nFirst1 Last\nFirst2 Last\nFirst3 Last\nFirst4 Last\nFirst5 Last";
const SAMPLE_PAIRS = "Week1,,Week2,\nAlice Alice,Bob Bob,Alice Alice,Bob Bob\nAlice Alice,Bob Bob,Alice Alice,Bob Bob";
const DELIMITER = ",";

window.onload = function() {
    const namesBox = document.getElementById('names');
    namesBox.value = SAMPLE_NAMES;
    const pairsBox = document.getElementById('history');
    pairsBox.value = SAMPLE_PAIRS;
}

/** Sorts a pair */
function getSortedPair(name1, name2) {
    var names = [name1, name2]
    names.sort()
    return names[0] + DELIMITER + names[1]
}

/** Picks a random element from a set*/
function pickRandom(set) {
    return [...set][Math.floor(Math.random() * set.size)];
}

/** Filters a set to not include any individual elements of a pair*/
function filterSet(set, pair) {
    individuals = pair.split(DELIMITER)
    return new Set([...set]
        .filter(x => !(
            x.includes(individuals[0]) ||
            x.includes(individuals[1]))))
}

function onButtonClick() {

    /** Get all unique names */
    const namesElement = document.getElementById('names');
    const namesList = namesElement.value.split("\n");
    var extraName = ""
    if (namesList.length % 2 !== 0) {
        extraName = namesList.pop()
    }
    var uniqueNames = [...new Set(namesList)];

    /** Generate unique pairs */
    const uniquePairs = [];
    for (let i = 0; i < uniqueNames.length; i++) {
        for (let j = i + 1; j < uniqueNames.length; j++) {
            uniquePairs.push(getSortedPair(uniqueNames[i], uniqueNames[j]));
        }
    }

    /** Convert CSV into 2D array */
    const historyElement = document.getElementById('history');
    const rawRows = historyElement.value.split("\n");
    const rows = [];
    for (let i = 0; i < rawRows.length; i++) {
        rows.push(rawRows[i].split(','));
    }

    /** Get a list of banned pairs */
    const bannedPairs = new Set();
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[0].length; j += 2) {
            const sortedPair = getSortedPair(rows[i][j], rows[i][j + 1])
            bannedPairs.add(sortedPair);
        }
    }

    /** 
     * 1. Pick a random pair
     * 2. Re-filter set of pairs
     * 3. Repeat
     */
    let filteredPairs = new Set(uniquePairs.filter(x => !bannedPairs.has(x)));
    let selectedPairs = []
    for (let i = 0; i < uniqueNames.length / 2; i++) {
        const randomPair = pickRandom(filteredPairs)
        filteredPairs = filterSet(filteredPairs, randomPair)
        selectedPairs.push(randomPair);
    }
    if (extraName !== "") {
        selectedPairs[0] += " and " + extraName
    }

    /** Print output */
    const outputBox = document.getElementById('output');
    output.value = selectedPairs.join('\n')
}

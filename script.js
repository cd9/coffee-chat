const SAMPLE_NAMES = "Name1\nName2\nName3\nName4\nName5\nName6\nName7\nName8\nName9\nName10";
const SAMPLE_PAIRS = "Name1,Name2,Name3,Name4\nName5,Name6,Name7,Name8";

window.onload = function() {
    const namesBox = document.getElementById('names');
    namesBox.value = SAMPLE_NAMES;
    const pairsBox = document.getElementById('history');
    pairsBox.value = SAMPLE_PAIRS;
}

/** Picks a random element from a set*/
function pickRandom(set) {
    return [...set][Math.floor(Math.random() * set.size)];
}

function onButtonClick() {

    /** Get all unique names */
    const namesElement = document.getElementById('names');
    const namesList = namesElement.value.split("\n");
    if (namesList.length % 2 !== 0) {
        namesList.push(null)
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
            const pair = [rows[i][j], rows[i][j + 1]]
            pair.sort()
            bannedPairs.add(pair + "");
        }
    }
    console.log(bannedPairs);

    /** Round-robin tournament algorithm */
    const numNames = namesList.length;
    const numRounds = numNames - 1;
    const half = numNames / 2;

    const allMeetings = [];
    const nameIndexes = namesList.map((_, i) => i).slice(1);

    for (let round = 0; round < numRounds; round++) {
        const meetings = [];
        const newNameIndexes = [0].concat(nameIndexes);
        const firstHalf = newNameIndexes.slice(0, half);
        const secondHalf = newNameIndexes.slice(half, numNames).reverse();
        for (let i = 0; i < firstHalf.length; i++) {
            meeting = [namesList[firstHalf[i]], namesList[secondHalf[i]]]
            meeting.sort()
            if (bannedPairs.has(meeting + "")) {
                continue;
            }
            meetings.push(meeting);
        }
        nameIndexes.push(nameIndexes.shift());
        allMeetings.push(meetings);
    }

    /** Print output */
    let csv = ""
    for (let i = 0; i < allMeetings[0].length; i++) {
        for (let j = 0; j < allMeetings.length; j++) {
            if (i >= allMeetings[j].length) {
                csv += ",,";
                continue;
            }
            csv += allMeetings[j][i] + "";
            if (j < allMeetings.length - 1) {
                csv += ",";
            }
        }
        csv += "\n";
    }
    console.log(csv);
    const outputBox = document.getElementById('output');
    outputBox.value = csv;
}

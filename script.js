const data = {
    "a": "1",
    "b": "2",
    '<audio controls=""><source src="horse.ogm"></audio>': "bb"
    // Add more key-value pairs as needed
};

const leftColumn = document.getElementById('left-column');
const rightColumn = document.getElementById('right-column');

let selectedKey = null;
let selectedValue = null;
let matchedPairs = 0; // When this number matches the number of keys in 'data', the game ends

// Function to create buttons based on the data object
function createButtons() {
    for (const key in data) {
        const keyButton = document.createElement('button');
        keyButton.innerHTML = key;
        keyButton.classList.add('key-button');
        keyButton.addEventListener('click', () => selectKey(key));
        leftColumn.appendChild(keyButton);

        const valueButton = document.createElement('button');
        valueButton.innerHTML = data[key];
        valueButton.classList.add('value-button');
        valueButton.addEventListener('click', () => selectValue(data[key]));
        rightColumn.appendChild(valueButton);
    }
    shuffleChildElements(rightColumn);
    shuffleChildElements(leftColumn);
}

// Function to select a key
function selectKey(key) {
    if (selectedKey === key) { // Deselect the key if it's already selected
        selectedKey = null;
    } else {
        selectedKey = key;
    }

    findMatch();
}

// Function to select a value
function selectValue(value) {
    if (selectedValue === value) { // Deselect the value if it's already selected
        selectedValue = null;
    } else {
        selectedValue = value;
    }

    findMatch();
}

function findMatch() {
    // Check if the selected key and value match
    if (selectedKey === null || selectedValue === null) { return; }

    if (data[selectedKey] === selectedValue) {
        alert("Success!");
        matchedPairs++;
        if (matchedPairs === Object.keys(data).length) { // When all the matches have made correctly
            alert("You win!");
        }

        // Disable the matched key and value buttons
        const selectedKeyButton = getElementByinnerHTML('key-button', selectedKey);
        selectedKeyButton.disabled = true;
        disableAuidoInElement(selectedKeyButton);

        const selectedValueButton = getElementByinnerHTML('value-button', selectedValue);
        selectedValueButton.disabled = true;
        disableAuidoInElement(selectedValueButton);

    } else { // If they do not match
        alert("Wrong!");
    }

    // Clear selections
    selectedKey = null;
    selectedValue = null;
}

/**
 * UTILITY FUNCTIONS
 */
function getElementByinnerHTML(className, text) {
  const elements = document.getElementsByClassName(className);
  
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].innerHTML.toString() === text) {
      return elements[i];
    }
  }
  // If there are no matching elements
  return null;
}

function shuffleArray(array) { // Uses the Fisher-Yates Method
    for (let i = 0; i < array.length - 1; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleChildElements(parentElement) {
    const childrenArray = [...parentElement.children];
    shuffleArray(childrenArray);

    parentElement.innerHTML = '';
    childrenArray.forEach(child => {
        parentElement.appendChild(child);
    });
}

function disableAuidoInElement(parentElement) {
    const childrenArray = [...parentElement.children];
    childrenArray.forEach(child => {
        child.src = '';
        child.classList.add('disabled');
    });
}

// Initialize the game
createButtons();
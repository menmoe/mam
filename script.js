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
let matchedPairs = 0;

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
    shuffleElements(rightColumn);
    shuffleElements(leftColumn);
}

// Function to select a key
function selectKey(key) {
    if (selectedKey === key) {
        // Deselect the key if it's already selected
        selectedKey = null;
    } else {
        selectedKey = key;
    }

    findMatch();
}

// Function to select a value
function selectValue(value) {
    if (selectedValue === value) {
        // Deselect the value if it's already selected
        selectedValue = null;
    } else {
        selectedValue = value;
    }

    findMatch();
}

function findMatch() {
    // Check if the selected key and value match
    if (selectedKey === null || selectedValue === null) { 
        return; 
    }
    if (data[selectedKey] === selectedValue) {
        alert("Success!");
        matchedPairs++;
        if (matchedPairs === Object.keys(data).length) {
            alert("You win!");
        }

        // Disable the matched key and value buttons
        const selectedKeyButton = findMatchingElement('key-button', selectedKey);
        disableElementAndAudio(selectedKeyButton);

        const selectedValueButton = findMatchingElement('value-button', selectedValue);
        disableElementAndAudio(selectedValueButton);

    } else {
        alert("Wrong!");
    }
    // Clear selections
    selectedKey = null;
    selectedValue = null;
}

function findMatchingElement(className, text) {
  const elements = document.getElementsByClassName(className);
  
  for (let i = 0; i < elements.length; i++) {
    console.log(text);
    console.log(elements[i]);
    if (elements[i].innerHTML.toString() === text) {
        console.log("match found");
      return elements[i];
    }
    console.log("not a match")
  }

  // If no matching element is found, return null
  return null;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleElements(parentElement) {
    const childrenArray = [...parentElement.children];
    shuffleArray(childrenArray);

    parentElement.innerHTML = '';
    childrenArray.forEach(child => {
        parentElement.appendChild(child);
    });
}

function disableElementAndAudio(parent) {
    parent.disabled = true;
        if (parent.children[0]) {
            parent.children[0].src = '';
            parent.children[0].classList.add('disabled');
        }
}

// Initialize the game
createButtons();
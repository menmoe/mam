const data = {
    "a": "1",
    "b": "2",
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
        keyButton.innerText = key;
        keyButton.classList.add('key-button');
        keyButton.addEventListener('click', () => selectKey(key));
        leftColumn.appendChild(keyButton);

        const valueButton = document.createElement('button');
        valueButton.innerText = data[key];
        valueButton.classList.add('value-button');
        valueButton.addEventListener('click', () => selectValue(data[key]));
        rightColumn.appendChild(valueButton);
    }
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
        findMatchingElement('key-button', selectedKey).disabled = true; 
        findMatchingElement('value-button', selectedValue).disabled = true; 
        
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
    if (elements[i].innerText === text) {
      return elements[i];
    }
  }

  // If no matching element is found, return null
  return null;
}

// Initialize the game
createButtons();
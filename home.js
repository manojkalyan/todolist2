// Load stored list items on page load
window.addEventListener("load", function() {
  var storedListItems = JSON.parse(localStorage.getItem("listItems")) || [];
  var displayList = document.getElementById("displayList");

  // Iterate through stored list items and create corresponding list items on the page
  storedListItems.forEach(function(item) {
    createListItem(item.text, item.checked);
  });
});

function displayInput() {
  var userInput = document.getElementById("userInput").value;

  // Check if user input is empty
  if (userInput.trim() === "") {
    return; // Don't add empty input
  }

  // Create a new list item based on user input
  createListItem(userInput, false);

  var storedListItems = JSON.parse(localStorage.getItem("listItems")) || [];
  storedListItems.push({ text: userInput, checked: false });
  localStorage.setItem("listItems", JSON.stringify(storedListItems));

  // Clear the input box
  document.getElementById("userInput").value = "";
}

function createListItem(itemText, isChecked) {
  var displayList = document.getElementById("displayList");

  var listItem = document.createElement("li");

  var itemContainer = document.createElement("div");
  itemContainer.classList.add("listItem");

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;

  // Event listener to update the checked state in local storage when checkbox is changed
  checkbox.addEventListener("change", function() {
    var storedListItems = JSON.parse(localStorage.getItem("listItems")) || [];
    var index = storedListItems.findIndex(function(item) {
      return item.text === itemText;
    });
    if (index !== -1) {
      storedListItems[index].checked = checkbox.checked;
      localStorage.setItem("listItems", JSON.stringify(storedListItems));

      // Apply line-through text decoration if checkbox is checked, remove it otherwise
      if (checkbox.checked) {
        label.style.textDecoration = "line-through";
      } else {
        label.style.textDecoration = "none";
      }
    }
  });

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Event listener to remove the list item from the page and local storage when delete button is clicked
  deleteButton.addEventListener("click", function() {
    displayList.removeChild(listItem);

    var storedListItems = JSON.parse(localStorage.getItem("listItems")) || [];
    var index = storedListItems.findIndex(function(item) {
      return item.text === itemText;
    });
    if (index !== -1) {
      storedListItems.splice(index, 1);
      localStorage.setItem("listItems", JSON.stringify(storedListItems));
    }
  });

  var label = document.createElement("label");
  label.textContent = itemText;

  itemContainer.appendChild(checkbox);
  itemContainer.appendChild(label);
  itemContainer.appendChild(deleteButton);

  listItem.appendChild(itemContainer);
  displayList.appendChild(listItem);
}

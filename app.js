// Initialize empty arrays to store leads
let myLeads = [];
let oldLeads = [];

// Get DOM elements
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const unorderListEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Retrieve leads from localStorage if available
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads); // Render leads if available in localStorage
}

// Event listener for clicking on tabBtn (presumably to add current tab URL)
tabBtn.addEventListener("click", function () {
  // Query active tab in Chrome
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    // Push URL of active tab to myLeads array
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Update localStorage
    render(myLeads); // Render updated leads
  });
});

// Function to render leads on the screen dynamically
function render(leads) {
  let listItems = ""; // Initialize an empty string to store list items
  // Loop through leads array and generate list items
  for (let i = 0; i < leads.length; i++) {
    // Create list item with URL
    listItems += `<li> <a target='_blank' href='${leads[i]}'> ${leads[i]} </a> </li>`;
  }
  unorderListEl.innerHTML = listItems; // Update unordered list element with generated list items
}

// Event listener for double-clicking deleteBtn to remove the last lead
deleteBtn.addEventListener("dblclick", function () {
  if (myLeads.length > 0) {
    myLeads.pop(); // Remove the last URL from the myLeads array
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Update localStorage
    render(myLeads); // Render updated leads
  }
});

// Event listener for clicking inputBtn to add input value to myLeads
inputBtn.addEventListener("click", () => {
  myLeads.push(inputEl.value); // Push input value to myLeads array
  inputEl.value = ""; // Clear input field
  localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Update localStorage
  render(myLeads); // Render updated leads
});

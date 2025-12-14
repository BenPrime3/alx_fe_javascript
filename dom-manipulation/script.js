const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    {
      text: "Simplicity is the ultimate sophistication.",
      category: "design"
    },
    {
      text: "Code is poetry.",
      category: "programming"
    },
    {
      text: "Discipline beats motivation.",
      category: "life"
    }
  ];


const quoteDisplay = document.getElementById("quoteDisplay");
const quoteButton = document.getElementById("newQuote");

function showRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];

  quoteDisplay.innerHTML = quote.text;
}

quoteButton.addEventListener("click", showRandomQuote);


function createAddQuoteForm() {
  const lineBreak = document.createElement("br")
  const formDiv = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", addQuote);

  formDiv.appendChild(lineBreak);
  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}


function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text === "" || category === "") return;

  quotes.push({ text, category });
  document.getElementById("newQuoteText").value = '';
  document.getElementById("newQuoteCategory").value = '';

  saveQuotes()  
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes))
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {

    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');

  };
  fileReader.readAsText(event.target.files[0]);
}

function exportToJsonFile() {
  
  const jsonString = JSON.stringify(quotes, null, 2);


  const blob = new Blob([jsonString], {
    type: "application/json"
  });


  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";

  link.click();

  URL.revokeObjectURL(url);
}

document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);




showRandomQuote();
createAddQuoteForm();


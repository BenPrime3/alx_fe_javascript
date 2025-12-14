const quotes = [
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

  showRandomQuote();
}

showRandomQuote();
createAddQuoteForm();


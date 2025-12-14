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
const API_URL = "https://jsonplaceholder.typicode.com/posts";

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

  if (!text || !category) return;

  quotes.push({ text, category });

  populateCategories();
  filterQuotes();

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

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(quote => quote.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categoryFilter.value = savedFilter;
  }
}

function displayQuotes(quotesToDisplay) {
  quoteDisplay.innerHTML = "";

  quotesToDisplay.forEach(quote => {
    const p = document.createElement("p");
    p.innerHTML = quote.text;
    quoteDisplay.appendChild(p);
  });
}


function filterQuotes() {
  const selectedCategory = categoryFilter.value;

  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(
      quote => quote.category === selectedCategory
    );
  }

  displayQuotes(filteredQuotes);
}

function fetchQuotesFromServer() {
  return fetch(API_URL)
    .then(res => res.json())
    .then(data =>
      data.slice(0, 5).map(item => ({
        id: `server-${item.id}`,
        text: item.title,
        category: "server"
      }))
    );
}

function postQuoteToServer(quote) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(quote)
  });
}

function syncQuotes() {
  fetchQuotesFromServer().then(serverQuotes => {
    let conflicts = 0;

    serverQuotes.forEach(serverQuote => {
      const index = quotes.findIndex(q => q.id === serverQuote.id);

      if (index === -1) {
        quotes.push(serverQuote);
      } else {
        quotes[index] = serverQuote;
        conflicts++;
      }
    });

    saveQuotes();
    populateCategories();
    filterQuotes();

    syncStatus.textContent = conflicts ? "Conflicts resolved using server data." : "Quotes synced successfully.";

    setTimeout(() => (syncStatus.textContent = ""), 4000);
  });
}

categoryFilter.addEventListener("change", filterQuotes);


populateCategories();
createAddQuoteForm();
syncQuotes();
setInterval(syncQuotes, 15000);


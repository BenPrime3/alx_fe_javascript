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

const quoteDisplay = document.getElementById('quoteDisplay');
const quoteButton = document.getElementById('newQuote');


function displayRandomQuote() {
  
  const index = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[index].text

}

quoteButton.addEventListener('click', displayRandomQuote)


function AddQuoteForm() {
  
}
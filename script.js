const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book-btn");
const undoBookBtn = document.querySelector(".undo-book-btn");
const newBookForm = document.querySelector(".new-book-form");
const bookSubmitBtn = document.querySelector("#bookSubmit");
let myLibrary = [];

function Book(title, author, pages, read, color) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.color = color;
}

Book.prototype.sayTitle = function () {
  console.log(this.title);
};

function addBookToLibrary(title, author, pages, read, color) {
  myLibrary.push(new Book(title, author, pages, read, color));
  render();
}

function render() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.textContent = `${book.title}`;
    card.setAttribute("style", `background-color: ${book.color}`);
    container.appendChild(card);
  });
}

newBookBtn.addEventListener("click", function () {
  newBookForm.style.display = "block";
  undoBookBtn.style.display = "block";
  newBookBtn.style.display = "none";
});

undoBookBtn.addEventListener("click", function () {
  newBookForm.style.display = "none";
  undoBookBtn.style.display = "none";
  newBookBtn.style.display = "block";
});

function handleForm(event) {
  event.preventDefault();
}

newBookForm.addEventListener("submit", handleForm);

bookSubmitBtn.addEventListener("click", function () {
  let titleValue = document.querySelector("#titleInput").value;
  let authorValue = document.querySelector("#authorInput").value;
  let pagesValue = document.querySelector("#pagesInput").value;
  let readValue = document.querySelector("#readInput").value;
  let colorValue = document.querySelector("#colorInput").value;
  if (
    titleValue == "" ||
    authorValue == "" ||
    pagesValue == "" ||
    readValue == "" ||
    colorValue == ""
  ) {
    alert("All fields of form must be filled out");
  } else {
    addBookToLibrary(
      titleValue,
      authorValue,
      pagesValue,
      readValue,
      colorValue
    );
    newBookForm.style.display = "none";
    undoBookBtn.style.display = "none";
    newBookBtn.style.display = "block";
    titleValue = "";
    authorValue = "";
    pagesValue = "";
    readInputValue = "";
    colorValue = "";
    console.log(myLibrary);
  }
});

addBookToLibrary(
  "Heart of Darkness",
  "Joseph Conrad",
  "91",
  "I have read",
  "teal"
);

render();

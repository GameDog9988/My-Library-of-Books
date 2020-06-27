const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book-btn");
const undoBookBtn = document.querySelector(".undo-book-btn");
const newBookForm = document.querySelector(".new-book-form");
const bookSubmitBtn = document.querySelector("#bookSubmit");
const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const readInput = document.querySelector("#readInput");
const colorInput = document.querySelector("#colorInput");
let myLibrary = [];

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

bookSubmitBtn.addEventListener("click", function () {
  if (
    titleInput.value == "" ||
    authorInput.value == "" ||
    pagesInput.value == "" ||
    readInput.value == "" ||
    colorInput.value == ""
  ) {
    alert("All fields of form must be filled out");
    return false;
  } else {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.value,
      colorInput.value
    );
    newBookForm.style.display = "none";
    undoBookBtn.style.display = "none";
    newBookBtn.style.display = "block";
  }
});

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
  myLibrary.forEach((element) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.textContent = `${element.title}`;
    card.setAttribute("style", `background-color: ${element.color}`);
    container.appendChild(card);
  });
}

addBookToLibrary(
  "Heart of Darkness",
  "Joseph Conrad",
  "91 pages",
  "I have read",
  "teal"
);

render();

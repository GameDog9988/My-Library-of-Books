const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book-btn");
const undoBookBtn = document.querySelector(".undo-book-btn");
const newBookForm = document.querySelector(".new-book-form");
const bookSubmitBtn = document.querySelector("#bookSubmit");
const bookCards = document.querySelectorAll(".card");
let myLibrary = [];

class Book {
  constructor(title, author, pages, read, color) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = color;
  }

  sayTitle() {
    console.log(`Title: ${this.title}`);
  }
}

function addBookToLibrary(title, author, pages, read, color) {
  let book = new Book(title, author, pages, read, color);
  myLibrary.push(book);
  render();
}

if (localStorage.getItem("loadedBefore") === null) {
  localStorage.setItem("books", JSON.stringify(myLibrary));
  firstLoad();
  localStorage.setItem("loadedBefore", true);
}

if (localStorage.getItem("books") !== null)
  myLibrary = JSON.parse(localStorage.getItem("books"));
else localStorage.setItem("books", JSON.stringify(myLibrary));

function render() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
  container.innerHTML = "";
  myLibrary.forEach((book, index) => {
    let card = document.createElement("div");
    let removeBtn = document.createElement("button");
    let readLabel = document.createElement("label");
    let readCheckbox = document.createElement("input");
    card.setAttribute("class", "card");
    card.id = index;
    removeBtn.setAttribute("class", "remove-btn");
    readLabel.setAttribute("class", "read-label");
    readLabel.setAttribute("for", "readCheckbox");
    readCheckbox.setAttribute("class", "read-checkbox");
    readCheckbox.setAttribute("type", "checkbox");
    readCheckbox.checked = book.read;
    readCheckbox.addEventListener("click", function () {
      if (readCheckbox.checked) {
        this.read = true;
        console.log(`${book.index} position book checked`);
        console.log(`${book.read}`);
        localStorage.setItem("books", JSON.stringify(myLibrary));
      } else {
        this.read = false;
        console.log(`${book.index} position book unchecked`);
        console.log(`${book.read}`);
        localStorage.setItem("books", JSON.stringify(myLibrary));
      }
    });
    card.textContent = `${book.title}`;
    readLabel.textContent = "Read:";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      myLibrary.splice(index, 1);
      render();
    });
    card.setAttribute("style", `background-color: ${book.color}`);
    container.appendChild(card);
    card.appendChild(removeBtn);
    card.appendChild(readLabel);
    card.appendChild(readCheckbox);
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
  let title = document.querySelector("#titleInput");
  let author = document.querySelector("#authorInput");
  let pages = document.querySelector("#pagesInput");
  let read = document.querySelector("#readInput");
  let color = document.querySelector("#colorInput");
  if (
    title.value == "" ||
    author.value == "" ||
    pages.value == "" ||
    color.value == ""
  ) {
    alert("All fields of form must be filled out");
  } else if (
    !title.validity.valid ||
    !author.validity.valid ||
    !pages.validity.valid ||
    !read.validity.valid ||
    !color.validity.valid
  ) {
    alert("One of your form inputs is not valid");
  } else {
    addBookToLibrary(
      title.value,
      author.value,
      pages.value,
      read.checked,
      color.value
    );
    newBookForm.style.display = "none";
    undoBookBtn.style.display = "none";
    newBookBtn.style.display = "block";
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = "";
    color.value = "";
    console.log(myLibrary);
  }
});

render();

function firstLoad() {
  addBookToLibrary("Heart of Darkness", "Joseph Conrad", "91", "true", "teal");
  addBookToLibrary("World War Z", "Max Brooks", "342", "true", "orange");
  addBookToLibrary("Hamlet", "William Shakespeare", "166", "true", "crimson");
  addBookToLibrary(
    "Do Androids Dream of Electric Sheep",
    "Philip K. Dick",
    "210",
    "true",
    "mediumslateblue"
  );
}

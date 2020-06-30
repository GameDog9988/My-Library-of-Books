const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book-btn");
const undoBookBtn = document.querySelector(".undo-book-btn");
const newBookForm = document.querySelector(".new-book-form");
const bookSubmitBtn = document.querySelector("#bookSubmit");
const bookCards = document.querySelectorAll(".card");
let myLibrary = [];

function Book(title, author, pages, read, color) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.color = color;
  this.index = myLibrary.length;
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
    let removeBtn = document.createElement("button");
    let readLabel = document.createElement("label");
    let readCheckbox = document.createElement("input");
    card.setAttribute("class", "card");
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
      } else {
        this.read = false;
        console.log(`${book.index} position book unchecked`);
        console.log(`${book.read}`);
      }
    });
    card.textContent = `${book.title}`;
    readLabel.textContent = "Read:";
    removeBtn.textContent = "Remove";
    removeBtn.value = `${book.index}`;
    removeBtn.addEventListener("click", function () {
      myLibrary.splice(this.value, 1);
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
  let titleValue = document.querySelector("#titleInput").value;
  let authorValue = document.querySelector("#authorInput").value;
  let pagesValue = document.querySelector("#pagesInput").value;
  let readValue = document.querySelector("#readInput").checked;
  let colorValue = document.querySelector("#colorInput").value;
  if (
    titleValue == "" ||
    authorValue == "" ||
    pagesValue == "" ||
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

render();

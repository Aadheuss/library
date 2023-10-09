const title = document.querySelector(".title input");
const author = document.querySelector(".author input");
const pages = document.querySelector(".pages input");
const popUp = document.querySelector("form");
const container = document.querySelector(".container");

let myLibrary = [];

//Object book constructor
class Book {
  constructor(title, author, pages, mark) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.mark = mark;
  }
}

//Create a function to toggle Book.mark
Book.prototype.toggle = function () {
  this.mark = this.mark ? false : true;
};

//Toggle Book.mark info
function toggleMark() {
  this.parentElement.classList.toggle("read");
  const index = Number(this.parentElement.getAttribute("data-index"));
  const currentBook = myLibrary[index];

  if (this.textContent === "read") {
    this.textContent = "not read";
  } else {
    this.textContent = "read";
  }

  currentBook.toggle();
}

//Create instances of Book and add to an Array
const bookOne = new Book("Eloquent Javascript", "Marijn Haverbeke", 274, false);
const bookTwo = new Book("Naruto Vol. 72", "Masashi Kishimoto", 208, true);
myLibrary.push(bookOne);
myLibrary.push(bookTwo);

function addBookToLibrary() {
  myLibrary.forEach((book) => addBook(book));
}

//Create html elements for each book
function addBook(obj) {
  const bookNumber = myLibrary.indexOf(obj);
  const book = document.querySelector(`[data-index='${bookNumber}']`);
  //if the book index doesn't exist add book html elements and use the book array index for the data-index attribute
  if (book === null) {
    const book = document.createElement("div");
    book.classList.add("book");
    book.setAttribute("data-index", `${bookNumber}`);
    container.appendChild(book);

    const dltBookBtn = document.createElement("button");
    book.appendChild(dltBookBtn);

    const bookTitle = document.createElement("div");
    bookTitle.textContent = `${obj.title}`;
    book.appendChild(bookTitle);

    const bookAuthor = document.createElement("div");
    bookAuthor.textContent = `Author : ${obj.author}.`;
    book.appendChild(bookAuthor);

    const bookPages = document.createElement("div");
    bookPages.textContent = `pages : ${obj.pages}.`;
    book.appendChild(bookPages);
    //Create info for book to show if the book has been read or not
    const bookMark = document.createElement("div");
    bookMark.textContent = obj.mark ? "read" : "not read";
    book.appendChild(bookMark);

    addReadClass(bookMark);
  }
}

addBookToLibrary();

container.addEventListener("click", checkCurrent);

function checkCurrent() {
  //Add event listener to toggle the book mark info
  const markButton = document.querySelectorAll(".book > div:last-child");
  markButton.forEach((button) => button.addEventListener("click", toggleMark));

  //Add event listener to delete the book
  const removeButton = document.querySelectorAll(".book > button");
  removeButton.forEach((button) =>
    button.addEventListener("click", deleteBook)
  );
}

checkCurrent();

//Add class to style book
function addReadClass(bookMark) {
  if (bookMark.textContent === "read") {
    bookMark.parentElement.classList.add("read");
  } else {
    bookMark.parentElement.classList.remove("read");
  }
}

function deleteBook() {
  const index = Number(this.parentElement.getAttribute("data-index"));
  const books = document.querySelectorAll(`[data-index]`);
  books.forEach((book) => changeData(book));

  function changeData(book) {
    const secondIndex = Number(book.getAttribute("data-index"));
    if (secondIndex > index) {
      const index = secondIndex - 1;
      book.setAttribute("data-index", index);
    }
  }

  myLibrary.splice(Number(index), 1);
  this.parentElement.remove();
}

//Hide label on all input elements
const bookFormInput = document.querySelectorAll("form > div > input");
bookFormInput.forEach((input) => input.addEventListener("input", hideLabel));

function hideLabel() {
  const label = this.previousElementSibling;

  if (this.value.length >= 1) {
    label.classList.add("hidden");
  } else {
    label.classList.remove("hidden");
  }
}

function refreshValue(input) {
  if (input.value.length > 0) {
    input.value = "";
    //Show the label
    input.previousElementSibling.classList.remove("hidden");
  }
}

//Use dialog html element for modal
const bookModalForm = document.querySelector("dialog.form-container");
const bookFormShowBtn = document.querySelector(".add");

//Show the book dialog opens the <dialog> modally and refresh all the inputs value
bookFormShowBtn.addEventListener("click", () => {
  bookModalForm.showModal();
  bookFormInput.forEach((input) => refreshValue(input));
});

//close the form
function closeForm(e) {
  const dialog = findMyDialog(e);
  dialog.close();
}

function findMyDialog(e) {
  return e.target.parentElement.parentElement;
}

//check form input to validate

function isInputEmpty(target) {
  return target.value === "";
}

function validateRequiredInput(target) {
  if (!isInputEmpty(target)) {
    target.setCustomValidity("");
  } else {
    target.setCustomValidity("This field can not be empty");
  }
}

const pattern = /^[0-9]*$/;

function isInputNumber(target) {
  return pattern.test(target.value);
}

function validateNumberInput(target) {
  if (!isInputEmpty(target)) {
    if (isInputNumber(target)) {
      target.setCustomValidity("");
    } else {
      target.setCustomValidity("Please enter a number");
    }
  } else {
    target.setCustomValidity("This field can not be empty");
  }
}

// Check the form input when the form dialog is opened
bookFormShowBtn.addEventListener("click", () => {
  validateRequiredInput(title);
  validateRequiredInput(author);
  validateNumberInput(pages);
});

title.addEventListener("input", validateRequiredInput.bind(this, title));
author.addEventListener("input", validateRequiredInput.bind(this, author));
pages.addEventListener("input", validateNumberInput.bind(this, pages));

// Close the form
const closeBtn = document.querySelector("button.close");
closeBtn.addEventListener("click", closeForm);

// Submit the form
const formToSubmit = document.querySelector("form");
formToSubmit.addEventListener("submit", submitBook);

//Submit book created by user into the DOM and put the object into myLibrary array
function submitBook(event) {
  //Prevent the form from submitting and refreshing the window
  const mark = document.querySelector(".mark input:checked");
  currentMark = mark.value === "true" ? true : false;
  if (
    !isInputEmpty(title) &&
    !isInputEmpty(author) > 0 &&
    isInputNumber(pages)
  ) {
    event.preventDefault();
    const book = new Book(title.value, author.value, pages.value, currentMark);
    myLibrary.push(book);
    addBookToLibrary();
    //Close the dialog
    bookModalForm.close();
  } else {
    event.preventDefault();
  }

  checkCurrent();
}

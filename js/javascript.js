const container = document.querySelector('div')
let myLibrary = [];

function Book(title, author, pages, mark) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.mark = mark;
  // the constructor...
}

const bookOne = new Book('Eloquent Javascript', 'Marijn Haverbeke', 274, 'not read')
const bookTwo = new Book('Naruto', 'Kishimoto masashi', 150, 'read')
myLibrary.push(bookOne);
myLibrary.push(bookTwo);

function addBookToLibrary() {
  myLibrary.forEach(book => addBook(book));
  // do stuff here
}

function addBook(obj) {
  const book = document.createElement('div');
  book.classList.add('book');
  container.appendChild(book);

  const bookTitle = document.createElement('div');
  bookTitle.textContent = `Title : ${obj.title}.`;
  book.appendChild(bookTitle);

  const bookAuthor = document.createElement('div');
  bookAuthor.textContent = `Author : ${obj.author}.`;
  book.appendChild(bookAuthor);

  const bookPages = document.createElement('div');
  bookPages.textContent = `pages : ${obj.pages}.`;
  book.appendChild(bookPages);

  const bookMark = document.createElement('div');
  bookMark.textContent = obj.mark;
  book.appendChild(bookMark);
}

addBookToLibrary();

//make a function that will construct a new book object;
//make a function that will put the new created book object into the library array
//make form that will construct new object with the input of its form
//loop through myLibrary and display each book on the page

const bookFormInput = document.querySelectorAll('form > div > input');

bookFormInput.forEach(input => input.addEventListener('input', hideLabel));

function hideLabel() {
  const label = this.previousElementSibling;
  if (this.value.length >= 1) {
   label.classList.add('hidden')
  } else {
    label.classList.remove('hidden');
  }
}

const closeButton = document.querySelector('.close');

closeButton.addEventListener('click', hideElement)

function hideElement () {
  const popUp = this.parentElement;
  popUp.id = 'hidden';
}

const addBookButton = document.querySelector('.add')

addBookButton.addEventListener('click', openForm)

function openForm () {
  const popUp = document.querySelector('form');
  popUp.id = 'book-form';
}


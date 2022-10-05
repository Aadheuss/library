const title = document.querySelector('.title input');
const author = document.querySelector('.author input');
const pages = document.querySelector('.pages input');
const popUp = document.querySelector('form');
const container = document.querySelector('div')
let myLibrary = [];

function Book(title, author, pages, mark) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.mark = mark;
}

const bookOne = new Book('Eloquent Javascript', 'Marijn Haverbeke', 274, 'not read')
const bookTwo = new Book('Naruto Vol. 72', 'Masashi Kishimoto', 208, 'read')
myLibrary.push(bookOne);
myLibrary.push(bookTwo);

function addBookToLibrary() {
  myLibrary.forEach(book => addBook(book));
}

function addBook(obj) {
  const bookNumber = myLibrary.indexOf(obj);
  const book = document.querySelector(`[data-book='${bookNumber}']`)

  if (book === null) {
    const book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute('data-book', `${bookNumber}`)
    container.appendChild(book);

    const removeBook = document.createElement('button');
    book.appendChild(removeBook);

    const bookTitle = document.createElement('div');
    bookTitle.textContent = `${obj.title}`;
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

    checkMark(bookMark);
  }
}

addBookToLibrary();

container.addEventListener('click', checkCurrent);

function checkCurrent() {
  const markButton = document.querySelectorAll('.book > div:last-child');
  const removeButton = document.querySelectorAll('.book > button');
  const closeButton = document.querySelector('.warning button');
  markButton.forEach(button => button.addEventListener('click', toggleMark));
  removeButton.forEach(button => button.addEventListener('click', deleteBook));

  if (closeButton !== null) {
  closeButton.addEventListener('click', closeWarning);
  }
}

checkCurrent();

function toggleMark() {
  this.parentElement.classList.toggle('check');
  const index = Number(this.parentElement.getAttribute('data-book'));

  if (this.textContent === 'read') {
    this.textContent = 'not read';
    myLibrary[index].mark = 'not read';
  } else {
    this.textContent ='read';
    myLibrary[index].mark = 'read'
  }
}

function checkMark (bookMark) {
  if (bookMark.textContent === 'read') {
    bookMark.parentElement.classList.add('check');
  } else {
    bookMark.parentElement.classList.remove('check');
  }
}

function deleteBook () {
  const index = Number(this.parentElement.getAttribute('data-book'));
  const books = document.querySelectorAll(`[data-book]`);
  books.forEach(book => changeData(book));

  function changeData (book) {
    const secondIndex = Number(book.getAttribute('data-book'));
    if (secondIndex > index) {
      const index = secondIndex - 1;
      book.setAttribute('data-book', index);
    }
  }

  myLibrary.splice(Number(index), 1);
  this.parentElement.remove();
}

function closeWarning () {
  this.parentElement.classList.remove('warning');
  removeOverlay();
}

const bookFormInput = document.querySelectorAll('form > div > input');
bookFormInput.forEach(input => input.addEventListener('input', hideLabel));

function hideLabel() {
  const label = this.previousElementSibling;
  if (this.value.length >= 1) {
   label.classList.add('hidden');
  } else {
    label.classList.remove('hidden');
  }
}

const bookForm = document.querySelector('.add');
bookForm.addEventListener('click', openForm);

function openForm () {
  addOverlay();
  popUp.id = 'book-form';
  bookFormInput.forEach(input => refreshValue(input));
}

const submitButton = document.querySelector('form button:last-child');
submitButton.addEventListener('click', submitBook);

function submitBook () {
  const mark = document.querySelector('.mark input:checked');
  const number = new RegExp('^[0-9]+$');
  if (title.value.length > 0 && author.value.length > 0 && number.test(pages.value)) {
    const book = new Book(title.value, author.value, pages.value, mark.value);
    myLibrary.push(book);
    addBookToLibrary();
    hideElement();
    checkCurrent();
  } else {
    addOverlay();
    const warningPopUp = document.querySelector('form + .hidden');
    warningPopUp.classList.add('warning');
    checkCurrent();
  }
}

function addOverlay () {
  const body = document.querySelector('body');
  const checkOverlay = document.querySelector('.overlay');
  if (checkOverlay === null) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  body.appendChild(overlay);
  } else {
    checkOverlay.style['z-index'] ='3';
  }
}

function removeOverlay () {
  const overlay = document.querySelector('.overlay');
  const zIndex = Number(overlay.style['z-index']);
  if (overlay !== null && zIndex !== 3) {
    overlay.remove();
  } else {
    overlay.style['z-index'] = 1;
  }
}

bookFormInput.forEach(input => refreshValue(input));

function refreshValue(input) {
  if (input.value.length > 0) {
    input.value = "";
    input.previousElementSibling.classList.remove('hidden');
  }
}

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', hideElement);

function hideElement () {
  const closeButton = document.querySelector('.warning button');
  if (closeButton === null) {
    popUp.id = 'hidden';
    removeOverlay();
  }
}

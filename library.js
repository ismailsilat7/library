
const myLibrary = [];
var numBooks = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        const isReadStr = this.read ? "read" : "not read";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${isReadStr}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    // do stuff here
    var newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    numBooks++;
    console.log(numBooks);
}

const minimalistColors = [
    '#B4D8E7', // Pale Blue
    '#B8E2D6', // Soft Green
    '#FAD8D1', // Pale Peach
    '#C8A8D1', // Muted Lavender
    '#E8E8E8', // Off-White
    '#FFF7A2', // Pastel Yellow
    '#F1D0C6', // Dusty Rose
    '#D7D0C0'  // Light Taupe
];

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * minimalistColors.length);
    return minimalistColors[randomIndex];
}

function displayBooks() {

    const shelf = document.querySelector('#shelf');
    shelf.querySelectorAll('.book').forEach(book => book.remove());

    for (var i = 0; i < numBooks; i++) {
        const div = document.createElement("div");

        div.setAttribute('class', `book`);
        div.setAttribute('id', `${i}`);
        const randomColor = getRandomColor();
        div.style.backgroundColor = randomColor;


        var isReadStr;
        var readClass = '';
        if(myLibrary[i].read) {
            isReadStr = "Read";
            readClass = 'true';
        } else {
            isReadStr = "Not Read"
        }


        div.innerHTML = 
        `
        <h2 class="title">${myLibrary[i].title}</h2> 
        <p class="author">by ${myLibrary[i].author}</p>
        <p class="pages">${myLibrary[i].pages}</p>
        <button class="read ${readClass} ${i}">${isReadStr}</button>
        <button class="delete ${i}">Remove</button>
        `;


        const author = div.querySelector('.author');
        author.style.color = randomColor;
        shelf.appendChild(div);


        console.log(myLibrary[i].info());
    }
}


const showDialog = document.getElementById("show-dialog");
const dialog = document.getElementById('dialog');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');
const clearShelf = document.getElementById("clear-shelf");
const shelf = document.querySelector('#shelf');

clearShelf.addEventListener("click", () => {
    const shelf = document.querySelector('#shelf');
    shelf.querySelectorAll('.book').forEach(book => book.remove());
    while (myLibrary.length > 0) {
        myLibrary.pop();
    }
    numBooks = 0;
})


showDialog.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
    bookForm.reset();
    dialog.close()
});

bookForm.addEventListener('submit', (event)=> {
    event.preventDefault();

    const formData = {
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        pages: document.getElementById('pages').value,
        read: (document.getElementById('read').value === "Yes") ? true : false
    };

    addBookToLibrary(formData.title, formData.author, formData.pages, formData.read);
    displayBooks();
    dialog.close();
    bookForm.reset();
});

shelf.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const number = Array.from(event.target.classList).find(cls => !isNaN(cls));
        const book = document.getElementById(`${number}`);
        book.remove();
        myLibrary.splice(number, 1);
        numBooks--;
        displayBooks();
    }
});

shelf.addEventListener('click', (event) => {
    if(event.target.classList.contains('read')) {
        const number = Array.from(event.target.classList).find(cls => !isNaN(cls));
        const book = document.getElementById(`${number}`);
        const readBtn = book.querySelector('.read');
        readBtn.classList.toggle('true');
        readBtn.textContent = (readBtn.textContent == "Read") ? "Not Read" : "Read";
        myLibrary[number].read = !myLibrary[number].read;
    }
})


addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 279, false);
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('Moby-Dick', 'Herman Melville', 585, false);
addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', 277, true);


displayBooks();

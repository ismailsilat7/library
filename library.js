
class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get getTitle() {
        return this.title;
    }

    get getAuthor() {
        return this.author;
    }

    get getPages() {
        return this.pages;
    }

    get getRead() {
        return this.read;
    }

    info() {
        const isReadStr = this.read ? "read" : "not read";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${isReadStr}`;
    }

    updateStatus() {
        this.read = !this.read;
    }

}

class Library {

    constructor() {
        this.Books = [];
        this.numBooks = 0;
    }

    addBookToLibrary(title, author, pages, read) {
        // do stuff here
        var newBook = new Book(title, author, pages, read);
        this.Books.push(newBook);
        this.numBooks++;
        console.log(this.numBooks);
    }

    get length() {
        return this.Books.length;
    }

    clearBooks() {
        while (this.Books.length > 0) {
            this.Books.pop();
        }
        this.numBooks = 0;
    }

    removeBook(number) {
        this.Books.splice(number, 1);
        this.numBooks--;
    }

    updateBookStatus(number) {
        this.Books[number].updateStatus();
    }

    displayBooks() {
        const shelf = document.querySelector('#shelf');
        shelf.querySelectorAll('.book').forEach(book => book.remove());
    
        for (var i = 0; i < this.numBooks; i++) {
            const div = document.createElement("div");
    
            div.setAttribute('class', `book`);
            div.setAttribute('id', `${i}`);
            const randomColor = getRandomColor();
            div.style.backgroundColor = randomColor;
    
    
            var isReadStr;
            var readClass = '';
            if(this.Books[i].getRead) {
                isReadStr = "Read";
                readClass = 'true';
            } else {
                isReadStr = "Not Read"
            }
    
    
            div.innerHTML = 
            `
            <h2 class="title">${this.Books[i].getTitle}</h2> 
            <p class="author">by ${this.Books[i].getAuthor}</p>
            <p class="pages">${this.Books[i].getPages}</p>
            <button class="read ${readClass} ${i}">${isReadStr}</button>
            <button class="delete ${i}">Remove</button>
            `;

            const author = div.querySelector('.author');
            author.style.color = randomColor;
            shelf.appendChild(div);
    
    
            console.log(this.Books[i].info());
        }
    }
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


const myLibrary = new Library();

const showDialog = document.getElementById("show-dialog");
const dialog = document.getElementById('dialog');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');
const clearShelf = document.getElementById("clear-shelf");
const shelf = document.querySelector('#shelf');

clearShelf.addEventListener("click", () => {
    myLibrary.clearBooks();
    myLibrary.displayBooks();
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

    myLibrary.addBookToLibrary(formData.title, formData.author, formData.pages, formData.read);
    myLibrary.displayBooks();
    dialog.close();
    bookForm.reset();
});

shelf.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const number = Array.from(event.target.classList).find(cls => !isNaN(cls));
        const book = document.getElementById(`${number}`);
        book.remove();
        myLibrary.removeBook(number);
        myLibrary.displayBooks();
    }
});

shelf.addEventListener('click', (event) => {
    if(event.target.classList.contains('read')) {
        const number = Array.from(event.target.classList).find(cls => !isNaN(cls));
        const book = document.getElementById(`${number}`);
        const readBtn = book.querySelector('.read');
        readBtn.classList.toggle('true');
        readBtn.textContent = (readBtn.textContent == "Read") ? "Not Read" : "Read";
        myLibrary.updateBookStatus(number);
    }
})


myLibrary.addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
myLibrary.addBookToLibrary('1984', 'George Orwell', 328, true);
myLibrary.addBookToLibrary('Pride and Prejudice', 'Jane Austen', 279, false);
myLibrary.addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
myLibrary.addBookToLibrary('Moby-Dick', 'Herman Melville', 585, false);
myLibrary.addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', 277, true);


myLibrary.displayBooks();

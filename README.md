# MyReads Project

This is project #1 from Udacity Course.

## Functionality
There are 3 shelves: Currently Reading, Want to Read and Read.
User can assign each book to a different shelf and change will be reflected immediately.

User is also able to search from a database of books and assign books to differnt shelves.


## Files
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. 
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles 
    ├── App.js # root of your app
    ├── App.test.js # Used for testing. Provided with Create React App. 
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are 
    ├── Book.js # Displays each grid book information
    ├── BookList.js # Displays all the shelves of books, homescreen
    ├── SearchPage.js # Displays Search result of books
    below.
    ├── icons 
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css
    └── index.js
```


## Backend Server

## Details of API methods

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

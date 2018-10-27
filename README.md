# MyReads Project

This project is an assessment project for Udacity's React Fundamentals course. The goal is practice the fundamentals learning
in the course as control components, state management, functional components, Route and so on.

The following features should be implemented (to be accepted):
- Display 3 shelf : 'Currently Reading', 'Want To Read', 'Read'
- User may move a book between shelves
- Books should still on their shelves after page reload (use BooksAPI to keep book state)
- Search page has an input tag which allow users to perform queries for new books
- User can save the searched book in one shelf, this book should appear on main page at selected shelf
- The searched book should display its shelf on change menu

In addition, this features was also implemented:
- Shelves is based on API, if a new shelf becomes available the application will display this
- The minimum shelves was set to ["wantToRead", "currentlyReading", "read"] to avoid a shelf dissapear when the user remove all books in a shelf and reload the page

Desirable features (may not be implemented until assessment's deadline):
- Rate a book with stars
- Share a book in social media (Facebook, Whatsapp, Google+, Telegram)
- Page to check details for each book
- Undo bar should temporary appears after the user move a book to another shelf, and it should restore previous state if clicked
- Allow user to write comments for a book

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* install all project dependencies with `npm install --no-bin-links` if you are using Vagrant or VirtualBox
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── components # This is where react components are stored
    │   ├── BookCard.js
    │   ├── BookMenuOption.js
    │   ├── BookShelf.js
    │   ├── SearchBar.js
    │   └── ShelvesCollection.js
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    └── utils
        ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
        └── StringsMethods.js # A JavaScript functions for String manipulation.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

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

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

# Expense Tracker

Expense Tracker is a full-stack web application for managing personal expenses.
Users can add, edit, delete, search, and filter expenses, while the data is stored in a PostgreSQL database.

## How to run

<!-- Write the exact steps someone needs to run your project from scratch.
     Assume they have Node.js, PostgreSQL, and VS Code, and nothing else.
     Include: creating the database, running schema.sql, writing the .env file,
     starting the backend, and opening the frontend. -->

**Backend**

1. ...

**Frontend**

1. ...

## Features

<!-- List what your app can do. Tick what you finished. -->
## Features

- [x] Add an expense (with validation)
- [x] Delete an expense
- [x] Edit an expense
- [x] Filter by category
- [x] Search expenses by title
- [x] Summary cards (total, count, highest)
- [x] Data is saved in a PostgreSQL database
- [x] Error handling and validation
- [x] Loading spinner
- [x] Responsive design for desktop and mobile

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Node.js
- Express.js
- PostgreSQL

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/:id` | Get one expense |
| POST | `/api/expenses` | Add a new expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |

## Screenshots

### Desktop

[View Desktop Screenshot](https://drive.google.com/file/d/1YknZyS06oF1QBkC6Pw1KslOt5IoT8Xb-/view?usp=sharing)

### Mobile

[View Mobile Screenshot](https://drive.google.com/file/d/1_tgpL5oMrWvBWFnVNWwoCu1QBA5OonWb/view?usp=sharing)


## What was the hardest part?

The hardest part was connecting the frontend with the backend and PostgreSQL database and making sure that all operations worked correctly.

I solved this by using REST API endpoints with JavaScript fetch, async/await, and try/catch. I also tested adding, editing, deleting, filtering, and searching expenses to make sure the data was correctly saved and displayed.

## Bonus Feature

The project includes a Search by Title feature.

Users can search for expenses by typing part of the expense title. The search can also be combined with the category filter.

## Project Video

A short demonstration video of the project is available here:

[Project Demo Video](https://drive.google.com/file/d/1tQpxWpzVSa9tPnhnuusCzCKAVwTUCrJ3/view?usp=sharing)

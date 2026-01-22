Book Management REST API

This is a simple Book Management REST API built using Node.js, Express, and TypeScript.
The project demonstrates basic backend concepts such as CRUD operations, service-based
architecture, file upload handling, and manual CSV parsing without using any CSV libraries.

--------------------------------
FEATURES
--------------------------------
- Create, Read, Update, Delete books
- Each book has a unique UUID
- Bulk import books using CSV file upload
- Manual CSV parsing and validation
- Returns number of books added and error rows
- Centralized error handling
- Logging using Morgan
- TypeScript for type safety
- In-memory data storage (no database)

--------------------------------
TECH STACK
--------------------------------
- Node.js
- Express.js
- TypeScript
- Multer (file upload)
- Morgan (logging)
- UUID
- dotenv

--------------------------------
PROJECT STRUCTURE
--------------------------------
src/
  app.ts
  server.ts
  routes/
    book.routes.ts
  controllers/
    book.controller.ts
  services/
    book.service.ts
  models/
    book.model.ts
  middlewares/
    error.middleware.ts

--------------------------------
SETUP INSTRUCTIONS
--------------------------------
1. Clone the repository
   git clone https://github.com/soumyaNayak07/book-management-api.git
   cd book-management-api

2. Install dependencies
   npm install

3. Create environment file (.env)
   PORT=5000

4. Run the server
   npm run dev

Server runs on:
http://localhost:5000

--------------------------------
API ENDPOINTS
--------------------------------
GET    /books           -> Get all books
GET    /books/:id       -> Get book by ID
POST   /books           -> Add a new book
PUT    /books/:id       -> Update a book
DELETE /books/:id       -> Delete a book
POST   /books/import    -> Import books using CSV file

--------------------------------
ADD BOOK (POST /books)
--------------------------------
Request body (JSON):
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publishedYear": 2008
}

--------------------------------
CSV IMPORT
--------------------------------
Endpoint:
POST /books/import

CSV file format:
title,author,publishedYear
Clean Code,Robert C Martin,2008
Refactoring,Martin Fowler,1999
Bad Book,,2020
Wrong Year,Some Author,abcd

Upload using Postman:
- Method: POST
- Body: form-data
- Key: file
- Type: File
- Select CSV file

Sample response:
{
  "added": 2,
  "errors": [
    { "row": 4, "error": "Invalid or missing fields" },
    { "row": 5, "error": "Invalid or missing fields" }
  ]
}

--------------------------------
IMPORTANT NOTES
--------------------------------
- Data is stored in memory (no database)
- Restarting the server clears all data
- CSV parsing is done manually (no CSV libraries)
- Designed for backend interview tasks

--------------------------------
AUTHOR
--------------------------------
Soumya Nayak

--------------------------------
STATUS
--------------------------------
Project Completed
Interview Ready

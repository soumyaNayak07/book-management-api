import { Request, Response } from "express";
import * as bookService from "../services/book.service";

// GET /books
export const getBooks = (_req: Request, res: Response) => {
  res.json(bookService.getAllBooks());
};

// GET /books/:id
export const getBook = (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Book id required" });
  }

  const book = bookService.getBookById(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
};

// POST /books
export const addBook = (req: Request, res: Response) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ message: "All fields required" });
  }

  const book = bookService.createBook(
    title,
    author,
    Number(publishedYear)
  );

  res.status(201).json(book);
};

// PUT /books/:id
export const updateBook = (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, author, publishedYear } = req.body;

  if (!id || !title || !author || !publishedYear) {
    return res.status(400).json({ message: "All fields required" });
  }

  const updated = bookService.updateBook(
    id,
    title,
    author,
    Number(publishedYear)
  );

  if (!updated) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(updated);
};

// DELETE /books/:id
export const deleteBook = (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Book id required" });
  }

  const success = bookService.deleteBook(id);

  if (!success) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json({ message: "Book deleted successfully" });
};

// POST /books/import
export const importBooks = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV file required" });
  }

  const csv = req.file.buffer.toString("utf-8");
  const lines = csv.split("\n").map((l) => l.trim());

  const headers = lines[0].split(",");

  if (
    headers[0] !== "title" ||
    headers[1] !== "author" ||
    headers[2] !== "publishedYear"
  ) {
    return res.status(400).json({ message: "Invalid CSV format" });
  }

  const rows = lines.slice(1).map((line) => {
    const [title, author, publishedYear] = line.split(",");
    return { title, author, publishedYear };
  });

  const result = bookService.bulkCreateBooks(rows);
  res.json(result);
};

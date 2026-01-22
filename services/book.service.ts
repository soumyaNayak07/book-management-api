import { Book } from "../models/book.model";
import { v4 as uuidv4 } from "uuid";

const books: Book[] = [];

export const getAllBooks = (): Book[] => books;

export const getBookById = (id: string): Book | null => {
  return books.find((b) => b.id === id) ?? null;
};

export const createBook = (
  title: string,
  author: string,
  publishedYear: number
): Book => {
  const book: Book = {
    id: uuidv4(),
    title,
    author,
    publishedYear,
  };

  books.push(book);
  return book;
};

export const bulkCreateBooks = (
  rows: any[]
): { added: number; errors: any[] } => {
  let added = 0;
  const errors: any[] = [];

  rows.forEach((row, index) => {
    const { title, author, publishedYear } = row;

    if (
      !title ||
      !author ||
      !publishedYear ||
      isNaN(Number(publishedYear))
    ) {
      errors.push({
        row: index + 2, // CSV line number
        error: "Invalid or missing fields",
      });
      return;
    }

    books.push({
      id: uuidv4(),
      title,
      author,
      publishedYear: Number(publishedYear),
    });

    added++;
  });

  return { added, errors };
};

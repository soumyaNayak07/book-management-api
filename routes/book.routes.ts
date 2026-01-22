import { Router } from "express";
import multer from "multer";
import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  importBooks,
} from "../controllers/book.controller";

const router = Router();
const upload = multer();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/import", upload.single("file"), importBooks);

export default router;

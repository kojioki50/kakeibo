import express from "express";
import { body } from "express-validator";
import { deleteList, getList, registList, updateList } from "../controllers/lists.mjs";
import requestErrorHandler from "../helpers/helper.mjs";

const router = express.Router();


router.get("/", requestErrorHandler(getList));

router.post("/", body("day").notEmpty().withMessage("エラーメッセージ"), requestErrorHandler(registList));

router.delete("/:id", requestErrorHandler(deleteList));

router.patch("/:id", body("day").notEmpty().withMessage("エラーメッセージ"), requestErrorHandler(updateList));

export default router;

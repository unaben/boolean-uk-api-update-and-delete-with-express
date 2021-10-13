const express = require("express");

const { createOne, getAll, getOneById, updateOneById, updateOneByTitle, patchOneBookById, deleteBookById } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updateOneById);

router.patch("/:id", patchOneBookById);

router.delete("/:id", deleteBookById);

router.put("/books/byTitle/:title", updateOneByTitle);

module.exports = router;

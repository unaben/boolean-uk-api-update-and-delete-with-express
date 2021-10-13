const express = require("express");

const { createOne, getAll, getOneById, updateOneById, updateOneByTitle } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updateOneById);

router.put("/books/byTitle/:title", updateOneByTitle);

module.exports = router;

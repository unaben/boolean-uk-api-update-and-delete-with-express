const express = require("express");

const { createOne, getAll, getOneById, updateOneById, deletePetById, patchOnePetById } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updateOneById);

router.delete("/:id", deletePetById);

router.patch("/:id", patchOnePetById);

module.exports = router;

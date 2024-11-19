const express = require("express");
const { addStudent, removeStudent, modifyStudent } = require("../controllers/studentController");
const router = express.Router();

router.post("/", addStudent);
router.delete("/:id", removeStudent);
router.put("/:id", modifyStudent);

module.exports = router;
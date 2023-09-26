const express = require("express");
const router = express.Router();
const allfabulas = require("../../controllers/allfabulas"); 

/* GET books listing. */

router.get("/", allfabulas);


module.exports = router;

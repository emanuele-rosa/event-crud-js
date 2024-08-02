var express = require('express')
var router = express.Router()

router.get("/", (req, res) => {
    res.json({status: true, msg: "Welcome to your events management!"})
})

module.exports = router;

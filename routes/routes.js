const express = require("express");
const authorize = require("../utils/auth");
const { addController, updateController, fetchController } = require("../controllers/controller");
const router = express.Router();

router.get("/", async function(req, res) {
    res.send("Governance Backend");
});

// TODO(raneet10): We can do some custom validations here.
router.post("/create", authorize, addController);
router.put("/update", authorize, updateController);
router.get("/fetch", fetchController);

module.exports = router;
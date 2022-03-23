const express = require("express");
const { body, query } = require("express-validator");
const authorize = require("../middlewares/auth");
const { loginController, addController, updateController, fetchController, newAdminController } = require("../controllers/controller");
const router = express.Router();

router.get("/", async function (req, res) {
    res.send("Governance Backend");
});

router.post(
    "/login",
    [
        body("address", "Invalid address").exists().isEthereumAddress(),
        body("signature", "Invalid signature").exists()
    ],
    loginController);

router.post(
    "/admin/add",
    [
        body("address", "Invalid address").exists().isEthereumAddress()
    ],
    authorize, newAdminController
)
/**
 * Creates a new proposal
 * @param proposalId
 * @param title
 * @param description
 * @param created
 * @param edited
 * @param address
 */
router.post(
    "/create",
    [
        body("proposalId", "Invalid proposal Id").exists(),
        body("title", "Invalid title").exists(),
        body("description", "Invalid description").exists(),
        body("created", "Invalid creator address").exists().isEthereumAddress(),
        body("edited", "Invalid editor address").exists().isEthereumAddress(),
        body("address", "Invalid admin address").exists().isEthereumAddress()
    ],
    authorize, addController);

/**
 * @param proposalId
 * @param title
 * @param description
 * @param edited
 * @param address
 */
router.put(
    "/update",
    [
        body("proposalId", "Invalid proposal Id").exists(),
        body("title", "Invalid title").exists(),
        body("description", "Invalid description").exists(),
        body("edited", "Invalid editor address").exists().isEthereumAddress(),
        body("address", "Invalid admin address").exists().isEthereumAddress()
    ],
    authorize, updateController);

/**
 * Gets a single proposal
 */
router.get(
    "/fetch",
    query("proposalId", "Invalid proposal Id").exists(),
    fetchController);

module.exports = router;
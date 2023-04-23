const router = require("express").Router();
const {
  sendMessage,
  allMessage,
} = require("../controllers/messageControllers");
const { protected } = require("../middlewares/authMiddleware");

router.route("/").post(protected, sendMessage);
router.route("/:chatId").get(protected, allMessage);

module.exports = router;

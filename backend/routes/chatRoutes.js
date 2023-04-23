const router = require("express").Router();
const {
  accessChat,
  fetchChats,
  createRoomChat,
  addToRoom,
  removeFromRoom,
} = require("../controllers/chatControllers");
const { protected } = require("../middlewares/authMiddleware");

router.route("/").post(protected, accessChat);
router.route("/").get(protected, fetchChats);
router.route("/room").post(protected, createRoomChat);
router.route("/roomRemove").put(protected, removeFromRoom);
router.route("/roomAdd").put(protected, addToRoom);

module.exports = router;

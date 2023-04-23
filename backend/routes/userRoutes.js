const router = require("express").Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");

const { protected } = require("../middlewares/authMiddleware");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/", allUsers);

module.exports = router;

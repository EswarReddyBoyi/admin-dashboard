const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/User");

router.get("/analytics", auth, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const admins = await User.countDocuments({ role: "admin" });
    const users = await User.countDocuments({ role: "user" }); 

    res.json({
      totalUsers,
      admins,
      users,
      activeUsers: Math.floor(totalUsers * 0.7),
      sales: Math.floor(Math.random() * 1000)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

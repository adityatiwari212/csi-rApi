const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token , user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token , user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateUserBookmark = async (req, res) => {
  const { userId, resourceId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.bookmarkedResources) user.bookmarkedResources = [];
    if (!user.bookmarkedResources.includes(resourceId)) {
      user.bookmarkedResources.push(resourceId);
    }

    await user.save();
    res.json({ message: "Bookmark updated", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateUserContentCount = async (req, res) => {
  const { userId, subject, count } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.subjectContentCount) user.subjectContentCount = {};

    if (user.subjectContentCount[subject]) {
      user.subjectContentCount[subject] += count;
    } else {
      user.subjectContentCount[subject] = count;
    }

    await user.save();
    res.json({ message: "Content count updated", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { registerUser, loginUser, updateUserBookmark, updateUserContentCount };

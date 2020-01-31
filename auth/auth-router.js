const router = require("express").Router();
const userDb = require("./users-model");
const bcryptjs = require("bcryptjs");
const makeToken = require("./make-token");

router.post("/register", async (req, res, next) => {
  // implement registration
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = await userDb.insert({ username, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  // implement login
  const credentials = req.body;
  try {
    const user = await userDb.getByUsername(credentials.username);
    const passwordIsCorrect = await bcryptjs.compare(
      credentials.password,
      user.password
    );
    if (passwordIsCorrect) {
      const token = makeToken(user);
      res.status(200).json({ message: `Access granted!`, token });
    } else {
      res.status(401).json({ message: `Unauthorized` });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

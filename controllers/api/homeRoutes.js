const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });
    res.render("all-posts", {
      posts: postData.map((post) => post.get({ plain: true })),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    if (!postData) {
      return res.status(404).end();
    }

    res.render("single-post", { post: postData.get({ plain: true }) });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("signup");
});

module.exports = router;

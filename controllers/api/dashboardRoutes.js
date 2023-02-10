const router = require("express").Router();
// const { Post } = require("./models");
// const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
      raw: true,
    });
    res.render("all-posts-admin", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      raw: true,
    });
    if (post) {
      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
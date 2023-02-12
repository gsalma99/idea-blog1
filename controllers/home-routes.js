const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

async function getAllPosts(req, res) {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getSinglePost(req, res) {
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

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("single-post", { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

function showLogin(req, res) {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
}

function showSignup(req, res) {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
}

router.get("/", getAllPosts);
router.get("/post/:id", getSinglePost);
router.get("/login", showLogin);
router.get("/signup", showSignup);

module.exports = router;


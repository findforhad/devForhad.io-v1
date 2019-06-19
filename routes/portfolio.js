const router = require("express").Router();
const multer = require("multer");

//Portfolio Model
const Portfolio = require("../model/portfolio");

//Seting up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Image should be in JPEG or PNG format"), false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

//@route ADD api/v1/addnew
//@desc Add New Portfolio
//@access private
router.post("/addnew", upload.single("projectImage"), async (req, res) => {
  if (
    !req.headers.authuri ||
    req.headers.authuri !== require("../config/keys").authuri
  )
    return res.status(400).json({ message: "Authorzation Faild" });

  const { errors, isValid } = require("../validation/portfolio")(req.body);
  if (!isValid) return res.status(400).json(errors);

  await Portfolio.findOne({ title: req.body.title }).then(async project => {
    if (project)
      return res.status(403).json({ message: "Project already exits" });

    const newProject = new Portfolio({
      title: req.body.title,
      subTitle: req.body.subTitle,
      desc: req.body.desc,
      features: req.body.features.split(","),
      githubRepo: req.body.githubRepo,
      previewLink: req.body.previewLink,
      imagePath: req.file.filename
    });
    await newProject
      .save()
      .then(project => res.json(project))
      .catch(err => res.json(err));
  });
});

router.get(
  "/projects",
  async (req, res) =>
    await Portfolio.find()
      .sort([["published", 1]])
      .then(projects => res.json(projects))
);

router.get("/projects/:limit", async (req, res) => {
  await Portfolio.find()
    .limit(parseInt(req.params.limit))
    .sort([["published", 1]])
    .then(projects => res.json(projects));
});

module.exports = router;

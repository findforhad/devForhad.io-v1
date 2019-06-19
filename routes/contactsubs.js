const router = require("express").Router();
const validator = require("validator");
const Subscribe = require("../model/subscribe");
const sendMail = require("../misc/mailer");

//@route ADD api/v1/contactform
//@desc Subscribe
//@access public
router.post("/contactform", (req, res) => {
  const { errors, isValid } = require("../validation/contactform")(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  sendMail(req.body, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: false });
    }
    res.json({ message: "From Submitted Successfuly", status: true });
  });
});

//@route ADD api/v1/subscribe
//@desc Subscribe
//@access public
router.post("/subscribe", async (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    return res
      .status(400)
      .json({ message: "Please provide valid email", status: false });
  }

  await Subscribe.findOne({ email: req.body.email }).then(
    async subscription => {
      if (subscription) {
        return res
          .status(400)
          .json({ message: "Subscription Faild. Email Exits", status: false });
      }

      const newSubscription = new Subscribe({
        email: req.body.email
      });

      await newSubscription
        .save()
        .then(subscription => res.json({ subscription, status: true }))
        .catch(err => res.json(err));
    }
  );
});

module.exports = router;

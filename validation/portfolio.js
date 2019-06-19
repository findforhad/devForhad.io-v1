const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.subTitle = !isEmpty(data.subTitle) ? data.subTitle : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }

  if (Validator.isEmpty(data.subTitle)) {
    errors.subTitle = "subTitle field is required";
  }

  if (Validator.isEmpty(data.desc)) {
    errors.desc = "desc field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.message = !isEmpty(data.message) ? data.message : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "email  is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "email has to be valid";
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = "message is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateCustomerInput(data) {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";

  // firstName
  const nameRegEx = /[a-zA-Z]+('[a-zA-Z])?[a-zA-Z]*/;
  if (!Validator.isLength(data.firstName, { min: 2, max: 50 })) {
    errors.firstName = "First name must be between 2 and 50 characters";
  }
  if (!nameRegEx.test(data.firstName)) {
    errors.firstName = "Invalid characters in first name";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }

  // lastName
  const lastNameRegEx = /[a-zA-Z]+('[a-zA-Z])?[a-zA-Z]*/;
  if (!Validator.isLength(data.lastName, { min: 2, max: 50 })) {
    errors.lastName = "Last name must be between 2 and 50 characters";
  }
  if (!lastNameRegEx.test(data.lastName)) {
    errors.lastName = "Invalid characters in last name";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }

  // email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!Validator.isLength(data.email, { min: 5, max: 75 })) {
    errors.email = "Invalid number of characters in email";
  }

  // password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 8, max: 25 })) {
    errors.password = "Password must be between 8 and 25 characters";
  }

  // zipCode

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = "Zip Code field is required";
  }
  if (!Validator.isLength(data.zipCode, { min: 2, max: 5 })) {
    errors.zipCode = "Zip Code must be between 2 and 5 characters";
  }
  // In case we only use zip codes in the USA
  // const zipRegEx = /^[0-9]*$/;
  // if (!zipRegEx.test(data.zipCode)){
  //   errors.zipCode = "Zip Code must contain numbers only"
  // }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

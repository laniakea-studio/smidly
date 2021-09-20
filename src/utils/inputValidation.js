export const isEmail = (value) => {
  let valid = false;
  let message = "It's not in email format";

  return {
    valid,
    message,
  };
};

export const isSlug = (value) => {
  let valid = false;
  let message = "Not valid URL format";

  // Check is URL format and not starting with number
  const regexExp = /^[a-z]+(?:-[a-z0-9]+)*$/g;

  if (regexExp.test(value)) {
    valid = true;
    message = "";
  }
  return {
    valid,
    message,
  };
};

export const hasMinCharacters = (value, min) => {
  let valid = false;
  let message = `Requires at least ${min} characters`;

  if (value.length >= min) {
    valid = true;
    message = "";
  }

  return {
    valid,
    message,
  };
};

export const isUnique = (value, list) => {
  let valid = false;
  let message = "Value is not unique";

  if (!list.includes(value)) {
    valid = true;
    message = "";
  }

  return {
    valid,
    message,
  };
};

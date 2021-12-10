const isEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const isPassword = (password) => {
  return password.length > 6;
};

export default { isEmail, isPassword };

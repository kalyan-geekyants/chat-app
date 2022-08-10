const validateEmail = (email) => {
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return true;
  }
  return false;
};

const validateName = (name) =>{
    return name !== "";
}

const validateAge = (age) =>{
    let num = parseInt(age);
    return num > 0
}

module.exports = {validateEmail, validateName, validateAge}
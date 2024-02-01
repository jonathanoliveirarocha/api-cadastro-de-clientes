const verifyCpf = (cpf) => {
  const CPF = cpf.replace(/\D/g, "");
  let firstDigit, secondDigit;

  if (CPF.length !== 11) {
    return false;
  }

  if (checkIdenticalDigits(CPF)) {
    return false;
  }

  let sum = 0;

  for (let j = 8; j >= 0; j--) {
    sum += CPF[j] * (10 - j);
  }

  let rest = sum % 11;

  if (rest < 2) {
    firstDigit = 0;
  } else {
    firstDigit = 11 - rest;
  }

  if (firstDigit !== parseInt(CPF[9])) {
    return false;
  }

  sum = 0;

  for (let j = 9; j >= 0; j--) {
    sum += CPF[j] * (11 - j);
  }

  rest = sum % 11;

  if (rest < 2) {
    secondDigit = 0;
  } else {
    secondDigit = 11 - rest;
  }

  if (secondDigit !== parseInt(CPF[10])) {
    return false;
  }

  return CPF;
};

const checkIdenticalDigits = (string) => {
  for (let i = 1; i < string.length; i++) {
    if (string[i] !== string[0]) {
      return false;
    }
  }
  return true;
};

module.exports = verifyCpf;
const checkName = (nome) => {
  const regexNome = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-'´`]+$/;
  const isValid = regexNome.test(nome) && nome.length >= 2;
  return isValid;
}
const checkEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = regexEmail.test(email);
  return isValid;
}
const checkTelefone = (telefone) => {
  const regexTelefone = /^\(?(\d{2})\)?[\s-]?9?\d{4}[\s-]?\d{4}$/;
  const isValid = regexTelefone.test(telefone);
  return isValid;
}
const checkDados = (nome, email, telefone) => {
  const nameChecked = checkName(nome);
  const emailChecked = checkEmail(email);
  const telefoneChecked = checkTelefone(telefone);

  const dadosChecked = nameChecked && emailChecked && telefoneChecked;

  if(dadosChecked) {
    return {status: true, message: ''}
  } else {
    return {status: false, message: 'nome, email ou telefone inválido, valide os dados antes de tentar novamente!'}
  }
}

module.exports = {
  checkDados,
}

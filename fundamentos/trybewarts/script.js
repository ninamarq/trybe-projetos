const buttonLogin = document.getElementById('botaologin');
const input = document.getElementById('emailLogin');
const passwordLogin = document.getElementById('senhaLogin');

function login() {
  const i = input.value;
  const j = passwordLogin.value;
  if ((i === 'tryber@teste.com') && (j === '123456')) {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
buttonLogin.addEventListener('click', login);

// botão habilitado somente se o checkbox agreement tiver ok
const submitButton = document.getElementById('submit-btn');
const checkAgree = document.getElementById('agreement');

function btnsubmit() {
  if (checkAgree.value === 'on') {
    submitButton.removeAttribute('disabled');
    submitButton.style.cursor = 'pointer';
    submitButton.style.backgroundColor = 'rgb(66, 3, 124)';
  }
}

checkAgree.addEventListener('click', btnsubmit);

// contador de caracteres utilizando o 'onkeyup' na tag a
const textareaTag = document.getElementById('textarea');
const counterContainer = document.getElementById('counter');

function countertext() {
  const maxC = 500;
  const atualC = textareaTag.value.length;
  const leftC = maxC - atualC;
  counterContainer.innerHTML = leftC;

  return counterContainer;
}

textareaTag.addEventListener('input', countertext);

// ao clicar botao ENVIAR, formulario substituído pelos resultados
const formulario = document.getElementById('evaluation-form');
const bodyTag = document.getElementById('body-tag');
const nameUser = document.getElementById('input-name');
const lastnameUser = document.getElementById('input-lastname');
const emailUser = document.getElementById('input-email');
const houseUser = document.getElementById('house');
const arrayFamily = document.getElementsByClassName('input-family');
const arraySubject = document.getElementsByClassName('subject');
const arrayEvaluation = document.getElementsByClassName('avaliation-radio');
const observationsUser = document.getElementById('textarea');
const req21div = document.getElementById('req21');
const p21div = document.getElementsByClassName('top21');

function results() {
  formulario.style.display = 'none';
  req21div.style.display = 'flex';
  let val = "";
  let val2 = "";
  let val3 = "";
  //value familia
  for (let i = 0; i < arrayFamily.length; i++) {
    if (arrayFamily[i].checked === 'true') {
      val = val + arrayFamily[i].value + '<br>';
      p21div[3].innertext = 'Nome: ' + val;
    }
  }
}

function valueMateria() {
  for (let i = 0; i < arraySubject.length; i += 1) {
    if (arraySubject[i].checked === 'true') {
      val2 = val2 + arraySubject[i].value + '<br>';
      p21div[4].innertext = 'Matérias: ' + val2;
    }
  }
}

function valueEvaluation() {
  for (let i = 0; i < arrayEvaluation.length; i += 1) {
    if (arrayEvaluation[i].checked === 'true') {
      val3 = val3 + arrayEvaluation[i].value + '<br>';
      p21div[5].innertext = 'Avaliação: ' + val3;
    }
  }

  p21div[0].innertext = 'Nome: ' + nameUser.value + lastnameUser.value + '<br>';
  p21div[1].innertext = 'Email: ' + emailUser.value + '<br>';
  p21div[2].innertext = 'Casa: ' + houseUser.value + '<br>';
  p21div[6].innertext = 'Observações: ' + observationsUser.value;
}

submitButton.addEventListener('click', results);

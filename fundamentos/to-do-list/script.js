let input = document.getElementById('texto-tarefa');
let buttonTask = document.getElementById('criar-tarefa');
let listTask = document.getElementById('lista-tarefas');
let clearButton = document.getElementById('apaga-tudo');

buttonTask.addEventListener('click', createListTask);
// target: botao
// evento: clicar no botao, adiciona a task do input na lista
function createListTask(event) {
    let liTaks = document.createElement('li');
    liTaks.innerText = input.value;
    liTaks.className = 'liTag';
    listTask.appendChild(liTaks);
    event.target.buttonTask;
    input.value = "";
}

// target: li tag
// evento: ao clicar na lista, altera backgroundColor
function liBackgroundColor(event) {
    let liTag = listTask.children;
    for (let i = 0; i < liTag.length; i++) {
        liTag[i].className = 'liTag';
    }

    event.target.className = 'liTag selected';
}
listTask.addEventListener('click', liBackgroundColor);

// INCOMPLETO, DUVIDOSO
function liRisk(event) {
    let liClass = document.getElementsByTagName('li');
    for (let i = 0; i < liClass.length; i++){
        if (liClass[i].className != 'completed'){
            event.target.className = 'liTag completed';
        } else if (liClass[i].classList.contains('completed')){
            event.target.classList.removeAtribute('completed');
        }
    }
}
listTask.addEventListener('dblclick', liRisk);

function clearTasks(event) {
    let liTag = document.querySelectorAll('li');
    for (let i = 0; i < liTag.length; i++) {
        liTag[i].remove();
    }
}
clearButton.addEventListener('click', clearTasks);
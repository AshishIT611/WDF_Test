let input = document.querySelector('.input');
let addButton = document.getElementById('btn');
let list = document.querySelector('.list');
function addTask() {
    let taskText = input.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
            return;
    }
    let taskItem = document.createElement('li');
    let deleteButton = document.createElement('button');
    let doneButton = document.createElement('button');
    taskItem.textContent = taskText;
    deleteButton.textContent = 'Delete';
    doneButton.textContent = 'Done';
    deleteButton.classList.add('del');
    doneButton.classList.add('done');
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(doneButton);
    list.appendChild(taskItem);
    input.value = '';
    deleteButton.addEventListener('click', () => {
        list.removeChild(taskItem);
    });
    doneButton.addEventListener('click', () => {
        taskItem.style.textDecoration = 'line-through';
        doneButton.disabled = true; 
    });
}
addButton.addEventListener('click', addTask);
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
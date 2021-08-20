// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import updateCompleted from './complete.js';
// console.log(completedTask);

let tasks = [];

if (localStorage.getItem('tasks') === null) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const getData = () => {
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
};
getData();

const orderTasks = () => {
  if (tasks.length > 2) {
    let max = tasks[0].index;
    for (let j = 1; j < tasks.length; j += 1) {
      if (tasks[j].index > max) {
        max = tasks[j].index;
      } else {
        const ali = tasks[j];
        tasks[j] = tasks[j - 1];
        tasks[j - 1] = ali;
      }
    }
  }
};

const generateTasks = () => {
  tasks.forEach((task) => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const squareIcon = document.createElement('input');
    squareIcon.type = 'checkbox';
    // squareIcon.checked = tasks[i].completed;
    const listText = document.createElement('p');
    listText.type = 'text';
    const threeDotIcon = document.createElement('i');

    div1.appendChild(div2);
    div1.appendChild(threeDotIcon);
    div2.appendChild(squareIcon);
    div2.appendChild(listText);

    div1.className = 'list-items';
    div2.className = 'left-items';
    listText.className = 'list-text1';
    squareIcon.className = 'checkbox';
    threeDotIcon.className = 'fas fa-ellipsis-v three-dot-icon';

    document.querySelector('.box').appendChild(div1);
    listText.innerText = task.description;

    // start complete js file //

    if (task.completed === true) {
      listText.classList.add('list-text');
      squareIcon.checked = true;
    } else {
      listText.classList.remove('list-text');
      squareIcon.checked = false;
    }
    squareIcon.addEventListener('change', (event) => {
      updateCompleted(event, task, listText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  });
};
orderTasks();
generateTasks();

// start addRemove js

const addNewTask = () => {
  const inputAdd = document.querySelector('#tasks-text').value;
  let newIndex;
  if (tasks === null) {
    newIndex = 1;
  } else {
    newIndex = tasks.length + 1;
  }
  const task = {
    description: inputAdd,
    index: newIndex,
    completed: false,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return task;
};
const generateOneTask = (task) => {
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const squareIcon = document.createElement('input');
  squareIcon.type = 'checkbox';
  const listText = document.createElement('p');
  listText.type = 'text';
  const threeDotIcon = document.createElement('i');
  div1.appendChild(div2);
  div1.appendChild(threeDotIcon);
  div2.appendChild(squareIcon);
  div2.appendChild(listText);

  div1.className = 'list-items';
  div2.className = 'left-items';
  listText.className = 'list-text1';
  squareIcon.className = 'checkbox';
  threeDotIcon.className = 'fas fa-ellipsis-v three-dot-icon';
  document.querySelector('.box').appendChild(div1);
  listText.innerText = task.description;

  if (task.completed === true) {
    listText.classList.add('list-text');
    squareIcon.checked = true;
  } else {
    listText.classList.remove('list-text');
    squareIcon.checked = false;
  }
  squareIcon.addEventListener('change', (event) => {
    updateCompleted(event, task, listText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
};
const addIcon = document.querySelector('.add-here');
addIcon.addEventListener('click', () => {
  addIcon.style.color = 'blue';
  const getTask = addNewTask();
  localStorage.setItem('tasks', JSON.stringify(tasks));
  generateOneTask(getTask);
});

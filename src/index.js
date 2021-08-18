// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import completedTask from './complete.js';
// console.log(completedTask);

const tasks = [
  {
    description: 'Adding a new item',
    completed: false,
    index: 1,
  },
  {
    description: 'Removing a selected item',
    completed: false,
    index: 7,
  },
  {
    description: 'Reordering a selected item (as drag-and-drop).',
    completed: false,
    index: 2,
  },
  {
    description: 'Marking a selected item as complete.',
    completed: false,
    index: 3,
  },
  {
    description: 'Removing all items marked as complete at once.',
    completed: false,
    index: 4,
  },
];

const orderTasks = () => {
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
};

const saveData = () => {
  const stringifyTasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', stringifyTasks);
};
saveData();

const generateTasks = () => {
  for (let i = 0; i < tasks.length; i += 1) {
    const listItems = document.createElement('div');
    const leftItems = document.createElement('ul');
    const liTextAndIcons = document.createElement('li');
    const squareSpan = document.createElement('span');
    const squareIcon = document.createElement('i');
    // squareIcon.addEventListener('click', () => {
    //   tasks[i].completed = !tasks[i].completed;
    //   return true;
    // });
    const checkIcon = document.createElement('i');
    // checkIcon.addEventListener('click', () => {
    //   tasks[i].completed = !tasks[i].completed;
    //   console.log(tasks[i].completed);
    // });
    const listText = document.createElement('p');
    const threeDotIcon = document.createElement('i');

    listItems.appendChild(leftItems);
    listItems.appendChild(threeDotIcon);
    leftItems.appendChild(liTextAndIcons);
    liTextAndIcons.appendChild(squareSpan);
    liTextAndIcons.appendChild(listText);
    squareSpan.appendChild(squareIcon);
    squareSpan.appendChild(checkIcon);

    listItems.className = 'list-items';
    leftItems.className = 'fa-ul left-items';
    liTextAndIcons.className = 'li-text-and-icons';
    squareSpan.className = 'fa-li square-span';
    squareIcon.className = 'far fa-square square-icon';
    checkIcon.className = 'fas fa-check hidden';
    listText.className = 'list-text';
    threeDotIcon.className = 'fas fa-ellipsis-v three-dot-icon';

    document.querySelector('.box').appendChild(listItems);
    listText.innerText = tasks[i].description;
    orderTasks();

    // start complete js file //

    squareIcon.addEventListener('click', () => {
      tasks[i].completed = !tasks[i].completed;
      squareIcon.style.display = 'none';
      listText.style.textDecoration = 'line-through';
      listText.style.color = 'gray';
      checkIcon.style.display = 'flex';
      saveData();
      // getData();
    });

    checkIcon.addEventListener('click', () => {
      tasks[i].completed = !tasks[i].completed;
      checkIcon.style.display = 'none';
      listText.style.textDecoration = 'none';
      listText.style.color = 'black';
      squareIcon.style.display = 'block';
      saveData();
      // getData();
    });
  }
};
generateTasks();
completedTask();

const getData = () => {
  if (localStorage.getItem('tasks') !== null) {
    // tasks[i].completed = !tasks[i].completed;
    const retrievedTasks = localStorage.getItem('tasks');
    // const convertedTasks =
    JSON.parse(retrievedTasks);
    // tasks = convertedTasks;
    generateTasks();
  } else {
    generateTasks();
  }
};
getData();
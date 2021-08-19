// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import updateCompleted from './complete.js';
// console.log(completedTask);

let tasks = [
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

const generateTasks = () => {
  tasks.forEach((task) => {
    const listItems = document.createElement('div');
    const leftItems = document.createElement('ul');
    const liTextAndIcons = document.createElement('li');
    const squareSpan = document.createElement('span');
    const squareIcon = document.createElement('input');
    squareIcon.type = 'checkbox';
    // squareIcon.checked = tasks[i].completed;
    const listText = document.createElement('p');
    const threeDotIcon = document.createElement('i');

    listItems.appendChild(leftItems);
    listItems.appendChild(threeDotIcon);
    leftItems.appendChild(liTextAndIcons);
    liTextAndIcons.appendChild(squareSpan);
    liTextAndIcons.appendChild(listText);
    squareSpan.appendChild(squareIcon);

    listItems.className = 'list-items';
    leftItems.className = 'fa-ul left-items';
    liTextAndIcons.className = 'li-text-and-icons';
    squareSpan.className = 'fa-li square-span';
    // listText.className = 'list-text';
    squareIcon.className = 'checkbox';
    threeDotIcon.className = 'fas fa-ellipsis-v three-dot-icon';

    document.querySelector('.box').appendChild(listItems);
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

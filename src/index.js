// eslint-disable-next-line no-unused-vars
import _, { indexOf, remove } from 'lodash';
import './style.css';
import updateCompleted from './complete.js';
import updatedIndex from './addremove.js';

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
    const listText = document.createElement('input');
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
    listText.value = task.description;

    // add edit function
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash';
    listText.addEventListener('keyup', () => {
      task.description = listText.value;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    listText.addEventListener('click', () => {
      threeDotIcon.replaceWith(deleteIcon);
    });
    listText.addEventListener('blur', () => {
      setTimeout(() => {
        deleteIcon.replaceWith(threeDotIcon);
      }, 300);
    });

    deleteIcon.addEventListener('click', (event) => {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      const id = task.index - 1;
      tasks = tasks.filter((task, ind) => ind !== id);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      updatedIndex();
      event.target.parentNode.remove();
    });

    // Clear all completed
    const clearSelected = (tasks) => {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks = tasks.filter((task) => !task.completed);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return true;
    };
    const clear = document.querySelector('.complete-text');
    clear.addEventListener('click', () => {
      clearSelected(tasks);
      updatedIndex();
    });

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
  const listText = document.createElement('input');
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
  listText.value = task.description;

  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fas fa-trash';
  listText.addEventListener('keyup', () => {
    task.description = listText.value;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
  listText.addEventListener('click', () => {
    threeDotIcon.replaceWith(deleteIcon);
  });
  listText.addEventListener('blur', () => {
    setTimeout(() => {
      deleteIcon.replaceWith(threeDotIcon);
    }, 300);
  });

  deleteIcon.addEventListener('click', (event) => {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    const id = task.index - 1;
    tasks = tasks.filter((task, ind) => ind !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updatedIndex();
    event.target.parentNode.remove();
  });

  // Clear all completed
  const clearSelected = (tasks) => {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter((task) => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return true;
  };
  const clear = document.querySelector('.complete-text');
  clear.addEventListener('click', () => {
    clearSelected(tasks);
    updatedIndex();
  });

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
  const getTask = addNewTask();
  generateOneTask(getTask);
});
document.querySelector('.input-add').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const getTask = addNewTask();
    generateOneTask(getTask);
  }
});
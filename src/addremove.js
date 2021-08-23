let tasks = [];

const updatedIndex = () => {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// clear function
const clearSelected = (tasks) => {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter((task) => !task.completed);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return true;
};

export {
  updatedIndex,
  clearSelected,
};
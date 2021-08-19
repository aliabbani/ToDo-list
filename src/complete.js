function updateCompleted(event, task, listText) {
  if (event.target.checked === true) {
    task.completed = true;
    listText.classList.add('list-text');
    // console.log(event.checked);
  } else {
    task.completed = false;
    listText.classList.remove('list-text');
    // console.log(event.checked);
  }
  // tasks[i].completed = !tasks[i].completed;
}

export default updateCompleted;

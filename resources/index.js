// UPDATE LOCAL STORAGE ---------
function dataObjectUpdate() {
  localStorage.setItem('todoList', JSON.stringify(data))
}

// data = localStorage set by previous session or else empty
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: []
};

// -------------------------------
// INPUT BOX ---------------------
const inputBox = document.getElementById('matter');

// SVG CODE FROM FONTWESOME-------
const checkSVG = '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>';
const trashSVG = '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M704 736v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm128 724v-948h-896v948q0 22 7 40.5t14.5 27 10.5 8.5h832q3 0 10.5-8.5t14.5-27 7-40.5zm-672-1076h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"/></svg>';

// BUTTONS -----------------------
const addButton = document.getElementById('add');
// -------------------------------
// FUNCTIONS ---------------------
renderTodoList()

// RENDER LOCAL STORAGE ONLOAD ---
function renderTodoList() {
  var todoLength = data.todo.length
  var completedLength = data.completed.length

  if (!todoLength && !completedLength) return //if both are empty, don't render

  for (j = 0; j < todoLength; j++) {
    var value = data.todo[j]
    addTodoItem(value)
  }

  for (c = 0; c < completedLength; c++) {
    var value = data.completed[c]
    addTodoItem(value, true)
  }
}


// -------------------------------
// ADDING AN ITEM (1) ------------
function addItem() {
  var text = inputBox.value
  if (text) {
    addTodoItem(text)
    inputBox.value = ""

    data.todo.push(text) // push to data
  }
  dataObjectUpdate()
}

// -------------------------------
// ADDING AN ITEM TO THE LIST (2)-
function addTodoItem(value, completed) {

  var list = (completed) ? document.getElementById('completed') : document.getElementById('todo')

  var li = document.createElement('li')
  li.innerText = value

  var removeButton = document.createElement('button')
  removeButton.classList.add('trash-btn')
  removeButton.innerHTML = trashSVG

  var completeButton = document.createElement('button')
  completeButton.classList.add('check-btn')
  completeButton.innerHTML = checkSVG

  li.appendChild(removeButton)
  li.prepend(completeButton)

  list.insertBefore(li, list.childNodes[0])

  // Add event for removing item
  completeButton.addEventListener('click', completeItem);
  removeButton.addEventListener('click', removeItem);

  if (completed) addStrikeLine(li, 'completed', true)
}

// ------------------------------
// STRIKE LINE ------------------
function addStrikeLine(item, id, init) {
  var strikeLine = document.createElement('div')
  strikeLine.classList.add('strike-line')

  // if it comes from initialisation of Local storage
  if (init) { 
    item.appendChild(strikeLine)
  } else {
    var line = item.querySelector('.strike-line')

    if (id === 'todo') {
      item.appendChild(strikeLine)
    } else {
      item.removeChild(line)
    }
  }
}

// -------------------------------
// COMPLETING AN ITEM ------------
function completeItem() {
  var liToBeCompleted = this.parentNode
  var parent = liToBeCompleted.parentNode
  var id = parent.id
  var value = liToBeCompleted.innerText
  var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo')

  if (id === 'todo') { // parent id = "todo"
    addStrikeLine(liToBeCompleted, id)
    data.todo.splice(data.todo.indexOf(value), 1) // push to data
    data.completed.push(value)
  } else { // parent id = "completed"
    addStrikeLine(liToBeCompleted, id)
    data.completed.splice(data.completed.indexOf(value), 1) // push to data
    data.todo.push(value)
  }

  parent.removeChild(liToBeCompleted)
  target.prepend(liToBeCompleted)

  dataObjectUpdate()

}

// -------------------------------
// REMOVING AN ITEM --------------
function removeItem() {
  var liToBeRemoved = this.parentNode
  var parent = liToBeRemoved.parentNode
  var id = parent.id
  var value = liToBeRemoved.innerText

  if (id === 'todo') { // parent id = "todo"
    data.todo.splice(data.todo.indexOf(value), 1) // push to data
  } else { // parent id = "completed"
    data.completed.splice(data.completed.indexOf(value), 1) // push to data
  }

  parent.removeChild(liToBeRemoved)

  dataObjectUpdate()
}

// -------------------------------
// // EVENT HANDLERS ----------------
addButton.addEventListener('click', addItem);

inputBox.addEventListener("keyup", function (event) {
  event.preventDefault();

  if (event.keyCode === 13) {
    addButton.click();
  }
});

// -------------------------------
// -------------------------------
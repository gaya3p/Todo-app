// data = localStorage set by previous session or else empty
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: []
};

// -------------------------------
// INPUT BOX ---------------------
const inputBox = document.getElementById('matter');

// SVG CODE FROM FONTWESOME-------
const checkSVG = '<i class="fas fa-check-circle"></i>';
const trashSVG = '<i class="fas fa-trash-alt"></i>';

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

// UPDATE LOCAL STORAGE ---------
function dataObjectUpdate() {
  localStorage.setItem('todoList', JSON.stringify(data))
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

}



// -------------------------------
// COMPLETING AN ITEM ------------
function completeItem() {
  var liToBeCompleted = this.parentNode
  var parent = liToBeCompleted.parentNode
  var id = parent.id
  var value = liToBeCompleted.innerText
  var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo')

  var strikeLine = document.createElement('div')
  strikeLine.classList.add('strike-line')

  if (id === 'todo') { // parent id = "todo"
    liToBeCompleted.appendChild(strikeLine)

    data.todo.splice(data.todo.indexOf(value), 1) // push to data
    data.completed.push(value)

  } else { // parent id = "completed"
    var removedChild = liToBeCompleted.querySelector('.strike-line')
    liToBeCompleted.removeChild(removedChild)

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
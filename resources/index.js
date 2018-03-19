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


// -------------------------------
// REMOVING AN ITEM --------------
function removeItem() {
  var liToBeRemoved = this.parentNode
  var parent = liToBeRemoved.parentNode

  parent.removeChild(liToBeRemoved)
}

// -------------------------------
// COMPLETING AN ITEM ------------
function completeItem() {
  var liToBeCompleted = this.parentNode
  var parent = liToBeCompleted.parentNode
  var id = parent.id

  var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo')

  var strikeLine = document.createElement('div')
  strikeLine.classList.add('strike-line')

  console.log(target.id)

  if (target.id === 'completed') {
    liToBeCompleted.appendChild(strikeLine)
  } else if (target.id === 'todo') {
    var removedChild = liToBeCompleted.querySelector('.strike-line')
    liToBeCompleted.removeChild(removedChild)
  }

  parent.removeChild(liToBeCompleted)
  target.prepend(liToBeCompleted)

}



// -------------------------------
// ADDING AN ITEM TO THE LIST ----
const addTodoItem = (value) => {

  var list = document.getElementById('todo')

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
// ADDING AN ITEM STEP 1 ---------
const addItem = _ => {
  var text = inputBox.value
  if (text) addTodoItem(text)
  inputBox.value = ""
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
import { arr, categoryList, inputState } from './arrays.js'

export function showTasks() {
  let taskContainer = document.getElementById("tasks")
  taskContainer.innerHTML = ""
  for (const task of arr) {
    if (!task.isArchived) {
      let item = createTaskNode(task.name, task.created, task.category, task.content, task.dates, task.iconTask)
      taskContainer.append(item)
    }
  }
  createIcons()
  let infoContainer = document.getElementById("info-container")
  infoContainer.innerHTML = ""
  for (const item of categoryList) {
    infoContainer.insertAdjacentHTML('beforeend',
      '<div class="item">'
      + '<div class="note-category">' + item + '</div>'
      + '<div class="active">' + arr.filter(el => el.isArchived === false && el.category == item).length + '</div>'
      + '<div class="archived">' + arr.filter(el => el.isArchived === true && el.category == item).length + '</div>'
      + '</div>'
      + '</div>'
    )
  }
}

export function showArhivedTasks(where) {
  document.getElementById("popup").style.display = ""
  let el = document.getElementById("tasks-popup")
  el.innerHTML = ""
  for (const task of arr) {
    if (task.isArchived) {
      let item = createTaskNode(task.name, task.created, task.category, task.content, task.dates, task.iconTask)
      el.append(item)
    }
  }
  createIcons(where)
}

function createTaskNode(name, created, category, content, dates, iconTask) {
  let item = document.createElement('div');
  item.className = 'item'
  item.innerHTML = '<div class="name">'
    + '<div class="icon-task-name-blok">'
    + '<img class="icon-task invert" src="./icon/' + iconTask + '" alt="error">'
    + '</div><span>' + name + '</span></div>'
    + '<div class="created"><span>' + created + '</span></div>'
    + '<div class="category"><span>' + category + '</span></div>'
    + '<div class="content"><span>' + content + '</span></div>'
    + '<div class="dates"><span>' + dates + '</span></div>'
    + '<div class="icon-task-blok">'
    + '</div>'
    + '</div>'
  return item
}

function createIcons(where = "") {
  if (where == "popup") {
    let icon = document.getElementById("tasks-popup").getElementsByClassName("icon-task-blok")
    for (var i = 0; i < icon.length; i++) {
      let unarchive = '<img class="icon-unarchive" src="./icon/unarchive.png" alt="error">'
      icon[i].insertAdjacentHTML("beforeend", unarchive)
      icon[i].childNodes[0].addEventListener('click', (e) => unarchiveTask(e))
    }
  } else {
    let iconBlok = document.getElementsByClassName("icon-task-blok")
    for (var i = 0; i < iconBlok.length; i++) {
      let edit = '<img class="icon-edit" src="./icon/edit2.png" alt="error">'
      iconBlok[i].insertAdjacentHTML("beforeend", edit)
      iconBlok[i].childNodes[0].addEventListener('click', (e) => showInputField(e))

      let archive = '<img class="icon-archive" src="./icon/archive2.png" alt="error">'
      iconBlok[i].insertAdjacentHTML("beforeend", archive)
      iconBlok[i].childNodes[1].addEventListener('click', (e) => archiveTask(e))

      let del = '<img class="icon-delete" src="./icon/delete2.png" alt="error">'
      iconBlok[i].insertAdjacentHTML("beforeend", del)
      iconBlok[i].childNodes[2].addEventListener('click', (e) => deleteTask(e))
    }
  }
}


export function showInputField( e, nameValue = "", categoryValue = "", contentValue = "",) {
  console.log(inputState)
  if (!inputState) {
    let item = document.createElement('div');
    item.id = 'input-form'
    item.innerHTML = '<input id="name-input" placeholder="Name"></input>'
      + '<div class="created"></div>'
      + '<select id="category-list" name="category">'
      + '<option disabled selected>Choose category</option>'
      + '</select>'
      + '<input id="content-input" placeholder="Content"></input>'

    document.getElementById("button-create-task").parentNode
      .insertBefore(item, document.getElementById("button-create-task"))

    for (let i = 0; i < categoryList.length; i++) {
      document.getElementById("category-list")
        .insertAdjacentHTML('beforeend', '<option value="' + categoryList[i] + '">' + categoryList[i] + '</option>');
    }
    if (e.target.className == "icon-edit") {
      console.log("if")
      who = e.target.className
      let parent = e.target.parentNode.parentNode
      let indexItem = arr.map(el => el = el.content)
        .indexOf(parent.getElementsByClassName("content")[0].childNodes[0].innerText)
      nameValue = document.getElementById("name-input").value = arr[indexItem].name
      categoryValue = document.getElementById("category-list").value = arr[indexItem].category
      contentValue = document.getElementById("content-input").value = arr[indexItem].content
    } else {
      // who = "button-create-task"
      console.log("else")
      // who = e.target.id
    }

    document.getElementById("name-input").addEventListener("input", e => nameValue = e.target.value)
    document.getElementById("category-list").addEventListener("input", e => categoryValue = e.target.value)
    document.getElementById("content-input").addEventListener("input", e => contentValue = e.target.value)
    inputState = !inputState
  console.log(inputState)

  } else {
    writeData(arr, categoryList, inputState, who, nameValue, categoryValue, contentValue)
  }
}

export function deleteTask(e) {
  let parent = e.target.parentNode.parentNode
  arr.splice(arr.map(el => el = el.content)
    .indexOf(parent.getElementsByClassName("content")[0].childNodes[0].innerText), 1)
  showTasks()
}

export function deleteAllTasks() {
  arr.splice(0)
  showTasks()
}


// function writeData(arr, categoryList, inputState, who, nameValue, categoryValue, contentValue) {
//   if (nameValue != "" && categoryValue != "" && contentValue != "") {
//     console.log(who, nameValue, categoryValue, contentValue)
//     switch (who) {
//       case "button-create-task":
//         arr.push(new NewTaskObj(nameValue, categoryValue, contentValue))
//         break
//       case "icon-edit":
//         arr[indexItem].name = nameValue
//         arr[indexItem].category = categoryValue
//         arr[indexItem].content = contentValue
//         if (contentValue.match(regex) !== null) {
//           arr[indexItem].dates = contentValue.match(regex)
//         }
//         break
//       default:
//         return
//     }
//     // nameValue = ""
//     // categoryValue = ""
//     // contentValue = ""
//     document.getElementById('input-form').parentNode.removeChild(document.getElementById("input-form"));
//     showTasks(arr, categoryList, inputState, e)
//     showInfo(arr, categoryList)
//     inputState = !inputState
//   }
// }


function archiveTask(e) {
  let parent = e.target.parentNode.parentNode
  let indexItem = arr.map(el => el = el.content)
    .indexOf(parent.getElementsByClassName("content")[0].childNodes[0].innerText)
  arr[indexItem].isArchived = true
  showTasks()
}

function unarchiveTask(e) {
  let parent = e.target.parentNode.parentNode
  let indexItem = arr.map(el => el = el.content)
    .indexOf(parent.getElementsByClassName("content")[0].childNodes[0].innerText)
  arr[indexItem].isArchived = false
  showArhivedTasks("popup")
}
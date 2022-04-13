import { arr, categoryList, obj, regex } from './data.js'

class NewTaskObj {
  constructor(name, category, content) {
    this.name = name,
      this.created = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      this.category = category,
      this.content = content,
      this.dates = this.content.match(regex) != null ? this.content.match(regex) : "",
      this.isArchived = false,
      this.iconTask = (function () {
        let iconTask = ""
        switch (category) {
          case "Task":
            iconTask = "shopping-cart.png"
            break
          case "Random Thought":
            iconTask = "lateral.png"
            break
          case "Idea":
            iconTask = "idea.png"
            break
          default:
            iconTask = "shopping-cart.png"
            break
        }
        return iconTask
      }())
  }
  
}

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

export function showInputField(e) {
  if (!obj.inputState) {
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
      obj.who = e.target.className
      let parent = e.target.parentNode.parentNode
      obj.indexItem = arr.map(el => el = el.content)
        .indexOf(parent.getElementsByClassName("content")[0].childNodes[0].innerText)
      obj.nameValue = document.getElementById("name-input").value = arr[obj.indexItem].name
      obj.categoryValue = document.getElementById("category-list").value = arr[obj.indexItem].category
      obj.contentValue = document.getElementById("content-input").value = arr[obj.indexItem].content
    }
    obj.who = e.target.className
    document.getElementById("name-input").addEventListener("input", e => obj.nameValue = e.target.value)
    document.getElementById("category-list").addEventListener("input", e => obj.categoryValue = e.target.value)
    document.getElementById("content-input").addEventListener("input", e => obj.contentValue = e.target.value)
    obj.inputState = !obj.inputState
  } else {
    writeData(obj.inputState, obj.who, obj.nameValue, obj.categoryValue, obj.contentValue)
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

function writeData(inputState, who, nameValue, categoryValue, contentValue) {
  try {
    if (nameValue != "" && categoryValue != "" && contentValue != "") {
      switch (who) {
        case "button-create-task":
          arr.push(new NewTaskObj(nameValue, categoryValue, contentValue))
          break
        case "icon-edit":
          arr[obj.indexItem].name = nameValue
          arr[obj.indexItem].category = categoryValue
          arr[obj.indexItem].content = contentValue
          if (contentValue.match(regex) !== null) {
            arr[obj.indexItem].dates = contentValue.match(regex)
          }
          break
        default:
          return
      }
      document.getElementById('input-form').parentNode.removeChild(document.getElementById("input-form"));
      showTasks()
      obj.inputState = !inputState
    }
  } catch (error) {
    console.log("Have a problem with write data\n", error)
  }
}

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
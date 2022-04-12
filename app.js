window.onload = function () {
  let arr = [{
    "iconTask": "lateral.png",
    "name": "test1",
    "created": "April 8, 2022",
    "category": "Idea",
    "content": "text1",
    "dates": "",
    "isArchived": false
  },
  {
    "iconTask": "idea.png",
    "name": "test2",
    "created": "June 13, 2021",
    "category": "Random Thought",
    "content": "text2",
    "dates": "",
    "isArchived": true
  },
  {
    "iconTask": "shopping-cart.png",
    "name": "test3",
    "created": "May 18, 2020",
    "category": "Idea",
    "content": "text3",
    "dates": "",
    "isArchived": false
  },
  {
    "iconTask": "idea.png",
    "name": "test4",
    "created": "July 22, 2021",
    "category": "Task",
    "content": "text4",
    "dates": "",
    "isArchived": true
  },
  {
    "iconTask": "idea.png",
    "name": "test5",
    "created": "April 8, 2022",
    "category": "Task",
    "content": "text5",
    "dates": "",
    "isArchived": false
  },
  {
    "iconTask": "idea.png",
    "name": "test6",
    "created": "May 18, 2020",
    "category": "Random Thought",
    "content": "text6",
    "dates": "",
    "isArchived": true
  },
  {
    "iconTask": "idea.png",
    "name": "test7",
    "created": "July 22, 2021",
    "category": "Idea",
    "content": "text7",
    "dates": "",
    "isArchived": true
  }]

  const categoryList = ["Task", "Random Thought", "Idea"]
  let inputState = false
  let who = ""
  let indexItem = ""
  let nameValue = ""
  let categoryValue = ""
  let contentValue = ""

  showTasks(arr)
  showInfo(arr)
  document.getElementById("button-create-task").addEventListener("click", e => showInputField(e))
  document.getElementById("icon-archive-header").addEventListener("click", e => showArhivedTasks(arr, e.target.id))
  document.getElementById("icon-delete-header").addEventListener("click", deleteAllTasks)
  document.getElementById("cancel").addEventListener("click", e => {
    document.getElementById("popup").style.display = "none"
    showTasks(arr)
    showInfo(arr)
  })

  let regex = /(3[01]|[12][0-9]|0?[1-9])[\/.-](1[0-2]|0?[1-9])[\/.-](?:[0-9]{2})?[0-9]{2}/gm

  class NewTaskObj {
    constructor(name, category, content) {
      this.name = name,
        this.created = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        this.category = category,
        this.content = content,
        // this.dates = dates,
        this.dates = this.content.match(regex)!=null ? this.content.match(regex):"",
        this.isArchived = false
    }
  }


  function showTasks(tasks, e) {
    let el = document.getElementById("tasks")
    el.innerHTML = ""
    for (const task of tasks) {
      if (!task.isArchived) {
        let item = createTaskNode(task.name, task.created, task.category, task.content, task.dates, e)
        el.append(item)
      }
    }
    createIcons()
  }


  function showInfo(arr) {
    let el = document.getElementById("info-container")
    el.innerHTML = ""
    for (const item of categoryList) {
      el.insertAdjacentHTML('beforeend',
        '<div class="item">'
        + '<div class="note-category">' + item + '</div>'
        + '<div class="active">' + arr.filter(el => el.isArchived === false && el.category == item).length + '</div>'
        + '<div class="archived">' + arr.filter(el => el.isArchived === true && el.category == item).length + '</div>'
        + '</div>'
        + '</div>'
      )
    }
  }


  function createTaskNode(name, created, category, content, dates, e) {
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


  function createIcons(arg) {

    if (arg && (arg == "icon-archive-header" || arg == "icon-unarchive")) {
      // console.log(e.target.id)
      // console.log(e.target.className)
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


  function showInputField(e) {
    // let who = "button-create-task"
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
        who = e.target.className
        let parent = e.target.parentNode.parentNode
        indexItem = arr.map(el => el = el.content)
          .indexOf(parent.getElementsByClassName("content")[0].childNodes[0].innerText)
        nameValue = document.getElementById("name-input").value = arr[indexItem].name
        categoryValue = document.getElementById("category-list").value = arr[indexItem].category
        contentValue = document.getElementById("content-input").value = arr[indexItem].content
      } else {
        who = "button-create-task"
      }
      document.getElementById("name-input").addEventListener("input", e => nameValue = e.target.value)
      document.getElementById("category-list").addEventListener("input", e => categoryValue = e.target.value)
      document.getElementById("content-input").addEventListener("input", e => contentValue = e.target.value)
      inputState = !inputState
    } else {
      writeData(who)
    }
  }


  function writeData(who) {
    if (nameValue != "" && categoryValue != "" && contentValue != "") {
      switch (who) {
        case "button-create-task":
          arr.push(new NewTaskObj(nameValue, categoryValue, contentValue))
          break
        case "icon-edit":
          arr[indexItem].name = nameValue
          arr[indexItem].category = categoryValue
          arr[indexItem].content = contentValue
          if (contentValue.match(regex) !== null){
            arr[indexItem].dates = contentValue.match(regex)
          }
          break
        default:
          return
      }
      nameValue = ""
      categoryValue = ""
      contentValue = ""
      document.getElementById('input-form').parentNode.removeChild(document.getElementById("input-form"));
      showTasks(arr)
      showInfo(arr)
      inputState = !inputState
    }
  }


  function archiveTask(e) {
    let parent = e.target.parentNode.parentNode
    indexItem = arr.map(el => el = el.content)
      .indexOf(parent.getElementsByClassName("content")[0].childNodes[0].innerText)
    arr[indexItem].isArchived = true
    showTasks(arr)
    showInfo(arr)
  }


  function deleteTask(e) {
    let parent = e.target.parentNode.parentNode
    arr.splice(arr.map(el => el = el.content)
      .indexOf(parent.getElementsByClassName("content")[0].childNodes[0].innerText), 1)
    showTasks(arr)
    showInfo(arr)
  }


  function showArhivedTasks(arr, arg) {
    document.getElementById("popup").style.display = ""
    let el = document.getElementById("tasks-popup")
    el.innerHTML = ""
    for (const task of arr) {
      if (task.isArchived) {
        let item = createTaskNode(task.name, task.created, task.category, task.content, task.dates)
        el.append(item)
      }
    }
    createIcons(arg)
  }


  function deleteAllTasks() {
    console.log("deleteAllTasks")
    arr = []
    showTasks(arr)
    showInfo(arr)
  }


  function unarchiveTask(e) {
    let parent = e.target.parentNode.parentNode
    indexItem = arr.map(el => el = el.content)
      .indexOf(parent.getElementsByClassName("content")[0].childNodes[0].innerText)
    arr[indexItem].isArchived = false
    showArhivedTasks(arr, e.target.className)
    // showTasks(arr)
    // showInfo(arr)
  }

};
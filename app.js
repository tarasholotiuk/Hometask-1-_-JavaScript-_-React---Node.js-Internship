import { showTasks, showInputField, showArhivedTasks, deleteAllTasks } from './functions.js'
// import { arr, categoryList } from './arrays.js'

window.onload = function () {

  showTasks()

  document.getElementById("button-create-task").addEventListener("click", e => showInputField(e))
  document.getElementById("icon-archive-header").addEventListener("click", () => showArhivedTasks("popup"))
  document.getElementById("icon-delete-header").addEventListener("click", e => deleteAllTasks(e))
  document.getElementById("cancel").addEventListener("click", e => {
    document.getElementById("popup").style.display = "none"
    showTasks()
  })

  let regex = /(3[01]|[12][0-9]|0?[1-9])[\/.-](1[0-2]|0?[1-9])[\/.-](?:[0-9]{2})?[0-9]{2}/gm

  class NewTaskObj {
    constructor(name, category, content) {
      this.name = name,
        this.created = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        this.category = category,
        this.content = content,
        this.dates = this.content.match(regex) != null ? this.content.match(regex) : "",
        this.isArchived = false,
        this.icon = function () {
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
        }
    }
  }




};
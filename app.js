import { showTasks, showInputField, showArhivedTasks, deleteAllTasks } from './functions.js'

window.onload = function () {

  showTasks()

  document.getElementById("button-create-task").addEventListener("click", e => showInputField(e))
  document.getElementById("icon-archive-header").addEventListener("click", () => showArhivedTasks("popup"))
  document.getElementById("icon-delete-header").addEventListener("click", e => deleteAllTasks(e))
  document.getElementById("cancel").addEventListener("click", e => {
    document.getElementById("popup").style.display = "none"
    showTasks()
  })

};
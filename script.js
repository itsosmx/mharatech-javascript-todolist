let input = document.getElementById("input");
let todo = document.getElementById("todo-list");
let done = document.getElementById("done-list");
let data = [];

function AddTask(value = null, list = null) {
  if (value == null && input.value?.trim() == "") return;
  let container = document.createElement("li");
  let text = document.createElement("p");
  let editAction = document.createElement("button");
  let removeAction = document.createElement("button");
  let doneAction = document.createElement("button");
  let actions = document.createElement("div");

  let id = new Date().getTime() + Math.round(Math.random());
  let textValue = input.value;
  let status = false;

  if (value) {
    textValue = value?.text;
    id = value?.id;
    status = value?.status;
  }

  let obj = {
    id,
    text: textValue,
    status
  };

  text.innerHTML = textValue;

  editAction.innerHTML = "Edit";
  removeAction.innerHTML = "Remove";
  doneAction.innerHTML = "Done";


  editAction.addEventListener("click", () => Edit(obj));
  removeAction.addEventListener("click", () => Remove(obj));
  doneAction.addEventListener("click", () => Done(obj));

  actions.appendChild(editAction);
  actions.appendChild(removeAction);
  if (!status) actions.appendChild(doneAction);

  container.appendChild(text);
  container.appendChild(actions);


  container.classList.add("item");
  if (!list) todo.appendChild(container);
  else list.appendChild(container);

  if (!value) {
    data.push(obj);
    localStorage.setItem("todo", JSON.stringify(data));
  }
  document.getElementById("input").value = "";
}

function LoadTask() {
  data = [];
  todo.innerHTML = "";
  done.innerHTML = "";
  data = JSON.parse(localStorage.getItem("todo")) || [];
  if (data) {
    data.forEach((item) => {
      if (!item.status) AddTask(item);
      else AddTask(item, done);
    });
  }
}

function Remove(item) {
  data = data.filter((x) => x.id != item.id);
  localStorage.setItem("todo", JSON.stringify(data));
  LoadTask();
}

function Edit(item) {
  let index = data.findIndex((x) => x.id == item.id);
  data[index].text = prompt("Edit task", data[index].text);
  localStorage.setItem("todo", JSON.stringify(data));
  LoadTask();
}

function Done(item) {
  let index = data.findIndex((x) => x.id == item.id);
  data[index].status = true;
  localStorage.setItem("todo", JSON.stringify(data));
  LoadTask();
}


LoadTask();
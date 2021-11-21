//All element's
const form = document.querySelector(".todo-form");
const todoinput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-container");
const containers = document.querySelector(".container");
const tododelete = document.querySelector("todo-del");

eventListeners();

// All eventListener's
function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodoUI);
    todoList.addEventListener("click", deleteTodo);
}

function addTodo(e){
    const newTodo = todoinput.value.trim();
    
    if(newTodo ===""){
        showAlert("alert-danger", "Bir todo ekleyin!");
    }
    else{
        showAlert("alert-success", "Başarıyla eklendi!");
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
    }
    
     e.preventDefault();
}


function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className=`alert ${type}`; 
    alert.textContent = message;
    
    form.appendChild(alert);
    
    //setTimeout
    setTimeout(function(){
        alert.remove();
    },1000);
}


//Write the string value in page
function addTodoToUI(e){

    const listItem = document.createElement("div");
    listItem.className="todo";

    const todoLeft = document.createElement("div");
    todoLeft.className="todo-left";
    listItem.appendChild(todoLeft);

    const checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="todo-cb";
    todoLeft.appendChild(checkbox);

    const textArea = document.createElement("span");
    textArea.className="todo-text";
    todoLeft.appendChild(textArea);

    textArea.appendChild(document.createTextNode(e));
    
    const todoRight = document.createElement("div");
    todoRight.className ="todo-right";
    listItem.appendChild(todoRight);

    const delBtn = document.createElement("i");
    delBtn.className="fas fa-trash-alt todo-del";   
    todoRight.appendChild(delBtn);
    
    //Add todo
    todoList.appendChild(listItem);

    todoinput.value="";
}

function getTodoStorage(newTodo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodoStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodoUI(){ //Printing from local storage to ui
    let todos = getTodoStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    });

}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodoStorage();

    todos.forEach(function(todo, index){
        if(todo === deletetodo){
            todos.splice(index,1); //Deleting value from Array
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


function deleteTodo(e){

    if(e.target.className === "fas fa-trash-alt todo-del"){

        e.target.parentElement.parentElement.remove();
        showAlert("alert-success", "Silme işlemi tamamlandı!");
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }

}

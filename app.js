const todoInput = document.querySelector("#todo-input");
const todoButton = document.querySelector("#todo-button");
const todoList = document.querySelector("#todo-list");



//ページをリロードするごとにローカルストレージからtodoListを作成する
document.addEventListener('DOMContentLoaded',loadTodos);

let todos =[]

//ローカルストレージに保存する関数
function saveTodosTolocalStorage(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}

//ローカルストレージからtodos配列を取り出し、返す関数
function getTodosFromLocalStorage(){
    const todos = JSON.parse(localStorage.getItem("todos"));
    return todos ===null ? [] : todos;
}

//ローカルストレージから取り出したtodos配列からtodoListを作成
function loadTodos(){
    todos = getTodosFromLocalStorage();
    todos.forEach(function(todo){
        createTodoList(todo.text,todo.completed);
    })
}


//todoListを作成
function createTodoList(todoText, todoCompleted){
        const newTodo = document.createElement("li");

        const todoTitle = document.createElement("span");
        todoTitle.textContent = todoText;

        //完了ボタンを作成
        const completeButton =  document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.classList.add("complete-btn");

        //削除ボタンを作成
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        //newTodoにボタンを追加
        newTodo.appendChild(todoTitle);
        newTodo.appendChild(completeButton);
        newTodo.appendChild(deleteButton);

        //todoリストにtodoを追加
        todoList.appendChild(newTodo);

        if(todoCompleted){
            newTodo.classList.add("completed");
        }

        return newTodo;


};

//タスク名を入力し、addボタンを押すとタスクを追加する処理
todoButton.addEventListener("click",function(event){
    event.preventDefault();
    if (todoInput.value !==''){

        createTodoList(todoInput.value,false)
        //todoをローカルストレージに保存
        todos.push({text:todoInput.value,completed:false});
        console.log(todos)
        saveTodosTolocalStorage(todos);
        todoInput.value='';
    }
})

//完了ボタン、削除ボタンを押した時の処理
todoList.addEventListener("click",function(event){
        const todoItem = event.target.parentElement;//押されたtodoの親要素<li>を取得

        todoItem.classList.toggle("completed");//親要素がcompletedを持っていなければ追加、持っていれば削除
        const todoName = todoItem.querySelector("span").textContent
        const todoIndex = todos.findIndex(todos => todos.text===todoName);

    if (event.target.classList.contains('complete-btn')){
    
       
        todos[todoIndex].completed = todoItem.classList.contains("completed");
        console.log(todos);
        
        saveTodosTolocalStorage(todos);

    }else if(event.target.classList.contains('delete-btn')){
        
        todos = todos.filter(todo => todo.text != todoName);
        event.target.parentElement.remove();
        console.log(todos)
        saveTodosTolocalStorage(todos)
        
    }
});





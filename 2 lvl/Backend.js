    const searchInput = document.getElementById('search');
    const statusSelect = document.getElementById("status");
    const modal = document.getElementById("modal");
    const count = document.getElementById("count");

    let todos = [];
    let users = [];
async function API() {
    const MainUser=await fetch('https://jsonplaceholder.typicode.com/users')
    users=await MainUser.json()

    const MainTodo=await fetch('https://jsonplaceholder.typicode.com/todos')
    todos=await MainTodo.json()
    
    Tasks()
}

function Tasks(){

    const search = searchInput.value.toLowerCase();
    const status = statusSelect.value;
    const ListOfTodos=document.getElementById('tasks')
    const filtered = todos.filter(todo => {
    const matchSearch = todo.title.toLowerCase().includes(search);
    const matchStatus =
      status === "all" ||
      (status === "completed" && todo.completed) ||
      (status === "not_completed" && !todo.completed);

    return matchSearch && matchStatus;
  });
    
    if (filtered.length === 0) {
    ListOfTodos.innerHTML = "Ничего не найдено";
    return;
  }

  count.innerText = `Найдено: ${filtered.length}`;
    ListOfTodos.innerHTML = filtered.map(todo => `
    <div class="task" onclick="openModal(${todo.id})">
      <h3>${todo.title}</h3>
      <p>${todo.completed ? "✅" : "❌"}</p>
      <p>User: ${todo.userId}</p>
    </div>
  `).join("");
}

function openModal(id) {
  const modal = document.getElementById("modal");

  const task = todos.find(t => t.id === id);
  const user = users.find(u => u.id === task.userId);

  modal.classList.remove("hidden");

  modal.innerHTML = `
    <div class="modal-content">
      <button onclick="closeModal()">❌</button>

      <h2>${task.title}</h2>

      <p><b>ID:</b> ${task.id}</p>
      <p><b>Status:</b> ${task.completed ? "✅" : "❌"}</p>
      <p><b>User ID:</b> ${task.userId}</p>

      <hr>

      <p><b>Name:</b> ${user.name}</p>
      <p><b>Email:</b> ${user.email}</p>
    </div>
  `;
}
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
}
searchInput.addEventListener("input", Tasks);
statusSelect.addEventListener("change", Tasks);
API()
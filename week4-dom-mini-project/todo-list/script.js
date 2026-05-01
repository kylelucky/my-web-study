let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const todoInput  = document.getElementById('todoInput');
const addBtn     = document.getElementById('addBtn');
const todoList   = document.getElementById('todoList');
const remaining  = document.getElementById('remaining');
const clearBtn   = document.getElementById('clearBtn');

function setTodayDate() {
    document.getElementById('today').textContent =
        new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
}

function saveTodos() { localStorage.setItem('todos', JSON.stringify(todos)); }

function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    todos.unshift({ id: Date.now(), text, completed: false });
    saveTodos(); renderTodos(); todoInput.value = ''; todoInput.focus();
}

function toggleTodo(id) {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTodos(); renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos(); renderTodos();
}

function renderTodos() {
    const filtered = todos.filter(t =>
        currentFilter === 'active'    ? !t.completed :
        currentFilter === 'completed' ?  t.completed : true
    );
    remaining.textContent = `${todos.filter(t => !t.completed).length}개 남음`;
    if (filtered.length === 0) { todoList.innerHTML = '<li class="empty-state">할 일이 없습니다 🎉</li>'; return; }
    todoList.innerHTML = filtered.map(t => `
        <li class="todo-item ${t.completed ? 'completed' : ''}" data-id="${t.id}">
            <div class="todo-checkbox" data-action="toggle">${t.completed ? '✓' : ''}</div>
            <span class="todo-text">${escapeHtml(t.text)}</span>
            <button class="delete-btn" data-action="delete">✕</button>
        </li>`).join('');
}

todoList.addEventListener('click', e => {
    const item = e.target.closest('.todo-item');
    if (!item) return;
    const id = Number(item.dataset.id);
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'toggle') toggleTodo(id);
    if (action === 'delete') deleteTodo(id);
});

document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); renderTodos();
}));

addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', () => { todos = todos.filter(t => !t.completed); saveTodos(); renderTodos(); });
todoInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });

setTodayDate(); renderTodos();

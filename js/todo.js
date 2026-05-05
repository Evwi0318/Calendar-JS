// All todos are stored in this array
// Each todo looks like: { text: "Buy milk", date: "2026-05-10" }
const todos = [];

export function initTodos() {
    const form = document.getElementById('todo-form');

    form.addEventListener('submit', function (event) {
        // Stop the page from reloading on submit
        event.preventDefault();

        const text = document.getElementById('todo-input').value.trim();
        const date = document.getElementById('todo-date').value;

        if (text === '' || date === '') return;

        addTodo(text, date);

        // Clear the form after adding
        form.reset();
    });
}

function addTodo(text, date) {
    // Add the new todo to the array
    todos.push({ text, date });

    renderTodoList();
}

function renderTodoList() {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';

    if (todos.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'todo-empty';
        empty.textContent = 'Inga todos ännu. Lägg till en uppgift!';
        list.appendChild(empty);
        return;
    }

    todos.forEach(function (todo, index) {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const textSpan = document.createElement('span');
        textSpan.className = 'todo-item-text';
        textSpan.textContent = todo.text;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'todo-item-date';
        dateSpan.textContent = formatDate(todo.date);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-delete-btn';
        deleteBtn.textContent = '✕';
        deleteBtn.setAttribute('aria-label', 'Ta bort todo');
        deleteBtn.addEventListener('click', function () {
            deleteTodo(index);
        });

        li.appendChild(textSpan);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Formats "2026-05-10" to "10 maj 2026"
function formatDate(isoDate) {
    const date = new Date(isoDate + 'T00:00:00');
    return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
}

function deleteTodo(index) {
    // Remove the todo at the given position in the array
    todos.splice(index, 1);
    renderTodoList();
}

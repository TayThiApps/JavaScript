// This file contains the main JavaScript code for the project. It exports functions that can be tested in the test files.

export function greet(name) {
    return `Hello, ${name}!`;
}

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}
function saveTodos() {
    const ul = document.getElementById('todoItems');
    const todos = [];
    ul.querySelectorAll('li').forEach(li => {
        todos.push({
            text: li.querySelector('span').textContent,
            done: li.classList.contains('done')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const ul = document.getElementById('todoItems');
    ul.innerHTML = '';
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach(todo => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = todo.text;
        li.appendChild(span);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.style.marginLeft = '10px';
        editBtn.onclick = function(e) {
            e.stopPropagation();
            const newValue = prompt('Edit your task:', span.textContent);
            if (newValue !== null && newValue.trim() !== '') {
                span.textContent = newValue.trim();
                saveTodos();
            }
        };
        li.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.style.marginLeft = '5px';
        deleteBtn.onclick = function(e) {
            e.stopPropagation();
            ul.removeChild(li);
            saveTodos();
        };
        li.appendChild(deleteBtn);

        // Mark as done on click
        li.onclick = function() {
            li.classList.toggle('done');
            saveTodos();
        };

        if (todo.done) li.classList.add('done');
        ul.appendChild(li);
    });
}

window.addTodo = function() {
    const input = document.getElementById('todoInput');
    const value = input.value.trim();
    if (!value) return;
    const ul = document.getElementById('todoItems');
    const li = document.createElement('li');

    // Task text
    const span = document.createElement('span');
    span.textContent = value;
    li.appendChild(span);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.style.marginLeft = '10px';
    editBtn.onclick = function(e) {
        e.stopPropagation();
        const newValue = prompt('Edit your task:', span.textContent);
        if (newValue !== null && newValue.trim() !== '') {
            span.textContent = newValue.trim();
            saveTodos();
        }
    };
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.style.marginLeft = '5px';
    deleteBtn.onclick = function(e) {
        e.stopPropagation();
        ul.removeChild(li);
        saveTodos();
    };
    li.appendChild(deleteBtn);

    // Mark as done on click
    li.onclick = function() {
        li.classList.toggle('done');
        saveTodos();
    };

    ul.appendChild(li);
    input.value = '';
    saveTodos();
};

// Load todos when the page loads
window.addEventListener('DOMContentLoaded', loadTodos);
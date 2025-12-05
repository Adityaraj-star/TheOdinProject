import { todos } from './data/todos.js';
import { projects } from './data/projects.js';

const todoListContainer = document.querySelector(".js-task-list");
const projectsListContainer = document.querySelector(".js-projects-list");

function formatPriority(priority) {
    if (!priority) return "";
    return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function createTodoHTML(todo) {
    return `
        <div class="task-card js-task-card ${todo.isCompleted ? 'completed' : ''}" data-todo-id="${todo.id}">
            <div class="task-header">
                <div class="task-title">
                    <input type="checkbox" class="js-todo-checkbox" ${todo.isCompleted ? 'checked' : ''}>
                    <p>${todo.name}</p>
                </div>
                <div class="task-info">
                    <span class="priority ${todo.priority.toLowerCase()}">${formatPriority(todo.priority)}</span>
                    <p class="task-date">${todo.dueDate}</p>
                </div>
            </div>
            <p class="task-description">${todo.description}</p>
            <div class="task-actions-and-tags">
                <div class="task-action-buttons">
                    <button class="edit-btn">
                        <i class="fa-solid fa-pen-to-square icon edit-icon"></i>
                    </button>
                    <button class="delete-btn">
                        <i class="fa-solid fa-trash icon delete-icon"></i>
                    </button>
                </div>
                <p class="task-tag">${todo.inbox}</p>
            </div>
        </div>
    `;
}

function createProjectHTML (project) {
    return `
        <div class="project-item">
            <div class="project-item-name">
                <i class="fa-solid fa-screwdriver-wrench icon"></i>
                <p class="project-name">${project.name}</p>
            </div>
            <div class="project-item-actions">
                <button>
                    <i class="fa-solid fa-pen-to-square icon edit-icon" title="Edit"></i>
                </button>
                <button>
                    <i class="fa-solid fa-trash icon delete-icon" title="Delete"></i>
                </button>
            </div>
        </div>
    `;
}

function renderItems (itemsList, itemsListContainer, createHTML) {
    let itemsHTML = '';
    itemsList.forEach((item) => {
        itemsHTML += createHTML(item);
    });

    itemsListContainer.innerHTML = itemsHTML;
}

export function renderTodoCards(todosToRender = todos) {
    renderItems(todosToRender, todoListContainer, createTodoHTML);
}

export function renderProjectCards() {
    renderItems(projects, projectsListContainer, createProjectHTML);
}


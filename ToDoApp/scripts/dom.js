import { todos, addTodo, updateTodo } from "./data/todos.js";
import { addProjects } from "./data/projects.js";
import { renderTodoCards, renderProjectCards } from "./render.js";

const formDialog = document.querySelector(".js-form-dialog");
const addTodoIcon = document.querySelector(".js-add-icon");
const cancelBtn = document.querySelector(".js-cancel-btn");
const addToDoForm = document.querySelector(".addToDo-form");

const todoNameBox = document.querySelector(".js-todo-name");
const todoDescriptionBox = document.querySelector(".js-todo-description");
const todoDueDateBox = document.querySelector(".js-todo-dueDate");
const todoPriorityBox = document.querySelector(".js-todo-priority");
const todoInboxBox = document.querySelector(".js-todo-inbox");

const projectDialog = document.querySelector(".js-project-dialog");
const addProjectIcon = document.querySelector(".js-add-project-icon");
const cancelProjectBtn = document.querySelector(".js-cancel-project-btn");
const addProjectForm = document.querySelector(".js-addProject-form");

const projectNameBox = document.querySelector(".js-project-name");

const todoListContainer = document.querySelector(".js-task-list");
const addTodoBtn = document.querySelector(".js-addTodo-btn");


export function setupEventListeners() {
    let editingTodoId = null; //to remember which todo is edited

    addTodoIcon.addEventListener('click', () => {
        editingTodoId = null;
        addTodoBtn.textContent = "Add Todo";
        formDialog.showModal();
    });

    cancelBtn.addEventListener('click', () => {
        formDialog.close();
    });

    addToDoForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const todoName = todoNameBox.value;
        const todoDescription = todoDescriptionBox.value;
        const todoDueDate = todoDueDateBox.value;
        const todoPriority = todoPriorityBox.value;
        const todoInbox = todoInboxBox.value;

        if (todoName.trim() === '') {
            alert('Please enter a task name.');
            return;
        }

        if (editingTodoId) {
            updateTodo(editingTodoId, todoName, todoDescription, todoDueDate, todoPriority, todoInbox);
        } else {
            addTodo(todoName, todoDescription, todoDueDate, todoPriority, todoInbox);
        }

        renderTodoCards();
        formDialog.close();
    });

    formDialog.addEventListener('close', () => {
        addToDoForm.reset();
    });

    addProjectIcon.addEventListener('click', () => {
        projectDialog.showModal();
    });

    cancelProjectBtn.addEventListener('click', () => {
        projectDialog.close();
    });

    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = projectNameBox.value;

        if (projectName.trim() === '') {
            alert('Please enter a project name.');
            return;
        }

        addProjects(projectName);
        renderProjectCards();
        projectDialog.close();
        editingTodoId = null;
        addTodoBtn.textContent = "Add Todo";
    });


    todoListContainer.addEventListener('click', (event) => {
        const editIcon = event.target.closest('.edit-icon');
        if (!editIcon) return;

        const card = editIcon.closest('.js-task-card');

        const todoId = card.dataset.todoId;
        editingTodoId = todoId;

        console.log(todoId);

        todos.forEach((todoToEdit) => {
            if (todoToEdit.id == todoId) {
                todoNameBox.value = todoToEdit.name;
                todoDescriptionBox.value = todoToEdit.description;
                todoDueDateBox.value = todoToEdit.dueDate;
                todoPriorityBox.value = todoToEdit.priority;
                todoInboxBox.value = todoToEdit.inbox;

                formDialog.showModal();
                addTodoBtn.textContent = "Update Todo";
            }
        })
        
    });
}


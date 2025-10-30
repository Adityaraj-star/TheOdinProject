import { addTasksToTodos } from "./data/todos.js";
import { rendertaskCards } from "./main.js";

const formDialog = document.querySelector(".js-form-dialog");
const addTodoIcon = document.querySelector(".js-add-icon");
const cancelBtn = document.querySelector(".js-cancel-btn");
const addToDoForm = document.querySelector(".addToDo-form");

const todoNameBox = document.querySelector(".js-todo-name");
const todoDescriptionBox = document.querySelector(".js-todo-description");
const todoDueDateBox = document.querySelector(".js-todo-dueDate");
const todoPriorityBox = document.querySelector(".js-todo-priority");
const todoInboxBox = document.querySelector(".js-todo-inbox");

export function setupEventListeners() {

    addTodoIcon.addEventListener('click', () => {
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

        addTasksToTodos(todoName, todoDescription, todoDueDate, todoPriority, todoInbox);

        rendertaskCards();

        formDialog.close();
    });

    formDialog.addEventListener('close', () => {
        addToDoForm.reset();
    });
}
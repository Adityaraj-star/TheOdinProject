import { todos, addTodo, updateTodo } from "./data/todos.js";
import { addProjects } from "./data/projects.js";
import { renderTodoCards, renderProjectCards } from "./render.js";
import { getTodayDateString, getAfterOneWeekDateString } from './utils/date.js';

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

const allBtn = document.querySelector(".js-all-btn")
const todayBtn = document.querySelector(".js-today-btn");
const weekBtn = document.querySelector(".js-week-btn");
const impBtn = document.querySelector(".js-imp-btn");
const completedBtn = document.querySelector(".js-completed-btn");

const contentTitle = document.querySelector(".js-content-title");


export function setupEventListeners() {
    let editingTodoId = null; //to remember which todo is edited
    let currentFilter = 'all';

    function getFilteredTodos() {
        const today = getTodayDateString();
        const weekEnd = getAfterOneWeekDateString();

        switch (currentFilter) {
            case 'today':
                return todos.filter(todo => todo.dueDate === today);

            case 'week':
                return todos.filter(todo => todo.dueDate >= today && todo.dueDate <= weekEnd);

            case 'important':
                return todos.filter(todo => todo.priority === 'important');

            case 'completed':
                return todos.filter(todo => todo.isCompleted === true);

            case 'all':
            default:
                return todos;
        }
    }

    function updateContentTitle() {
        switch (currentFilter) {
            case 'today':
                contentTitle.textContent = "Today";
                break;
            case 'week':
                contentTitle.textContent = "Week";
                break;
            case 'important':
                contentTitle.textContent = "Important";
                break;
            case 'completed':
                contentTitle.textContent = "Completed";
                break;
            case 'all':
            default:
                contentTitle.textContent = "All";
                break;
        }
    }

    function updateView() {
        updateContentTitle();
        const filteredTodos = getFilteredTodos();
        renderTodoCards(filteredTodos);
    }

    // Todo dialog: open/cancel 

    addTodoIcon.addEventListener('click', () => {
        editingTodoId = null;
        addTodoBtn.textContent = "Add Todo";
        formDialog.showModal();
    });

    cancelBtn.addEventListener('click', () => {
        formDialog.close();
    });

    formDialog.addEventListener('close', () => {
        addToDoForm.reset();
        editingTodoId = null;
        addTodoBtn.textContent = "Add Todo";
    });


    // Add/Update Todo

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

        formDialog.close();
        editingTodoId = null;
        addTodoBtn.textContent = "Add Todo";
        updateView();
    });

    // Edit Todo

    todoListContainer.addEventListener('click', (event) => {
        const editIcon = event.target.closest('.edit-icon');
        if (!editIcon) return;

        const card = editIcon.closest('.js-task-card');
        const todoId = card.dataset.todoId;
        editingTodoId = todoId;

        const todoToEdit = todos.find(todo => todo.id === todoId);
        if (!todoToEdit) return;

        todoNameBox.value = todoToEdit.name;
        todoDescriptionBox.value = todoToEdit.description;
        todoDueDateBox.value = todoToEdit.dueDate;
        todoPriorityBox.value = todoToEdit.priority;   
        todoInboxBox.value = todoToEdit.inbox;

        formDialog.showModal();
        addTodoBtn.textContent = "Update Todo";
    });

    // Delete Todo

    todoListContainer.addEventListener('click', (event) => {
        const dltIcon = event.target.closest('.delete-icon');
        if (!dltIcon) return;

        const card = dltIcon.closest('.js-task-card');
        const todoId = card.dataset.todoId;

        const index = todos.findIndex(todo => todo.id === todoId);
        if (index !== -1) {
            todos.splice(index, 1);
            updateView();
        }
    });


    // Toggle Complete
    todoListContainer.addEventListener('click', (event) => {
        const checkbox = event.target.closest('.js-todo-checkbox');
        if (!checkbox) return;

        const card = checkbox.closest('.js-task-card');
        const todoId = card.dataset.todoId;

        const todo = todos.find(todoItem => todoItem.id === todoId);
        if (!todo) return;

        todo.isCompleted = checkbox.checked;

        updateView();
    });


    // Project dialog

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
    });

    //  Filters

     allBtn.addEventListener('click', () => {
        currentFilter = 'all';
        updateView();
    });

    todayBtn.addEventListener('click', () => {
        currentFilter = 'today';
        updateView();
    });

    weekBtn.addEventListener('click', () => {
        currentFilter = 'week';
        updateView();
    });

    impBtn.addEventListener('click', () => {
        currentFilter = 'important';
        updateView();
    });

    completedBtn.addEventListener('click', () => {
        currentFilter = 'completed';
        updateView();
    });

    updateView();
}


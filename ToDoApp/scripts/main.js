import {todos} from './data/todos.js';

const taskList = document.querySelector(".js-task-list");

function rendertaskCards() {
    let taskCardsHTML = '';


    todos.forEach((task) => {
        const html = `
            <div class="task-card js-task-card">
                <div class="task-header">
                    <div class="task-title">
                        <input type="checkbox">
                        <p>${task.title}</p>
                    </div>

                    <div class="task-info">
                        <span class="priority important">${task.priority}</span>
                        <p class="task-date">${task.dueDate}</p>
                    </div>
                </div>
                <p class="task-description">${task.description}</p>
                <div class="task-actions-and-tags">
                    <div class="task-action-buttons">
                        <button class="edit-btn">
                            <i class="fa-solid fa-pen-to-square icon edit-icon"></i>
                        </button>
                        <button class="delete-btn">
                            <i class="fa-solid fa-trash icon delete-icon"></i>
                        </button>
                    </div>
                    <p class="task-tag">${task.projectSection}</p>
                </div>
            </div>
        `;

        taskCardsHTML += html;
    });

    taskList.innerHTML = taskCardsHTML;
}

rendertaskCards();


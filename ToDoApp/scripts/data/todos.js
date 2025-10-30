export const todos = [
    {
        id: crypto.randomUUID(),
        name: "Study Data Structures and Algorithms",
        description: "Continue through the textbook until page 130.",
        dueDate: "2025-10-21",
        priority: "important",
        inbox: "# DSA",
        isCompleted: false
    },
    {
        id: crypto.randomUUID(),
        name: "Submit Project Proposal",
        description: "Finalize the proposal document and email it to the professor.",
        dueDate: "2025-10-24",
        priority: "urgent",
        inbox: "# University",
        isCompleted: false
    }
];

export function addTasksToTodos(name, description, dueDate, priority, inbox) {
    const newId = crypto.randomUUID();
    
    const todo = {
        id: newId,
        name,
        description,
        dueDate,
        priority,
        inbox,
        isCompleted: false
    };

    todos.push(todo);
}
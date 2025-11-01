export const projects = [
    {
        id: crypto.randomUUID(),
        name: "Chores"
    },
    {
        id: crypto.randomUUID(),
        name: "DSA"
    }
]

export function addProjects(name) {
    const id = crypto.randomUUID();
    const project = {
        id,
        name
    }

    projects.push(project);
}

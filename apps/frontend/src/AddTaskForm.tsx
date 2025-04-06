import React, { useState } from 'react';
import { createTask } from './api';

interface Project {
    id: number;
    name: string;
    // Add other relevant project properties if needed
}

interface AddTaskFormProps {
    projects: Project[];
    onTaskAdded: () => void; // Callback to refresh the task list
}

export function AddTaskForm({ projects, onTaskAdded }: AddTaskFormProps) {
    const [taskName, setTaskName] = useState('');
    const [selectedProjectId, setSelectedProjectId] = useState<number | string>('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskName || !selectedProjectId) {
            setError('Task name and project are required.');
            return;
        }
        setError(null);
        setIsSubmitting(true);

        try {
            await createTask({
                name: taskName,
                projectId: Number(selectedProjectId),
                description: description || null,
            });
            setTaskName('');
            setSelectedProjectId('');
            setDescription('');
            onTaskAdded(); // Notify parent component
        } catch (err) {
            console.error("Failed to create task:", err);
            setError('Failed to create task. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <h3>Add New Task</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label htmlFor="taskName">Task Name:</label>
                <input
                    type="text"
                    id="taskName"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="project">Project:</label>
                <select
                    id="project"
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a project</option>
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="description">Description (Optional):</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
} 
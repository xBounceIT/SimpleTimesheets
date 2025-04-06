import React, { useState, useEffect, useCallback } from 'react';
import { fetchTasks, fetchProjects } from './api'; // Import fetchProjects
import { AddTaskForm } from './AddTaskForm'; // Import the form component

interface Task {
  id: number;
  name: string;
  description: string | null;
  projectId: number; // Assuming tasks are linked to projects
  // Add other relevant task properties based on your backend model
}

// Define Project interface matching AddTaskForm expectations
interface Project {
  id: number;
  name: string;
}

// Define props for TasksPage, including the role
interface TasksPageProps {
  role: string | null;
}

export function TasksPage({ role }: TasksPageProps) { // Accept role prop
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]); // State for projects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectsMap, setProjectsMap] = useState<Record<number, string>>({}); // To map projectId to name

  // Define loadTasks using useCallback to avoid re-creating it on every render
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Use Promise.all to fetch tasks and projects concurrently if needed
      const [fetchedTasks, fetchedProjects] = await Promise.all([
        fetchTasks(),
        // Fetch projects here as well to create the map
        (role === 'MANAGER' || role === 'SUB-MANAGER') ? fetchProjects() : Promise.resolve([]),
      ]);
      setTasks(fetchedTasks);
      setProjects(fetchedProjects); // Set projects state for the form

      // Create a map of projectId -> projectName
      const projMap: Record<number, string> = {};
      fetchedProjects.forEach((p: Project) => {
        projMap[p.id] = p.name;
      });
      setProjectsMap(projMap);

    } catch (err) {
      console.error("Failed to load tasks or projects:", err);
      setError("Failed to load page data. Please try again later.");
      setTasks([]);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [role]); // Add role dependency

  useEffect(() => {
    loadTasks(); // Load tasks and projects on mount/role change
  }, [loadTasks]); // Depend on loadTasks callback

  const handleTaskAdded = () => {
    loadTasks(); // Reload tasks when a new one is added
  };

  const canAddTask = role === 'MANAGER' || role === 'SUB-MANAGER';

  return (
    // Use the same container class as AdminPanel/ClientsManager
    <div className="admin-panel-container"> 
      <h1>Tasks</h1>

      {/* Conditionally render the Add Task form - style assumed to be similar */} 
      {canAddTask && (
        <AddTaskForm projects={projects} onTaskAdded={handleTaskAdded} />
      )}

      {/* Display Tasks List using card style */} 
      {/* Use the same list container class */}
      <div className="user-list-container"> 
        <h2>Task List</h2>
        {loading && <p>Loading tasks...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <>
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              // Map tasks to cards using the same structure and classes
              tasks.map(task => (
                <div key={task.id} className="user-card">
                  <div className="user-info">
                    <div className="user-name"> {/* Re-use class */}
                      <span className="user-label">Task:</span>
                      <span className="user-value">{task.name}</span>
                    </div>
                    {task.description && (
                      <div className="user-description"> {/* Add a class for description */}
                        <span className="user-label">Description:</span>
                        <span className="user-value">{task.description}</span>
                      </div>
                    )}
                    <div className="task-project"> {/* Add a class for project */}
                      <span className="user-label">Project:</span>
                      <span className="user-value">{projectsMap[task.projectId] || 'Unknown Project'}</span>
                    </div>
                  </div>
                  <div className="user-actions"> {/* Re-use class */}
                    {/* Add Edit/Delete buttons later */} 
                    <button className="edit-button button-as-link" disabled>Edit</button>
                    <button className="delete-button" disabled>Delete</button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
} 
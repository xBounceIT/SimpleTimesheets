import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { api } from './api'; // Import the shared api instance

// Define interfaces for type safety
interface Client {
  id: number;
  name: string;
}

interface Project {
  id: number;
  name: string;
  clientId: number;
}

export function ProjectsManager() {
  const navigate = useNavigate(); // Initialize navigate
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState<number | ''>('');

  // Create a map for quick client name lookup
  const clientMap = clients.reduce((acc, client) => {
    acc[client.id] = client.name;
    return acc;
  }, {} as Record<number, string>);

  async function loadData() {
    try {
      const [projectsRes, clientsRes] = await Promise.all([
        api.get<Project[]>('/projects'), // Use api instance and type
        api.get<Client[]>('/clients'),   // Use api instance and type
      ]);
      setProjects(projectsRes.data);
      setClients(clientsRes.data);
    } catch (error) {
      console.error("Failed to load projects or clients:", error);
      alert('Failed to load data. Please try again.');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const resetAddProjectForm = () => {
    setName('');
    setClientId('');
  };

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      alert('Project name cannot be empty.');
      return;
    }
    if (!clientId) {
      alert('Please select a client.');
      return;
    }
    try {
      await api.post('/projects', { name, clientId }); // Use api instance
      resetAddProjectForm();
      loadData(); // Refresh data after adding
    } catch (error) {
      console.error("Failed to add project:", error);
      alert('Failed to add project.');
    }
  }

  // Add delete functionality
  async function handleDeleteProject(projectId: number) {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${projectId}`); // Use api instance
        loadData(); // Refresh the list after deletion
      } catch (error) {
        console.error("Failed to delete project:", error);
        alert('Failed to delete project.');
      }
    }
  }

  return (
    // Use consistent container styling
    <div className="admin-panel-container">
      <h2>Projects Management</h2>

      {/* Add Project Form - Apply consistent styling */}
      <form onSubmit={handleAdd} className="add-user-form"> {/* Reuse styling */}
        <h3>Add New Project</h3>
        <div className="form-grid"> {/* Reuse grid layout */}
          <div className="form-row">
            <label>
              Project Name:
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Client:
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value ? Number(e.target.value) : '')}
                required
              >
                <option value="">Select client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row button-row"> {/* Reuse button row styling */}
            <button type="submit">Add Project</button>
          </div>
        </div>
      </form>

      {/* Project List using card style */}
      <div className="user-list-container"> {/* Reuse list container style */}
        <h3>Current Projects</h3>
        {projects.map((project) => (
          <div key={project.id} className="user-card"> {/* Reuse card style */}
            <div className="user-info"> {/* Reuse info style */}
              <div className="user-name"> {/* Reuse name style */}
                <span className="user-label">Project:</span>
                <span className="user-value">{project.name}</span>
              </div>
              <div className="user-client"> {/* Add specific class if needed */}
                <span className="user-label">Client:</span>
                {/* Look up client name using the map */}
                <span className="user-value">{clientMap[project.clientId] || 'Unknown Client'}</span>
              </div>
            </div>
            <div className="user-actions"> {/* Reuse actions style */}
              {/* Add Edit button */}
              <button 
                onClick={() => navigate(`/projects/${project.id}/edit`)} // Update onClick
                className="edit-button button-as-link"
              >
                Edit
              </button>
              <button onClick={() => handleDeleteProject(project.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p>No projects found.</p>} {/* Handle empty list */}
      </div>
    </div>
  );
}

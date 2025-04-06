import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, fetchProjectById, updateProject, fetchClients } from './api'; // Assuming fetchClients exists

interface Client {
  id: number;
  name: string;
}

interface Project {
  id: number;
  name: string;
  clientId: number;
}

export function EditProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjectData = async () => {
      if (!projectId) return;
      setLoading(true);
      setError(null);
      try {
        const projectData = await fetchProjectById(projectId);
        setProject(projectData);
        setName(projectData.name);
        setClientId(projectData.clientId);

        const clientData = await fetchClients(); // Fetch clients for the dropdown
        setClients(clientData);

      } catch (err) {
        console.error("Failed to load project or clients:", err);
        setError("Failed to load project details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, [projectId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !project) return;
    if (!name.trim()) {
      alert('Project name cannot be empty.');
      return;
    }
     if (!clientId) {
      alert('Please select a client.');
      return;
    }

    setError(null);
    try {
      await updateProject(projectId, { name, clientId });
      alert('Project updated successfully!');
      navigate('/projects'); // Navigate back to the projects list
    } catch (err) {
      console.error("Failed to update project:", err);
      setError("Failed to update project. Please try again.");
      alert('Failed to update project.');
    }
  };

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="admin-panel-container"> {/* Reuse container style */}
      <h2>Edit Project: {project.name}</h2>
      <form onSubmit={handleUpdate} className="add-user-form"> {/* Reuse form style */}
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
          <div className="form-row button-row">
            <button type="submit" className="button-primary">Save Changes</button>
            <button type="button" onClick={() => navigate('/projects')} className="button-secondary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
} 
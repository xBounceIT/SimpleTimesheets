import React, { useEffect, useState } from 'react';
import { api } from './api'; // Import the configured api instance

// Define Client type for better type safety
interface Client {
  id: number;
  name: string;
}

export function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]); // Use Client type
  const [name, setName] = useState('');

  async function loadClients() {
    // Use the api instance for the GET request
    const res = await api.get<Client[]>('/clients'); // Use Client type
    setClients(res.data);
  }

  useEffect(() => {
    loadClients();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { // Basic validation
      alert('Client name cannot be empty.');
      return;
    }
    // Use the api instance for the POST request
    await api.post('/clients', { name });
    setName('');
    loadClients();
  }

  // Add delete functionality (similar to AdminPanel)
  async function handleDeleteClient(clientId: number) {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await api.delete(`/clients/${clientId}`);
        loadClients(); // Refresh the list after deletion
      } catch (error) {
        console.error("Failed to delete client:", error);
        alert('Failed to delete client.');
      }
    }
  }

  return (
    // Use a container similar to AdminPanel for consistency
    <div className="admin-panel-container"> {/* Re-use or create similar container style */}
      <h2>Clients Management</h2>

      {/* Add Client Form - Style similar to Add User form */}
      {/* Consider extracting form components later for reusability */}
      <form onSubmit={handleAdd} className="add-user-form"> {/* Reuse styling */}
        <h3>Add New Client</h3>
        <div className="form-grid"> {/* Reuse grid layout */}
          <div className="form-row">
            <label>
              Client Name:
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Client name"
                required // Add required attribute
              />
            </label>
          </div>
          <div className="form-row button-row"> {/* Reuse button row styling */}
            <button type="submit">Add Client</button>
          </div>
        </div>
      </form>

      {/* Client List using card style */}
      <div className="user-list-container"> {/* Reuse user list container style */}
        <h3>Current Clients</h3>
        {/* Optionally add search/filter later */}
        {clients.map((client) => (
          <div key={client.id} className="user-card"> {/* Reuse user card style */}
            <div className="user-info"> {/* Reuse user info style */}
              <div className="user-name"> {/* Reuse user name style */}
                <span className="user-label">Name:</span>
                <span className="user-value">{client.name}</span>
              </div>
              {/* Add more client details here if available, e.g., ID */}
              {/* <div className="user-id">
                <span className="user-label">ID:</span>
                <span className="user-value">{client.id}</span>
              </div> */}
            </div>
            <div className="user-actions"> {/* Reuse user actions style */}
              {/* Add Edit button later if needed */}
              {/* <button className="edit-button button-as-link">Edit</button> */}
              <button onClick={() => handleDeleteClient(client.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
        {clients.length === 0 && <p>No clients found.</p>} {/* Handle empty list */}
      </div>
    </div>
  );
}

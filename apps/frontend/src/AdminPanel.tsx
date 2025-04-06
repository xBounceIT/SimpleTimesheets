import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Define a type for the user for better type safety
interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
}

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  async function loadUsers() {
    try {
      const res = await axios.get<User[]>('http://localhost:3000/admin/users', {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const resetAddUserForm = () => {
    setEmail('');
    setPassword('');
    setRole('USER');
    setFirstName('');
    setLastName('');
  };

  async function handleDeleteUser(userId: number) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(
          `http://localhost:3000/admin/users/${userId}`,
          { withCredentials: true }
        );
        loadUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert('Failed to delete user.');
      }
    }
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
        alert('Please fill in all fields for the new user.');
        return;
    }
    try {
      await axios.post(
        'http://localhost:3000/auth/register',
        { email, password, role, firstName, lastName },
        { withCredentials: true }
      );
      resetAddUserForm();
      loadUsers();
    } catch (error) {
      console.error("Failed to add user:", error);
      alert('Failed to add user.');
    }
  }

  return (
    <div className="admin-panel-container">
      <h2>User Management</h2>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="add-user-form">
        <h3>Add New User</h3>
        
        {/* Names Row */}
        <div className="form-row">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name" required
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name" required
          />
        </div>
        
        {/* Email Row */}
        <div className="form-row">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" type="email" required
          />
        </div>
        
        {/* Password Row */}
        <div className="form-row">
          <div className="password-input-container">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? "text" : "password"} 
              required
            />
            <button 
              type="button" 
              className="show-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        
        {/* Role Row */}
        <div className="form-row">
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="SUB_MANAGER">SUB_MANAGER</option>
            <option value="USER">USER</option>
          </select>
        </div>
        
        {/* Button Row */}
        <div className="form-row button-row">
          <button type="submit">Add User</button>
        </div>
      </form>

      {/* User Table */}
      <div className="user-list-container">
        <h3>Current Users</h3>

        {/* Add Search Input */}
        <div className="form-row search-bar-container">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="user-search-input"
          />
        </div>

        {users
          .filter(user => {
            const term = searchTerm.toLowerCase();
            const firstNameMatch = user.firstName?.toLowerCase().includes(term) ?? false;
            const lastNameMatch = user.lastName?.toLowerCase().includes(term) ?? false;
            const emailMatch = user.email.toLowerCase().includes(term);
            return firstNameMatch || lastNameMatch || emailMatch;
          })
          .map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <div className="user-name">
                <span className="user-label">Name:</span>
                <span className="user-value">{user.firstName ?? '-'} {user.lastName ?? '-'}</span>
              </div>
              <div className="user-email">
                <span className="user-label">Email:</span>
                <span className="user-value">{user.email}</span>
              </div>
              <div className="user-role">
                <span className="user-label">Role:</span>
                <span className="user-value">{user.role}</span>
              </div>
            </div>
            <div className="user-actions">
              <Link to={`/admin/users/${user.id}/edit`} className="edit-button button-as-link">
                Edit
              </Link>
              <button onClick={() => handleDeleteUser(user.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

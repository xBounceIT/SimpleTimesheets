import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Reusing the User interface definition might be better if extracted to a shared types file
interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
}

export function UserEditPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('USER');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Loading and error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('User ID is missing');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Assuming an endpoint exists to get a single user by ID
        const res = await axios.get<User>(`/api/admin/users/${userId}`, { // Updated API path assumption
           withCredentials: true,
        });
        const user = res.data;
        setEmail(user.email);
        setFirstName(user.firstName ?? '');
        setLastName(user.lastName ?? '');
        setRole(user.role);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError('Failed to load user data. Please try again.');
        // Optionally navigate back or show a persistent error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Dependency array includes userId

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const updateData: any = {
        email,
        firstName,
        lastName,
        role,
      };

      // Only include password if it's being changed
      if (password) {
        updateData.password = password;
      }

      await axios.patch(
        `/api/admin/users/${userId}`, // Updated API path assumption
        updateData,
        { withCredentials: true }
      );

      alert('User updated successfully!');
      navigate('/admin/users'); // Navigate back to the user list
    } catch (err) {
      console.error("Failed to update user:", err);
      alert('Failed to update user. Please check the details and try again.');
      // More specific error handling based on API response could be added
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="user-edit-container"> {/* Optional container for styling */}
      <h2>Edit User: {email}</h2> {/* Show email being edited */}
      <form onSubmit={handleSubmit} className="user-edit-form"> {/* Re-use form styling or create new */}
         {/* Use form-grid or similar layout */}
         <div className="form-grid">
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
             <label>
              First Name:
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name" required
              />
            </label>
            <label>
              Last Name:
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name" required
              />
            </label>
            <label>
              Role:
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="SUB_MANAGER">SUB_MANAGER</option>
                <option value="USER">USER</option>
              </select>
            </label>
             <label>
              New Password (leave blank to keep current):
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
              />
            </label>
            <label>
              Confirm New Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                // Conditionally require if password is set
                required={!!password} 
              />
            </label>
         </div>

         <div className="form-actions"> {/* Container for buttons */}
           <button type="submit" className="save-button">Save Changes</button>
           <button type="button" onClick={() => navigate('/admin/users')} className="cancel-button">
             Cancel
           </button>
         </div>
      </form>
    </div>
  );
} 
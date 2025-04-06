import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { TimeEntryForm } from './TimeEntryForm';
import { LoginForm } from './LoginForm';
import { ClientsManager } from './ClientsManager';
import { ProjectsManager } from './ProjectsManager';
import { AdminPanel } from './AdminPanel';
import { EditProjectPage } from './EditProjectPage';
import { HamburgerMenu } from './HamburgerMenu';
import { ThemeToggle } from './components/ThemeToggle';
import { fetchTimeEntriesByDate } from './api';
import { DailyTimeEntriesList } from './DailyTimeEntriesList';
import { UserEditPage } from './UserEditPage';
import { TasksPage } from './TasksPage';

// Define TimeEntry type (can be moved to a shared types file)
interface TimeEntry {
  id: number;
  client: { id: number; name: string };
  project: { id: number; name: string };
  task: { id: number; name: string };
  duration: number;
  notes: string;
  date: string;
}

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const isAuthenticated = !!token;

  const handleLogin = (t: string, r: string) => {
    setToken(t);
    setRole(r);
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <>
      {isAuthenticated && <HamburgerMenu onLogout={handleLogout} role={role} />}
      <ThemeToggle />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginForm onLogin={handleLogin} />} />

          <Route path="/" element={
            isAuthenticated 
              ? (role === 'ADMIN' 
                  ? <Navigate to="/admin/users" /> 
                  : <Dashboard role={role} />)
              : <Navigate to="/login" />
          } />
          <Route path="/projects" element={isAuthenticated ? <ProjectsManager /> : <Navigate to="/login" />} />
          <Route path="/projects/:projectId/edit" element={isAuthenticated ? <EditProjectPage /> : <Navigate to="/login" />} />
          <Route path="/clients" element={isAuthenticated ? <ClientsManager /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={isAuthenticated ? <TasksPage role={role} /> : <Navigate to="/login" />} />

          <Route path="/admin/users" element={isAuthenticated && role === 'ADMIN' ? <AdminPanel /> : <Navigate to="/" />} />
          <Route path="/admin/users/:userId/edit" element={isAuthenticated && role === 'ADMIN' ? <UserEditPage /> : <Navigate to="/" />} />

          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </div>
    </>
  );
}

function Dashboard({ role }: { role: string | null }) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [dailyEntries, setDailyEntries] = useState<TimeEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [errorEntries, setErrorEntries] = useState<string | null>(null);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    const loadEntries = async () => {
      setLoadingEntries(true);
      setErrorEntries(null);
      try {
        const entries = await fetchTimeEntriesByDate(selectedDate);
        setDailyEntries(entries);
      } catch (err) {
        console.error("Failed to fetch time entries:", err);
        setErrorEntries("Failed to load entries for this day.");
        setDailyEntries([]);
      } finally {
        setLoadingEntries(false);
      }
    };
    loadEntries();
  }, [selectedDate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome! Please use the navigation to manage your time.</p>
      <TimeEntryForm selectedDate={selectedDate} onDateChange={handleDateChange} />
      <hr />
      {loadingEntries && <p>Loading entries...</p>}
      {errorEntries && <p style={{ color: 'red' }}>{errorEntries}</p>}
      {!loadingEntries && !errorEntries && <DailyTimeEntriesList entries={dailyEntries} />}
    </div>
  );
}

export default App;

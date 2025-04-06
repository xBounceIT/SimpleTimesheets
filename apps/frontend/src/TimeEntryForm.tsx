import React, { useEffect, useState } from 'react';
import { fetchClients, fetchProjects, fetchTasks, createTimeEntry } from './api';

interface TimeEntryFormProps {
  selectedDate: string;
  onDateChange: (newDate: string) => void;
}

export function TimeEntryForm({ selectedDate, onDateChange }: TimeEntryFormProps) {
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  const [clientId, setClientId] = useState<number | ''>('');
  const [projectId, setProjectId] = useState<number | ''>('');
  const [taskId, setTaskId] = useState<number | ''>('');
  const [duration, setDuration] = useState<number>(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchClients().then(setClients);
    fetchProjects().then(setProjects);
    fetchTasks().then(setTasks);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientId || !projectId || !taskId) {
      alert('Please select client, project, and task');
      return;
    }
    await createTimeEntry({
      userId: 1, // Placeholder, replace with actual logged-in user ID
      clientId,
      projectId,
      taskId,
      duration,
      notes,
      date: selectedDate,
    });
    alert('Time entry saved');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Time Entry</h2>

      <label>
        Client:
        <select value={clientId} onChange={(e) => setClientId(Number(e.target.value))}>
          <option value="">Select client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>

      <label>
        Project:
        <select value={projectId} onChange={(e) => setProjectId(Number(e.target.value))}>
          <option value="">Select project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </label>

      <label>
        Task:
        <select value={taskId} onChange={(e) => setTaskId(Number(e.target.value))}>
          <option value="">Select task</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </label>

      <label>
        Duration (minutes):
        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
      </label>

      <label>
        Notes:
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      <label>
        Date:
        <input type="date" value={selectedDate} onChange={(e) => onDateChange(e.target.value)} />
      </label>

      <button type="submit">Save Time Entry</button>
    </form>
  );
}

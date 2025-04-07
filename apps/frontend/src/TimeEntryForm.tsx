import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

  const handleDatePickerChange = (date: Date | null) => {
    if (date) {
      onDateChange(date.toISOString().substring(0, 10));
    }
  };

  const datePickerSelectedDate = selectedDate ? new Date(selectedDate) : null;

  return (
    <form onSubmit={handleSubmit} className="time-entry-card">
      <div className="form-grid">
        <h2 className="form-header">Log Time Entry</h2>

        <div className="form-main-fields">
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
            Duration (hours):
            <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
          </label>
        </div>

        <div className="form-date-picker">
          <DatePicker
            selected={datePickerSelectedDate}
            onChange={handleDatePickerChange}
            inline
            dateFormat="yyyy-MM-dd"
            className="date-picker-inline-container"
            calendarClassName="react-datepicker-calendar"
          />
        </div>

        <div className="form-notes">
          <label>
            Notes:
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: '100%', minHeight: '80px' }}/>
          </label>
        </div>

        <div className="form-button-area">
          <button type="submit">Save Time Entry</button>
        </div>
      </div>
    </form>
  );
}

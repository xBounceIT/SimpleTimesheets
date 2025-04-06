import axios from 'axios';

// Define interfaces used in API functions for clarity
interface Project {
  id: number;
  name: string;
  clientId: number;
}

interface UpdateProjectData {
  name?: string;
  clientId?: number;
}

interface CreateTaskData {
  name: string;
  projectId: number;
  description?: string | null; // Optional description
}

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend URL
  withCredentials: true,
});

export async function fetchClients() {
  const res = await api.get('/clients');
  return res.data;
}

export async function fetchProjects() {
  const res = await api.get('/projects');
  return res.data;
}

export async function fetchTasks() {
  const res = await api.get('/tasks');
  return res.data;
}

export async function fetchTimeEntries() {
  const res = await api.get('/time-entries');
  return res.data;
}

export async function fetchTimeEntriesByDate(date: string) {
  const res = await api.get('/time-entries', { params: { date } });
  return res.data;
}

export async function createTimeEntry(data: {
  userId: number;
  clientId: number;
  projectId: number;
  taskId: number;
  duration: number;
  notes?: string;
  date: string; // ISO string
}) {
  const res = await api.post('/time-entries', data);
  return res.data;
}

// Add function to fetch a single project
export async function fetchProjectById(id: number | string) {
  const res = await api.get<Project>(`/projects/${id}`);
  return res.data;
}

// Add function to update a project
export async function updateProject(id: number | string, data: UpdateProjectData) {
  const res = await api.patch<Project>(`/projects/${id}`, data);
  return res.data;
}

// Add function to create a task
export async function createTask(data: CreateTaskData) {
  const res = await api.post('/tasks', data);
  return res.data;
}

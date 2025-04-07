import React from 'react';

// Define a basic interface for TimeEntry. Adjust based on actual data structure.
interface TimeEntry {
  id: number;
  client: { id: number; name: string }; // Assuming nested structure
  project: { id: number; name: string };
  task: { id: number; name: string };
  duration: number;
  notes: string;
  date: string;
}

interface DailyTimeEntriesListProps {
  entries: TimeEntry[];
}

export function DailyTimeEntriesList({ entries }: DailyTimeEntriesListProps) {
  if (!entries || entries.length === 0) {
    return <p>No time entries recorded for this day.</p>;
  }

  return (
    <div className="daily-entries-list">
      <h3>Entries for this day:</h3>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} className="entry-item">
            <div className="entry-header">
              <strong>{entry.client.name} / {entry.project.name} / {entry.task.name}</strong>
            </div>
            <div className="entry-info">
              <div className="entry-duration">
                <span className="user-label">Duration:</span>
                <span className="user-value">{entry.duration} hours</span>
              </div>
              {entry.notes && (
                <div className="entry-notes">
                  <span className="user-label">Notes:</span>
                  <span className="user-value">{entry.notes}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 
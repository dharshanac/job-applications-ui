import React, { useState } from "react";
import { JobApplication, ApplicationStatus } from "../types/Application";

interface Props {
  applications: JobApplication[];
  onUpdate: (id: number, data: Partial<JobApplication>) => void;
}

const ApplicationTable: React.FC<Props> = ({ applications, onUpdate }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<JobApplication>>({});

  const startEdit = (app: JobApplication) => {
    setEditingId(app.id);
    setEditValues({
      id: app.id,
      companyName: app.companyName,
      position: app.position,
      status: app.status,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = () => {
    if (editValues.id) onUpdate(editValues.id, editValues);
    setEditingId(null);
    setEditValues({});
  };

  const handleStatusChange = (app: JobApplication, newStatus: ApplicationStatus) => {
    onUpdate(app.id, { status: newStatus }); // PATCH request can be handled in parent
  };

  return (
    <table border={1} width="100%">
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Position</th>
          <th>Status</th>
          <th>Date Applied</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id}>
            <td>
              {editingId === app.id ? (
                <input
                  value={editValues.companyName ?? ""}
                  onChange={(e) => setEditValues({ ...editValues, companyName: e.target.value })}
                />
              ) : (
                app.companyName
              )}
            </td>
            <td>
              {editingId === app.id ? (
                <input
                  value={editValues.position ?? ""}
                  onChange={(e) => setEditValues({ ...editValues, position: e.target.value })}
                />
              ) : (
                app.position
              )}
            </td>
            <td>
              <select
                value={app.status}
                disabled={editingId === app.id}
                onChange={(e) => handleStatusChange(app, e.target.value as ApplicationStatus)}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Rejected</option>
                <option>Offer</option>
              </select>
            </td>
            <td>{new Date(app.dateApplied).toLocaleDateString()}</td>
            <td>
              {editingId === app.id ? (
                <>
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <button onClick={() => startEdit(app)}>Edit</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationTable;
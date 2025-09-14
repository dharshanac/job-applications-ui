import React, { useState } from "react";
import { CreateJobApplication } from "../types/Application";
import { validateApplication } from "../utils/validation";

interface Props {
  onSubmit: (data: CreateJobApplication) => void;
}

const initialState: CreateJobApplication = {
  companyName: "",
  position: "",
  status: "Applied",
  dateApplied: new Date().toISOString().split("T")[0],
};

const ApplicationForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CreateJobApplication>(initialState);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateApplication(formData);
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
    setFormData(initialState);
    setErrors([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div style={{ color: "red" }}>{errors.join(", ")}</div>
      )}
      <input
        placeholder="Company Name"
        value={formData.companyName}
        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
      />
      <input
        placeholder="Position"
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
      />
      
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>
      <button type="submit">Add Application</button>
    </form>
  );
};

export default ApplicationForm;
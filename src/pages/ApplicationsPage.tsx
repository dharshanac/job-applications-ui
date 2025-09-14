import React, { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationTable from "../components/ApplicationTable";
import apiClient from "../api/apiClient";
import { JobApplication, CreateJobApplication } from "../types/Application";
import { getErrorMessage } from "../utils/errorHandler";

const PAGE_SIZE = 5;

const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  // Fetch applications for a page
  const fetchApplications = async (pageNumber = 1) => {
    try {
  
      const res = await apiClient.get<JobApplication[]>(
        `/JobApplications?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`
      );

      // Ensure new array reference
      setApplications([...res.data]);

      const totalCountHeader = res.headers["x-total-count"];
      const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : res.data.length;
      setTotal(totalCount);

      // update page
      setPage(pageNumber);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Add new application
  const handleAdd = async (data: CreateJobApplication) => {
    try {
      await apiClient.post("/JobApplications", data);
      // Reload first page after adding
      fetchApplications(1);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // Update application (PUT for full, PATCH for status)
  const handleUpdate = async (id: number, data: Partial<JobApplication>) => {
    try {
      if ("companyName" in data || "position" in data || "dateApplied" in data) {
        await apiClient.put(`/JobApplications/${id}`, data);
      } else {
        console.log("id:", id);
        console.log("data:", data);
        await apiClient.patch(`/JobApplications/${id}/status`, data);
      }
      // Refresh current page
      fetchApplications(page);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Applications</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <ApplicationForm onSubmit={handleAdd} />
      <ApplicationTable applications={applications} onUpdate={handleUpdate} />

      <div style={{ marginTop: "10px" }}>
        <button disabled={page <= 1} onClick={() => fetchApplications(page - 1)}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} / {totalPages || 1}
        </span>
        <button disabled={page >= totalPages} onClick={() => fetchApplications(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ApplicationsPage;

export type ApplicationStatus = 'Applied' | 'Interview' | 'Rejected' | 'Offer';

export interface JobApplication {
  id: number;
  companyName: string;
  position: string;
  status: ApplicationStatus;
  dateApplied: string;
}

export interface CreateJobApplication {
  companyName: string;
  position: string;
  status: ApplicationStatus;
  dateApplied: string;
}
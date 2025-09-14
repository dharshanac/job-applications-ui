import { CreateJobApplication } from "../types/Application";

export function validateApplication(data: CreateJobApplication): string[] {
  const errors: string[] = [];

  if (!data.companyName.trim()) errors.push("Company name is required.");
  if (!data.position.trim()) errors.push("Position is required.");

  return errors;
}
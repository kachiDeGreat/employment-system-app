export enum UserRole {
  Graduate = "GRADUATE",
  Employer = "EMPLOYER",
  Institution = "INSTITUTION",
}

export interface User {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  name: string;
  profile?: GraduateProfile | EmployerProfile;
}

export interface GraduateProfile {
  university: string;
  degree: string;
  graduationYear: number;
  skills: string[];
}

export interface EmployerProfile {
  companyWebsite: string;
  companyDescription: string;
}

export interface Job {
  id: string;
  employerId: string;
  employerName: string;
  title: string;
  description: string;
  location: string;
  salary?: number;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  postedDate: string;
}

export type ApplicationStatus =
  | "Pending"
  | "Reviewed"
  | "Shortlisted"
  | "Rejected";

export interface Application {
  id: string;
  jobId: string;
  graduateId: string;
  applicantName: string;
  jobTitle: string;
  applicationDate: string;
  status: ApplicationStatus;
  coverLetter: string;
}

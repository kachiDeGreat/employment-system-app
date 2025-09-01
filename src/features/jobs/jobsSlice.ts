import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Job } from "../../types";
import { saveToStorage, loadFromStorage } from "../../utils/localStorage";

interface JobsState {
  jobs: Job[];
}

const JOBS_STORAGE_KEY = "jobs";

const initialState: JobsState = {
  jobs: [],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    loadJobs(state) {
      state.jobs = loadFromStorage<Job[]>(JOBS_STORAGE_KEY) || [];
    },
    addJob(state, action: PayloadAction<Omit<Job, "id" | "postedDate">>) {
      const newJob: Job = {
        ...action.payload,
        id: uuidv4(),
        postedDate: new Date().toISOString(),
      };
      state.jobs.push(newJob);
      saveToStorage(JOBS_STORAGE_KEY, state.jobs);
    },
    updateJob(state, action: PayloadAction<Job>) {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
        saveToStorage(JOBS_STORAGE_KEY, state.jobs);
      }
    },
    deleteJob(state, action: PayloadAction<string>) {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      saveToStorage(JOBS_STORAGE_KEY, state.jobs);
    },
  },
});

export const { addJob, updateJob, deleteJob, loadJobs } = jobsSlice.actions;
export default jobsSlice.reducer;

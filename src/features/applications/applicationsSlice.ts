import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Application, ApplicationStatus } from "../../types";
import { saveToStorage, loadFromStorage } from "../../utils/localStorage";

interface ApplicationsState {
  applications: Application[];
}

const APPLICATIONS_STORAGE_KEY = "applications";

const initialState: ApplicationsState = {
  applications: [],
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    loadApplications(state) {
      state.applications =
        loadFromStorage<Application[]>(APPLICATIONS_STORAGE_KEY) || [];
    },
    addApplication(
      state,
      action: PayloadAction<
        Omit<Application, "id" | "applicationDate" | "status">
      >
    ) {
      const newApplication: Application = {
        ...action.payload,
        id: uuidv4(),
        applicationDate: new Date().toISOString(),
        status: "Pending",
      };
      state.applications.push(newApplication);
      saveToStorage(APPLICATIONS_STORAGE_KEY, state.applications);
    },
    updateApplicationStatus(
      state,
      action: PayloadAction<{ id: string; status: ApplicationStatus }>
    ) {
      const index = state.applications.findIndex(
        (app) => app.id === action.payload.id
      );
      if (index !== -1) {
        state.applications[index].status = action.payload.status;
        saveToStorage(APPLICATIONS_STORAGE_KEY, state.applications);
      }
    },
  },
});

export const { addApplication, loadApplications, updateApplicationStatus } =
  applicationsSlice.actions;
export default applicationsSlice.reducer;

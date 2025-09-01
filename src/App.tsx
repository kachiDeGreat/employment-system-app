import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppNavbar } from "./components/common/AppNavbar";
import { AppFooter } from "./components/common/AppFooter";
import AppRoutes from "./routing/AppRoutes";
import { useAppDispatch } from "./app/hooks";
import { loadStateFromLocalStorage } from "./features/auth/authSlice";
import { loadJobs } from "./features/jobs/jobsSlice";
import { loadApplications } from "./features/applications/applicationsSlice";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On app start, load all persisted data into Redux store
    dispatch(loadStateFromLocalStorage());
    dispatch(loadJobs());
    dispatch(loadApplications());

    // Simulate initial data fetch for a better user experience
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second loading screen
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--background-secondary)",
            color: "var(--text-primary)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      />
      <AppNavbar />
      <main className="container my-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
      </main>
      <AppFooter />
    </>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import React, { Suspense, lazy } from "react";

import AllPagesIndex from "./pages/AllPagesIndex";
import LoginScreen from "./pages/LoginScreen";
import RegisterModalScreen from "./pages/RegisterModalScreen";
import NotFound from "./pages/NotFound";

const TermsAndConditionsSheetScreen = lazy(() => import("./pages/TermsAndConditionsSheetScreen"));
const SelectUserTypeScreen = lazy(() => import("./pages/SelectUserTypeScreen"));
const PersonalDetailsScreen = lazy(() => import("./pages/PersonalDetailsScreen"));
const CompanyDetailsScreen = lazy(() => import("./pages/CompanyDetailsScreen"));
const WorkExperienceUploadScreen = lazy(() => import("./pages/WorkExperienceUploadScreen"));
const RegistrationProcessingScreen = lazy(() => import("./pages/RegistrationProcessingScreen"));
const DashboardScreen = lazy(() => import("./pages/DashboardScreen"));
const ClientsListScreen = lazy(() => import("./pages/ClientsListScreen"));
const ClientDetailsScreen = lazy(() => import("./pages/ClientDetailsScreen"));
const PropertiesScreen = lazy(() => import("./pages/PropertiesScreen"));
const TaskDetailsScreen = lazy(() => import("./pages/TaskDetailsScreen"));
const TaskDetailsCompletedScreen = lazy(() => import("./pages/TaskDetailsCompletedScreen"));
const TaskDetailsOngoingActionsScreen = lazy(() => import("./pages/TaskDetailsOngoingActionsScreen"));
const EstimateStartScreen = lazy(() => import("./pages/EstimateStartScreen"));
const EstimateListScreen = lazy(() => import("./pages/EstimateListScreen"));
const EstimateStepFormScreen = lazy(() => import("./pages/EstimateStepFormScreen"));
const EstimateProcessFlowScreen = lazy(() => import("./pages/EstimateProcessFlowScreen"));
const LeadDashboardScreen = lazy(() => import("./pages/LeadDashboardScreen"));
const LeadStatusListScreen = lazy(() => import("./pages/LeadStatusListScreen"));
const LeadAddOrganizationScreen = lazy(() => import("./pages/LeadAddOrganizationScreen"));
const PaymentsScreen = lazy(() => import("./pages/PaymentsScreen"));
const RequestFormScreen = lazy(() => import("./pages/RequestFormScreen"));
const RequestPendingListScreen = lazy(() => import("./pages/RequestPendingListScreen"));
const SettingsScreen = lazy(() => import("./pages/SettingsScreen"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<AllPagesIndex />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterModalScreen />} />

            <Route path="/terms" element={<ProtectedRoute><TermsAndConditionsSheetScreen /></ProtectedRoute>} />
            <Route path="/select-type" element={<ProtectedRoute><SelectUserTypeScreen /></ProtectedRoute>} />
            <Route path="/personal-details" element={<ProtectedRoute><PersonalDetailsScreen /></ProtectedRoute>} />
            <Route path="/company-details" element={<ProtectedRoute><CompanyDetailsScreen /></ProtectedRoute>} />
            <Route path="/work-experience" element={<ProtectedRoute><WorkExperienceUploadScreen /></ProtectedRoute>} />
            <Route path="/registration-processing" element={<ProtectedRoute><RegistrationProcessingScreen /></ProtectedRoute>} />

            <Route path="/dashboard" element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>} />
            <Route path="/clients" element={<ProtectedRoute><ClientsListScreen /></ProtectedRoute>} />
            <Route path="/client-details" element={<ProtectedRoute><ClientDetailsScreen /></ProtectedRoute>} />
            <Route path="/properties" element={<ProtectedRoute><PropertiesScreen /></ProtectedRoute>} />
            <Route path="/task-details" element={<ProtectedRoute><TaskDetailsScreen /></ProtectedRoute>} />
            <Route path="/task-details-completed" element={<ProtectedRoute><TaskDetailsCompletedScreen /></ProtectedRoute>} />
            <Route path="/task-details-actions" element={<ProtectedRoute><TaskDetailsOngoingActionsScreen /></ProtectedRoute>} />
            <Route path="/estimate-start" element={<ProtectedRoute><EstimateStartScreen /></ProtectedRoute>} />
            <Route path="/estimate-list" element={<ProtectedRoute><EstimateListScreen /></ProtectedRoute>} />
            <Route path="/estimate-step-form" element={<ProtectedRoute><EstimateStepFormScreen /></ProtectedRoute>} />
            <Route path="/estimate-process-flow" element={<ProtectedRoute><EstimateProcessFlowScreen /></ProtectedRoute>} />
            <Route path="/lead-dashboard" element={<ProtectedRoute><LeadDashboardScreen /></ProtectedRoute>} />
            <Route path="/lead-status" element={<ProtectedRoute><LeadStatusListScreen /></ProtectedRoute>} />
            <Route path="/lead-add" element={<ProtectedRoute><LeadAddOrganizationScreen /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute><PaymentsScreen /></ProtectedRoute>} />
            <Route path="/request-form" element={<ProtectedRoute><RequestFormScreen /></ProtectedRoute>} />
            <Route path="/request-pending" element={<ProtectedRoute><RequestPendingListScreen /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

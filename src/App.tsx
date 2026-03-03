import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import AllPagesIndex from "./pages/AllPagesIndex";
import LoginScreen from "./pages/LoginScreen";
import RegisterModalScreen from "./pages/RegisterModalScreen";
import TermsAndConditionsSheetScreen from "./pages/TermsAndConditionsSheetScreen";
import SelectUserTypeScreen from "./pages/SelectUserTypeScreen";
import PersonalDetailsScreen from "./pages/PersonalDetailsScreen";
import CompanyDetailsScreen from "./pages/CompanyDetailsScreen";
import WorkExperienceUploadScreen from "./pages/WorkExperienceUploadScreen";
import RegistrationProcessingScreen from "./pages/RegistrationProcessingScreen";
import DashboardScreen from "./pages/DashboardScreen";
import ClientsListScreen from "./pages/ClientsListScreen";
import ClientDetailsScreen from "./pages/ClientDetailsScreen";
import PropertiesScreen from "./pages/PropertiesScreen";
import TaskDetailsScreen from "./pages/TaskDetailsScreen";
import TaskDetailsCompletedScreen from "./pages/TaskDetailsCompletedScreen";
import TaskDetailsOngoingActionsScreen from "./pages/TaskDetailsOngoingActionsScreen";
import EstimateStartScreen from "./pages/EstimateStartScreen";
import EstimateListScreen from "./pages/EstimateListScreen";
import EstimateStepFormScreen from "./pages/EstimateStepFormScreen";
import EstimateProcessFlowScreen from "./pages/EstimateProcessFlowScreen";
import LeadDashboardScreen from "./pages/LeadDashboardScreen";
import LeadStatusListScreen from "./pages/LeadStatusListScreen";
import LeadAddOrganizationScreen from "./pages/LeadAddOrganizationScreen";
import PaymentsScreen from "./pages/PaymentsScreen";
import RequestFormScreen from "./pages/RequestFormScreen";
import RequestPendingListScreen from "./pages/RequestPendingListScreen";
import SettingsScreen from "./pages/SettingsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

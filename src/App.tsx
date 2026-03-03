import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllPagesIndex />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterModalScreen />} />
          <Route path="/terms" element={<TermsAndConditionsSheetScreen />} />
          <Route path="/select-type" element={<SelectUserTypeScreen />} />
          <Route path="/personal-details" element={<PersonalDetailsScreen />} />
          <Route path="/company-details" element={<CompanyDetailsScreen />} />
          <Route path="/work-experience" element={<WorkExperienceUploadScreen />} />
          <Route path="/registration-processing" element={<RegistrationProcessingScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/clients" element={<ClientsListScreen />} />
          <Route path="/client-details" element={<ClientDetailsScreen />} />
          <Route path="/properties" element={<PropertiesScreen />} />
          <Route path="/task-details" element={<TaskDetailsScreen />} />
          <Route path="/task-details-completed" element={<TaskDetailsCompletedScreen />} />
          <Route path="/task-details-actions" element={<TaskDetailsOngoingActionsScreen />} />
          <Route path="/estimate-start" element={<EstimateStartScreen />} />
          <Route path="/estimate-list" element={<EstimateListScreen />} />
          <Route path="/estimate-step-form" element={<EstimateStepFormScreen />} />
          <Route path="/estimate-process-flow" element={<EstimateProcessFlowScreen />} />
          <Route path="/lead-dashboard" element={<LeadDashboardScreen />} />
          <Route path="/lead-status" element={<LeadStatusListScreen />} />
          <Route path="/lead-add" element={<LeadAddOrganizationScreen />} />
          <Route path="/payments" element={<PaymentsScreen />} />
          <Route path="/request-form" element={<RequestFormScreen />} />
          <Route path="/request-pending" element={<RequestPendingListScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

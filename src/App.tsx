import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskDetailsCompletedScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/registration-processing" element={<RegistrationProcessingScreen />} />
          <Route path="/work-experience" element={<WorkExperienceUploadScreen />} />
          <Route path="/company-details" element={<CompanyDetailsScreen />} />
          <Route path="/personal-details" element={<PersonalDetailsScreen />} />
          <Route path="/select-type" element={<SelectUserTypeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterModalScreen />} />
          <Route path="/terms" element={<TermsAndConditionsSheetScreen />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

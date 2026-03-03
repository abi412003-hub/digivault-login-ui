import { Link } from "react-router-dom";

const pages = [
  { path: "/login", label: "Login" },
  { path: "/register", label: "Register Modal" },
  { path: "/terms", label: "Terms & Conditions" },
  { path: "/select-type", label: "Select User Type" },
  { path: "/personal-details", label: "Personal Details" },
  { path: "/company-details", label: "Company Details" },
  { path: "/work-experience", label: "Work Experience Upload" },
  { path: "/registration-processing", label: "Registration Processing" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/clients", label: "Clients List" },
  { path: "/client-details", label: "Client Details" },
  { path: "/properties", label: "Properties" },
  { path: "/task-details", label: "Task Details (Ongoing)" },
  { path: "/task-details-completed", label: "Task Details (Completed)" },
  { path: "/task-details-actions", label: "Task Details (Upload/Approve)" },
  { path: "/estimate-start", label: "Estimate Start" },
  { path: "/estimate-list", label: "Estimate List" },
  { path: "/estimate-step-form", label: "Estimate Step Form" },
  { path: "/estimate-process-flow", label: "Estimate Process Flow" },
  { path: "/lead-dashboard", label: "Lead Dashboard" },
  { path: "/lead-status", label: "Lead Status List" },
  { path: "/lead-add", label: "Add New Lead (Organization)" },
  { path: "/payments", label: "Payments / Transactions" },
  { path: "/request-form", label: "Request Form" },
  { path: "/request-pending", label: "Request Pending List" },
];

const AllPagesIndex = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center">
    <div className="w-full max-w-[420px] bg-white min-h-screen px-5 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">All Screens</h1>
      <p className="text-sm text-gray-500 mb-5">{pages.length} pages</p>
      <div className="space-y-2">
        {pages.map((p) => (
          <Link
            key={p.path}
            to={p.path}
            className="block w-full text-left px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
          >
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default AllPagesIndex;

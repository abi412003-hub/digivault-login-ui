import { useState } from "react";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";

const LoginScreen = () => {
  const [mobile, setMobile] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#F3F4F6" }}>
      <div className="w-full max-w-[420px]">
        {/* Top Section */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800">Welcome to e-DigiVault</h1>
          <p className="text-sm text-gray-500 mt-1">Secure Access to Documents</p>
        </div>

        {/* Form Section */}
        <div className="mt-8">
          <label className="block text-sm text-gray-700 mb-2">Enter Your Mobile Number</label>
          <InputField value={mobile} onChange={setMobile} />
        </div>

        {/* Button */}
        <div className="mt-6">
          <PrimaryButton label="Login" onClick={() => console.log("Login clicked")} />
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            className="text-blue-600 font-medium underline cursor-pointer"
            onClick={() => console.log("Register clicked")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;

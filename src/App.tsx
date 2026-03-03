import { BrowserRouter, Routes, Route } from "react-router-dom";

const TestPage = () => (
  <div style={{ padding: 40 }}>
    <h1>App is working!</h1>
    <p>If you see this, the base app loads fine.</p>
    <a href="/login">Go to Login</a>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<TestPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;

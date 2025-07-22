import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import HomePage from "./pages/home";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<HomePage />} path="/home" />
    </Routes>
  );
}

export default App;

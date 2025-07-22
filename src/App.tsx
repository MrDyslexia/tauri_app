import { Route, Routes, useLocation } from "react-router-dom";
import IndexPage from "@/pages/index";
import HomePage from "./pages/home";
import { AnimatePresence } from "framer-motion";
function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="popLayout">
      <Routes location={location} key={location.pathname}>
      <Route element={<IndexPage />} path="/" />
      <Route element={<HomePage />} path="/home" />
    </Routes>
    </AnimatePresence>
  );
}

export default App;

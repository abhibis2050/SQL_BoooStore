import { Routes as RoutePath, Route } from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
const Routes = () => {
  return (
    <RoutePath>
      <Route path="/" element={<Books/>} />
      <Route path="/add" element={<Add/>} />
      <Route path="/update/:id" element={<Update/>} />
    </RoutePath>
  );
};

export default Routes;

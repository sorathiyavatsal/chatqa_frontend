import { Suspense } from "react";
import './App.css';
import CustomeRoutes from "./routes/CustomeRoutes";

function App() {
  return (
    <>
      <Suspense >
        <CustomeRoutes />
      </Suspense>
    </>
  );
}

export default App;

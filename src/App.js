import { Suspense } from "react";
import './App.css';
import CustomeRoutes from "./routes/CustomeRoutes";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const PUBLIC_KEY = "pk_test_51NPi4cSEP6F56SdoZnKDVdSpTfyH1YfWabMrkbihqxTCCpSHYxBv8o0C9EOXUVvz0HBmjPRWRxa78E4c2ueYLWww00dIAXJnOU"
const stripeTestPromise = loadStripe(PUBLIC_KEY)
function App() {
  return (
    <>
      <Elements stripe={stripeTestPromise}>
        <Suspense >
          <CustomeRoutes />
        </Suspense>
      </Elements>
    </>
  );
}

export default App;

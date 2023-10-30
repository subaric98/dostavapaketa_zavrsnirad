import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeliveryList from "./components/DeliveryList";
import DeliveryEdit from "./components/DeliveryEdit";
import CreateDelivery from "./components/CreateDelivery";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DeliveryList />} />
        <Route path="/delivery/:deliveryId" element={<DeliveryEdit />} />
        <Route path="/create-delivery" element={<CreateDelivery />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;

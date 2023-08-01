import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import LoginComponent from "./components/LoginComponent";
import FormComponent2 from "./components/Justui";

import LoginForm2 from "./components/admintry";
import Show from "./components/Show";
import Navbar from "./components/Navbar";
import AutoPhoneApp from "./components/AutoPhoneApp";
import Edit from "./components/Edit";
import CustomRadioButton from "./components/CustomRadioBtn";
import View from "./components/View";

function App() {
  //const apiEndpoint = "/api/login";
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* <Route
            path="/"
            element={<FormComponent apiEndpoint={apiEndpoint} />}
          /> */}
          <Route path="/" element={<FormComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/admin" element={<LoginForm2 />} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<View />} />

          {/* <Route path="/view" element={<View />} /> */}

          <Route path="/justui" element={<FormComponent2 />} />
          <Route path="/show" element={<Show />} />
          <Route path="/try" element={<AutoPhoneApp />} />
          <Route path="/radio" element={<CustomRadioButton />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

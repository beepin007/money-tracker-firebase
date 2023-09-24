import logo from "./logo.svg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";
import { MoneyTracker } from "./pages/expense-tracker";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="money-tracker" element={<MoneyTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

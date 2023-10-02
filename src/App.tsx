import "./index.css";
import { Private } from "./routes/prived";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/inicial";
import { Admin } from "./pages/home/admin";
import { Erro } from "./pages/home/erro";
import { Login } from "./pages/home/login";
import { RedesSociais } from "./pages/home/redes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              <Private>
                <Admin />{" "}
              </Private>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Erro />} />
          <Route path="/redes" element={<RedesSociais />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

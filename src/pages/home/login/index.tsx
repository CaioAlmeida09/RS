import { Link } from "react-router-dom";
import { Input } from "../../../components/social/social/input/index";
import { useState } from "react";
import { auth } from "../../../service/firebaseconection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function HandleInput() {
    if (email === "" || password === "") {
      alert("Preencha os campos corretamentes");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        alert("E-mail ou senha estão incorretos incorreto");
      });
    console.log({ email, password });
  }
  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center p-6 gap-9">
      <Link to={"/"}>
        <h1 className="text-6xl text-gray-50 mb-3 ">
          Dev<span className="text-blue-400">Project</span>{" "}
        </h1>
      </Link>
      <Input
        placeholder="Digite seu e-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
      />
      <Input
        placeholder="******"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      />
      <button
        onClick={HandleInput}
        className="bg-cyan-600 text-white px-20 py-3 rounded-md cursor-pointer "
      >
        Acessar{" "}
      </button>
    </div>
  );
}

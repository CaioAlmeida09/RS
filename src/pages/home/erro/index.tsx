import { Link } from "react-router-dom";
export function Erro() {
  return (
    <>
      <div className=" flex flex-col text-white font-medium items-center justify-start mt-20 gap-5 p-8">
        <h1> 404</h1>
        <h2> Página não encontrada</h2>
        <Link to="/">
          <button className="bg-red-700 text-xs px-8 py-4 rounded-md border-0">
            {" "}
            Volte para Home
          </button>
        </Link>
      </div>
    </>
  );
}

import { Header } from "../../../components/header";
import { Input } from "../../../components/social/social/input";
import { useState, useEffect } from "react";
import { db } from "../../../service/firebaseconection";
import { setDoc, doc, getDoc } from "firebase/firestore";
export function RedesSociais() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function LoadingLinks() {
      const docRef = doc(db, "Social", "links");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      });
    }
    LoadingLinks();
  }, []);
  function HandleRegister() {
    setDoc(doc(db, "Social", "links"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        console.log("Cadastrado com sucesso");
        setFacebook("");
      })
      .catch((error) => {
        console.log("Erro no cadastro" + error);
      });
  }
  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen">
      <Header />

      <div className=" w-screen gap-4 flex flex-col items-center justify-center px-4 py-3  text-white">
        <h1 className="font-medium mt-3 mb-4 text-lg"> Minhas Redes Sociais</h1>
        <section className="w-screen gap-4 flex flex-col items-center justify-center px-3 py-3 text-black">
          <label className="text-white"> Link Facebook </label>
          <Input
            placeholder="Digite a URL do Facebook"
            type="url"
            onChange={(e) => setFacebook(e.target.value)}
            value={facebook}
          />
          <label className="text-white"> Link Instagram </label>
          <Input
            placeholder="Digite a URL do instagram"
            type="url"
            onChange={(e) => setInstagram(e.target.value)}
            value={instagram}
          />
          <label className="text-white"> Link Youtube</label>
          <Input
            placeholder="Digite a URL do Youtube"
            type="url"
            onChange={(e) => setYoutube(e.target.value)}
            value={youtube}
          />
          <button
            type="submit"
            className="text-white bg-blue-600 h-9 rounded-md flex items-center justify-center px-10 mt-4 cursor-pointer font-medium "
            onClick={HandleRegister}
          >
            {" "}
            Salvar Links{" "}
          </button>
        </section>
      </div>
    </div>
  );
}

import { BsLink } from "react-icons/bs";
import { Header } from "../../../components/header/index";
import { Input } from "../../../components/social/social/input/index";
import { useState, useEffect } from "react";
import { BiSolidTrash } from "react-icons/bi";
import { db } from "../../../service/firebaseconection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

export function Admin() {
  interface listaProps {
    name: string;
    url: string;
    bg: string;
    text: string;
    id: string;
  }
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [textLink, setTextLink] = useState("#ffffff");
  const [colorLink, setColorLink] = useState("#000000");
  const [links, setLinks] = useState<listaProps[]>([]);

  useEffect(() => {
    const LinkRef = collection(db, "Links");
    const QueryRef = query(LinkRef, orderBy("created", "asc"));

    const unsub = onSnapshot(QueryRef, (snapshot) => {
      const lista = [] as listaProps[];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          text: doc.data().text,
        });
      });

      setLinks(lista);
    });

    return () => {};
  }, []);

  function HandleButton() {
    if (name === "" || url === "") {
      alert(" Preencha todos os campos ");
      return;
    }

    addDoc(collection(db, "Links"), {
      name: name,
      url: url,
      bg: colorLink,
      text: textLink,
      created: new Date(),
    })
      .then(() => {
        setName(""), setUrl("");
        console.log("cadastrado com sucesso");
      })
      .catch((error) => {
        console.log("erro ao cadastrar" + error);
      });
  }
  async function Delete(id: string) {
    const docRef = doc(db, "Links", id);
    await deleteDoc(docRef);
  }
  return (
    <>
      <div className="px-5 py-1 flex justify-center items-center flex-col">
        <Header />
        <div className="flex justify-start items-center flex-col w-3/4 mt-11 gap-4">
          <label className="text-white"> Nome do Link </label>
          <Input
            className=" md:md:w-2/3 w-full h-10"
            placeholder="Digite o nome do link"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label className="text-white"> URL do Link </label>
          <Input
            onChange={(e) => setUrl(e.target.value)}
            className=" md:w-2/3 w-full h-10"
            type="url"
            placeholder="Digite a sua URL"
            value={url}
          />
          <section className="flex text-white mt-10 gap-4 justify-center items-center md:text-lg text-xs">
            <label>Fundo do link: </label>
            <input
              onChange={(e) => setColorLink(e.target.value)}
              type="color"
              value={colorLink}
            />
            <label>Cor do Link: </label>
            <input
              onChange={(e) => setTextLink(e.target.value)}
              type="color"
              value={textLink}
            ></input>
          </section>
          <button
            onClick={HandleButton}
            className="bg-blue-700 w-2/3 h-9 mt-6 text-white flex justify-center items-center gap-4"
          >
            Cadastrar{" "}
            <span>
              {" "}
              <BsLink size={30} />
            </span>
          </button>
        </div>
        {name !== "" && (
          <div
            className="flex flex-col c mt-9 lex justify-center items-center p-1 border-gray-100 border rounder w-2/5"
            style={{ backgroundColor: colorLink }}
          >
            <label className="text-white font-medium mt-2 mb-2">
              Veja como está ficando:
              <article className="flex items-center justify-center mt-9 mb-3">
                <p className="text-3xl" style={{ color: textLink }}>
                  {" "}
                  {name}
                </p>
              </article>
            </label>
          </div>
        )}
        <h2 className="font-bold text-white tex-xl mt-8"> Meus Links </h2>
        {links.map((link) => (
          <article
            key={link.id}
            className="flex items-center justify-between px-5 py-3 text-white w-2/3 max-w-screen-sm mt-4 "
            style={{ backgroundColor: link.bg, color: link.text }}
          >
            <p> {link.name} </p>
            <button onClick={() => Delete(link.id)}>
              <BiSolidTrash size={20} />{" "}
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

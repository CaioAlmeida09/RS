import { Social } from "../../../components/social/social/index";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Header } from "../../../components/header";
import { db } from "../../../service/firebaseconection";
import {
  query,
  orderBy,
  getDocs,
  getDoc,
  collection,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export function Home() {
  interface listaProps {
    url: string;
    bg: string;
    text: string;
    id: string;
    name: string;
  }
  interface SocialListaProps {
    facebook: string;
    instagram: string;
    youtube: string;
  }
  const [links, setLinks] = useState<listaProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialListaProps>();

  useEffect(() => {
    const refDoc = collection(db, "Links");
    const queryRef = query(refDoc, orderBy("created", "asc"));
    getDocs(queryRef).then((snapshot) => {
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
      console.log(links);
    });
  }, []);
  useEffect(() => {
    function loadingSocialLinks() {
      const DocRef = doc(db, "Social", "links");
      getDoc(DocRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }
    loadingSocialLinks();
  }, []);
  return (
    <div className="flex justify-start items-center flex-col">
      <Header />
      <section className=" h-screen flex flex-col items-center justify-start mt-10 p-6">
        <h1 className="text-2xl text-white mb-2">
          Caio Vinicius Galindo de Almeida{" "}
        </h1>
        <p className="text-white text-lg "> Veja meus links 👇 </p>

        {links.map((link) => (
          <section
            key={link.id}
            className="mt-8 flex flex-col justify-center items-center px-7 max-w-xl w-11/12"
          >
            <a
              target="_blank"
              style={{ backgroundColor: link.bg }}
              href={link.url}
              className=" w-full h-12 bg-red-600 rounded-lg cursor-pointer flex flex-col justify-center items-center"
            >
              <p
                style={{ color: link.text }}
                className="text-white md:text-lg text-xs"
              >
                {link.name}
              </p>
            </a>
          </section>
        ))}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex gap-6 mt-6 ">
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={30} color="#fff" />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={30} color="#fff" />
            </Social>
            <Social url={socialLinks?.youtube}>
              <FaYoutube size={30} color="#fff" />
            </Social>
          </footer>
        )}
      </section>
    </div>
  );
}

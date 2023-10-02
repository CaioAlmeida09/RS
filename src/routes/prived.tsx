import { auth } from "../service/firebaseconection";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useState, useEffect } from "react";
import { Navigate, useActionData } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): any {
  const [loading, setLoading] = useState(true);
  const [sign, setSign] = useState(false);

  useEffect(() => {}, []);
  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user?.uid,
        email: user?.email,
      };
      localStorage.setItem("@reactLinks", JSON.stringify(userData));
      setLoading(false);
      setSign(true);
    } else {
      setSign(false);
      setLoading(false);
    }
  });

  if (loading) {
    return <> </>;
  }
  if (sign === false) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

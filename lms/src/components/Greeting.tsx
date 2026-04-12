"use client";
import { useEffect, useState } from "react";

export function Greeting() {
  const [greeting, setGreeting] = useState("Bienvenue");

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) setGreeting("Bonjour 👋");
    else if (h >= 12 && h < 18) setGreeting("Bon après-midi 👋");
    else setGreeting("Bonsoir 👋");
  }, []);

  return <span>{greeting}</span>;
}

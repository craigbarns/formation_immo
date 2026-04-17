"use client";
import { useState } from "react";

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Bonjour 👋";
  if (h >= 12 && h < 18) return "Bon après-midi 👋";
  return "Bonsoir 👋";
}

export function Greeting() {
  const [greeting] = useState(getGreeting);
  return <span>{greeting}</span>;
}

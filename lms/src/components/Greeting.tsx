"use client";
import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

function getGreetingText() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Bonjour";
  if (h >= 12 && h < 18) return "Bon après-midi";
  return "Bonsoir";
}

export function Greeting() {
  const [text] = useState(getGreetingText);
  return (
    <span className="inline-flex items-center gap-1.5">
      {text}
      <EmojiIcon emoji="👋" className="h-4 w-4" />
    </span>
  );
}

import { redirect } from "next/navigation";

/** Ancienne route HeyGen — les vidéos passent par D-ID. */
export default function MarieHeygenRedirectPage() {
  redirect("/formation/marie-did");
}

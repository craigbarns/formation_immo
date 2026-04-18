import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supports visuels & fiches",
  description:
    "Infographies interactives : investissement, négociation, financement, fiscalité et parcours juridique.",
};

export default function SupportsVisuelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

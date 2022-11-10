"use client";

import "@styles/tailwind.css";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function WebAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segmentNames: {
    register: string;
    game: string;
    stats: string;
  } = {
    register: "Registration Form",
    game: "Game Logger",
    stats: "STATS :D",
  };

  // use the active route as the heading sub-title
  const segment = useSelectedLayoutSegment() as keyof typeof segmentNames;
  return (
    <html>
      <head></head>
      <body className="flex w-screen justify-center">
        <div id="container" className="w-full max-w-xl p-4">
          <Link
            href="/"
            id="heading"
            className="flex flex-col rounded-xl pt-4 pb-4"
          >
            <span className="mb-2 text-4xl font-semibold">
              Vincit Table Tennis
            </span>
            <span className="text-2xl">
              {(segment && segmentNames[segment]) ?? ""}
            </span>
          </Link>
          {children}
        </div>
      </body>
    </html>
  );
}

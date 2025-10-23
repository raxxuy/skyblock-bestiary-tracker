"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex w-fit flex-col gap-2">
      <div className="flex max-w-fit gap-2 rounded-xl bg-zinc-800 p-4 text-lg">
        <h1>{title}</h1>
        <button
          type="button"
          className="hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      {isOpen && (
        <div className="rounded-xl bg-neutral-900 p-4">{children}</div>
      )}
    </div>
  );
}

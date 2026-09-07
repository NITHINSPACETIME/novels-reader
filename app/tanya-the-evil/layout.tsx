import React from "react";

export default function TanyaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tanya-theme min-h-screen bg-[#0a0a0f] text-[#f0e6d6]">
      {children}
    </div>
  );
}

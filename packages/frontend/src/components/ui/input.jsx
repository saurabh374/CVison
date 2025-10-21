import React from "react";

export function Input({ icon: Icon, className, ...props }) {
  return (
    <div className={`flex items-center gap-3 bg-white border border-gray-200 rounded px-3 py-2 ${className || ""}`}>
      {Icon ? <Icon className="text-gray-400" /> : null}
      <input
        className="w-full text-sm outline-none placeholder-gray-400"
        {...props}
      />
    </div>
  );
}

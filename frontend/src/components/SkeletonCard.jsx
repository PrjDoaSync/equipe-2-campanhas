import React from "react";

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-0 overflow-hidden animate-pulse flex flex-col">
      <div className="h-48 w-full bg-slate-200" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-3.5 w-24 bg-slate-200 rounded-md mb-3" />
          <div className="h-5 w-4/5 bg-slate-200 rounded-md mb-2" />
          <div className="h-5 w-3/5 bg-slate-200 rounded-md mb-3" />
          <div className="h-3.5 w-full bg-slate-100 rounded-md mb-1.5" />
          <div className="h-3.5 w-2/3 bg-slate-100 rounded-md" />
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="h-2.5 w-full bg-slate-200 rounded-full mb-3" />
          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-20 bg-slate-200 rounded-md" />
            <div className="h-4 w-16 bg-slate-200 rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 w-full bg-slate-100 rounded-xl" />
            <div className="h-9 w-full bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

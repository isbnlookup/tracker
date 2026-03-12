"use client";

import { useEffect, useState } from "react";
import { DocumentDuplicateIcon, ArrowPathIcon, KeyIcon } from "@heroicons/react/24/outline";

interface HistoryItem {
  isbn: string;
  viewed_at: string;
}

export default function Home() {
  const [currentIsbn, setCurrentIsbn] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
        if (data.history && data.history.length > 0) {
          setCurrentIsbn(data.history[0].isbn);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const revealIsbn = async () => {
    setLoading(true);
    setError(null);
    setCopied(false);
    try {
      const res = await fetch("/api/reveal", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setCurrentIsbn(data.isbn);
        await fetchHistory(); // update the list
      } else {
        const data = await res.json();
        setError(data.error || "Failed to reveal ISBN");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (currentIsbn) {
      navigator.clipboard.writeText(currentIsbn);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-white text-slate-800 flex flex-col items-center py-8 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl w-full flex flex-col gap-8 sm:gap-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-[#0883c3]/10 rounded-full mb-2 sm:mb-4 ring-1 ring-[#0883c3]/30">
            <KeyIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#0883c3]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            ISBN Code Vault
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto px-2">
            Securely reveal and claim unique ISBN codes. Each code is strictly issued exactly once.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-slate-200/50">
          
          <div className="flex flex-col items-center text-center space-y-8 sm:space-y-10">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-200 w-full text-sm sm:text-base font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4 w-full">
              <label className="text-xs sm:text-sm font-bold text-[#0883c3] uppercase tracking-widest block text-left sm:text-center w-full">
                Your Unique ISBN Code
              </label>
              <div className="flex items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 min-h-[140px] shadow-inner transition-all">
                {loading ? (
                  <div className="flex flex-col items-center text-[#0883c3] gap-3">
                    <ArrowPathIcon className="w-8 h-8 sm:w-10 sm:h-10 animate-spin" />
                    <span className="text-sm font-semibold opacity-80">Generating securely...</span>
                  </div>
                ) : currentIsbn ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <span className="text-3xl sm:text-5xl md:text-6xl font-mono font-bold tracking-wider text-slate-900 break-all text-center">
                      {currentIsbn}
                    </span>
                    <button 
                      onClick={handleCopy} 
                      className="p-3 sm:p-4 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 rounded-xl transition-all group outline-none focus:ring-2 focus:ring-[#0883c3] focus:border-transparent shadow-sm w-full sm:w-auto flex justify-center items-center gap-2"
                      aria-label="Copy to clipboard"
                    >
                      {copied ? (
                        <>
                          <DocumentDuplicateIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                          <span className="text-green-600 font-bold text-sm sm:text-base block sm:hidden">Copied!</span>
                          <span className="text-green-600 font-bold text-sm sm:text-base hidden sm:block absolute -top-8 bg-green-100 px-2 py-1 rounded">Copied!</span>
                        </>
                      ) : (
                        <>
                          <DocumentDuplicateIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0883c3] group-hover:scale-110 transition-transform" />
                          <span className="text-slate-700 font-semibold text-sm sm:text-base block sm:hidden">Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <span className="text-lg sm:text-xl text-slate-400 font-medium italic">
                    Tap to reveal your first code
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 pt-2">
              {!currentIsbn && history.length === 0 ? (
                <button
                  onClick={revealIsbn}
                  disabled={loading}
                  className="w-full bg-[#0883c3] hover:bg-[#066a9e] text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl shadow-lg shadow-[#0883c3]/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg flex justify-center items-center gap-2"
                >
                  <KeyIcon className="w-5 h-5 sm:w-6 sm:h-6 hidden sm:block opacity-80" />
                  Reveal Secure Code
                </button>
              ) : (
                <button
                  onClick={revealIsbn}
                  disabled={loading}
                  className="w-full bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold py-4 px-6 sm:px-8 rounded-xl border-2 border-[#0883c3] shadow-md transition-all transform hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
                >
                  <ArrowPathIcon className={`w-5 h-5 sm:w-6 sm:h-6 text-[#0883c3] ${loading ? "animate-spin" : ""}`} />
                  Regenerate Next ISBN
                </button>
              )}
            </div>
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-4 sm:mt-8 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-3">
              <span className="w-8 h-px bg-slate-200 hidden sm:inline-block"></span>
              Your History
              <span className="sm:flex-1 h-px bg-slate-200 hidden sm:inline-block"></span>
            </h3>
            
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-sm">
              {history.map((item, index) => (
                <div key={item.isbn} className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 transition-colors hover:bg-slate-50 ${currentIsbn === item.isbn ? 'bg-[#0883c3] bg-opacity-5 border-l-4 border-[#0883c3] shadow-inner' : 'border-l-4 border-transparent'}`}>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm font-bold text-[#0883c3] w-auto sm:w-8">#{history.length - index}</span>
                    <span className="font-mono text-base sm:text-lg text-slate-700 font-bold tracking-wide">{item.isbn}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">
                    {new Date(item.viewed_at + 'Z').toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

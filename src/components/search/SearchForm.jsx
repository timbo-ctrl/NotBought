import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Tag } from "lucide-react";

export default function SearchForm({ onSearch, isLoading, searchTerm, setSearchTerm, location, setLocation }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    
    onSearch({
      location: location.trim(),
      searchTerm: searchTerm.trim()
    });
  };

  return (
    <div
      className="bg-gradient-to-br from-white/95 via-amber-50/80 to-orange-50/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-200/60 p-8 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Find Independent Businesses</h2>
        <p className="text-stone-600">Search for local services that aren't owned by private equity</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input
              type="text"
              placeholder="Enter city, neighborhood, or ZIP code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-12 py-4 text-lg rounded-2xl border-amber-200 focus:border-emerald-400 focus:ring-emerald-400/20 bg-white/90"
              required
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
              </div>
            )}
          </div>

          <div className="relative">
            <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input
              type="text"
              placeholder="e.g., 'family dentist', 'cafe', 'auto shop'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-2xl border-amber-200 focus:border-emerald-400 focus:ring-emerald-400/20 bg-white/90"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !location.trim()}
          className="w-full relative overflow-hidden py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:bg-emerald-800"
        >
          {/* Progress bar container and animation */}
          {isLoading && (
            <>
              <div className="absolute top-0 left-0 h-full w-full bg-emerald-700/60">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  style={{ animation: 'progress-fill 18s ease-out forwards' }}
                />
              </div>
              <style jsx>{`
                @keyframes progress-fill {
                  from { width: 0%; }
                  to { width: 100%; }
                }
              `}</style>
            </>
          )}
          
          {/* Text and spinner on top of the bar */}
          <div className="relative flex items-center justify-center gap-3 z-10">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>AI is searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search Local Services</span>
              </>
            )}
          </div>
        </Button>
      </form>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import BusinessCard from "../components/search/BusinessCard";

export default function Favorites() {
  const [savedBusinesses, setSavedBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from local storage
    const loadedFavorites = localStorage.getItem("notbought_favorites");
    if (loadedFavorites) {
      setSavedBusinesses(JSON.parse(loadedFavorites));
    }
    setIsLoading(false);
  }, []);

  const handleToggleSave = (business) => {
    const newSavedList = savedBusinesses.filter(
      b => !(b.name === business.name && b.address === business.address)
    );
    setSavedBusinesses(newSavedList);
    localStorage.setItem("notbought_favorites", JSON.stringify(newSavedList));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-amber-50/30 to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-stone-600 mt-4">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-amber-50/30 to-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-amber-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-red-200/50">
            <Heart className="w-4 h-4" />
            Your Saved Businesses
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">
            Favorite Independent Businesses
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Your curated list of trusted, PE-free local services (Saved to your device)
          </p>
        </div>

        {savedBusinesses && savedBusinesses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-stone-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-stone-400" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">No favorites yet</h2>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Start searching for independent businesses and save your favorites to build your trusted list
            </p>
            <Link to={createPageUrl("Search")}>
              <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 px-8 py-3 rounded-2xl">
                <Search className="w-5 h-5 mr-2" />
                Start Searching
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {savedBusinesses && (
              <>
                <div className="bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 text-center shadow-lg">
                  <h2 className="text-xl font-bold text-stone-900 mb-2">
                    {savedBusinesses.length} Saved Business{savedBusinesses.length !== 1 ? 'es' : ''}
                  </h2>
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-stone-600">
                        {savedBusinesses.filter(b => b.pe_ownership_status === "independent").length} Independent
                      </span>
                    </div>
                    {savedBusinesses.some(b => b.pe_ownership_status === "pe_owned") && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-stone-600">
                          {savedBusinesses.filter(b => b.pe_ownership_status === "pe_owned").length} PE Owned
                        </span>
                      </div>
                    )}
                    {savedBusinesses.some(b => b.pe_ownership_status === "unsure") && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                        <span className="text-stone-600">
                          {savedBusinesses.filter(b => b.pe_ownership_status === "unsure").length} Unsure
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {savedBusinesses.map((business, index) => (
                    <div key={`${business.name}-${index}`}>
                      <BusinessCard
                        business={{ ...business, is_saved: true }}
                        onToggleSave={handleToggleSave}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="text-center py-8">
              <div className="bg-gradient-to-br from-white/95 to-amber-50/80 backdrop-blur-sm rounded-3xl shadow-lg border border-amber-200/50 p-8 max-w-md mx-auto">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">☕</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Support Independent Business Discovery</h3>
                  <p className="text-stone-600 text-sm">
                    Help us keep this service free and support more independent businesses in your community
                  </p>
                </div>
                <a
                  href="https://www.buymeacoffee.com/200lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="text-lg">☕</span>
                  Buy Me a Coffee
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
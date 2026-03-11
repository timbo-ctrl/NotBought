import React, { useState, useEffect, useRef } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Sparkles } from "lucide-react";

import SearchForm from "../components/search/SearchForm";
import BusinessCard from "../components/search/BusinessCard";
import BrowseCategories from "../components/search/BrowseCategories";

export default function Search() {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearch, setLastSearch] = useState(null);
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedBusinesses, setSavedBusinesses] = useState([]);
  const resultsRef = useRef(null);

  // Load favorites from local storage on mount
  useEffect(() => {
    const loadedFavorites = localStorage.getItem("notbought_favorites");
    if (loadedFavorites) {
      setSavedBusinesses(JSON.parse(loadedFavorites));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && businesses.length > 0 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [businesses, isLoading]);

  const handleSearch = async (searchParams) => {
    const { location: loc, searchTerm: term } = searchParams;
    setIsLoading(true);
    setError(null);
    setLastSearch({ location: loc, searchTerm: term });

    try {
      // Instead of Base44, we use our Vercel Serverless Function
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: loc, searchTerm: term }),
      });

      if (!response.ok) {
        throw new Error("Unable to fetch businesses at this time.");
      }

      const businessData = await response.json();

      if (!businessData.businesses || businessData.businesses.length === 0) {
        throw new Error("No businesses found in this location");
      }

      // Check which of the new results are already in our local storage favorites
      const mappedBusinesses = businessData.businesses.map(b => ({
        ...b,
        is_saved: savedBusinesses.some(saved => saved.name === b.name && saved.address === b.address)
      }));

      const sortedBusinesses = mappedBusinesses.sort((a, b) => {
        const order = { independent: 1, unsure: 2, pe_owned: 3 };
        return (order[a.pe_ownership_status] || 2) - (order[b.pe_ownership_status] || 2) || Math.random() - 0.5;
      });

      setBusinesses(sortedBusinesses);

    } catch (error) {
      console.error("Search error:", error);
      setError("Unable to search for businesses. Please try again with a different location.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSave = (business) => {
    // Check if it's already saved locally
    const isCurrentlySaved = savedBusinesses.some(b => b.name === business.name && b.address === business.address);
    let newSavedList;

    if (isCurrentlySaved) {
      // Remove it
      newSavedList = savedBusinesses.filter(b => !(b.name === business.name && b.address === business.address));
    } else {
      // Add it
      const businessToSave = { ...business, is_saved: true };
      newSavedList = [...savedBusinesses, businessToSave];
    }

    setSavedBusinesses(newSavedList);
    localStorage.setItem("notbought_favorites", JSON.stringify(newSavedList));

    // Update the UI state of the current search results
    setBusinesses(prev => prev.map(b =>
      (b.name === business.name && b.address === business.address)
        ? { ...b, is_saved: !isCurrentlySaved }
        : b
    ));
  };

  const handleCategorySelect = (categoryName) => {
    setSearchTerm(categoryName);
    handleSearch({ location, searchTerm: categoryName });
  };

  const independentCount = businesses.filter((b) => b.pe_ownership_status === "independent").length;
  const showInitialContent = !isLoading && businesses.length === 0 && !error;

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-amber-50 to-stone-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 opacity-100">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-amber-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-emerald-200/50">
            <Sparkles className="w-4 h-4" />
            Support Independent Business
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
            Find Local Services<br />
            <span className="text-emerald-600">Not Owned By Private Equity</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Discover and support truly independent businesses in your area with AI-powered ownership verification
          </p>
        </div>

        <div className="mb-12">
          <SearchForm
            onSearch={handleSearch}
            isLoading={isLoading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            location={location}
            setLocation={setLocation} />
        </div>

        {error && (
          <div className="mb-8 opacity-100">
            <Alert variant="destructive" className="max-w-2xl mx-auto rounded-2xl border-red-200 bg-red-50/90 backdrop-blur-sm">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {!isLoading && businesses.length > 0 && (
          <div ref={resultsRef} className="space-y-8 opacity-100">
            <div className="text-center bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                Found {businesses.length} businesses in {lastSearch?.location}
              </h2>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-stone-600 font-semibold">
                    {businesses.filter((b) => b.pe_ownership_status === "independent").length} Verified Independent
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-stone-600 font-semibold">
                    {businesses.filter((b) => b.pe_ownership_status === "pe_owned").length} PE Owned
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-stone-600 font-semibold">
                    {businesses.filter((b) => b.pe_ownership_status === "unsure").length} Unsure
                  </span>
                </div>
              </div>

            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {businesses.map((business, index) => (
                <div key={`${business.name}-${index}`}>
                  <BusinessCard
                    business={business}
                    onToggleSave={handleToggleSave} />
                </div>
              ))}
            </div>

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

        {showInitialContent && (
          <div className="space-y-12 opacity-100">
            <BrowseCategories onCategorySelect={handleCategorySelect} />

            <div className="text-center py-12">
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
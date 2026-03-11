
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Globe, MapPin, Heart, Shield, AlertTriangle, HelpCircle } from "lucide-react";

export default function BusinessCard({ business, onToggleSave }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "independent":
        return <Shield className="w-4 h-4 text-emerald-600" />;
      case "pe_owned":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "independent":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100">
            <Shield className="w-3 h-3 mr-1" />
            Verified Independent
          </Badge>
        );
      case "pe_owned":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            PE Owned
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <HelpCircle className="w-3 h-3 mr-1" />
            Unsure
          </Badge>
        );
    }
  };

  const statusBorderColor = {
    independent: 'border-emerald-400',
    pe_owned: 'border-red-400',
    unsure: 'border-amber-400'
  };

  return (
    <div className="group h-full">
      <Card className="bg-white/90 backdrop-blur-sm border-stone-200/50 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col group-hover:-translate-y-1">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors duration-200 break-words hyphens-auto">
                {business.name}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {getStatusBadge(business.pe_ownership_status)}
                <span className="text-xs sm:text-sm text-stone-500 break-words">{business.category}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleSave(business)}
              className="text-stone-400 hover:text-red-500 transition-colors duration-200 flex-shrink-0"
            >
              <Heart className={`w-5 h-5 ${business.is_saved ? 'fill-current text-red-500' : ''}`} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 sm:space-y-4 flex-grow px-4 sm:px-6">
          {business.address && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-stone-600 break-words hyphens-auto leading-relaxed">
                {business.address}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-700 rounded-full text-xs sm:text-sm transition-colors duration-200"
              >
                <Phone className="w-3 h-3" />
                Call
              </a>
            )}
            {business.website && (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-700 rounded-full text-xs sm:text-sm transition-colors duration-200"
              >
                <Globe className="w-3 h-3" />
                Website
              </a>
            )}
          </div>

          {business.verification_snippet && (
            <div className={`bg-stone-50 rounded-xl p-2.5 sm:p-3 border-l-4 ${statusBorderColor[business.pe_ownership_status] || statusBorderColor['unsure']} overflow-hidden`}>
              <div className="flex items-start gap-2">
                {getStatusIcon(business.pe_ownership_status)}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-stone-700 mb-1">Ownership Verification</p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed break-words hyphens-auto">
                    {business.verification_snippet}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


import React from 'react';
// import { motion } from 'framer-motion'; // Removed for performance
import { Card } from '@/components/ui/card';
import { Utensils, HeartPulse, Wrench, ShoppingBag, Home, GraduationCap, Sparkles, Coffee } from 'lucide-react';

const categories = [
  { name: 'Restaurants & Food', desc: 'Local eateries, cafes, and food trucks', icon: Utensils },
  { name: 'Healthcare', desc: 'Independent doctors, dentists, and clinics', icon: HeartPulse },
  { name: 'Auto Services', desc: 'Local mechanics and auto repair shops', icon: Wrench },
  { name: 'Retail & Shopping', desc: 'Independent stores and boutiques', icon: ShoppingBag },
  { name: 'Home Services', desc: 'Contractors, cleaners, and handypeople', icon: Home },
  { name: 'Education & Tutoring', desc: 'Independent schools and tutoring', icon: GraduationCap },
  { name: 'Beauty & Wellness', desc: 'Salons, spas, and wellness centers', icon: Sparkles },
  { name: 'Coffee & Cafes', desc: 'Independent coffee shops and cafes', icon: Coffee },
];

// cardVariants removed as framer-motion is no longer used for this component
// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.05,
//       duration: 0.4,
//     },
//   }),
// };

export default function BrowseCategories({ onCategorySelect }) {
  const handleSelect = (categoryName) => {
    onCategorySelect(categoryName);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  return (
    <div className="py-16 bg-gradient-to-b from-amber-50/70 via-orange-50/50 to-stone-50/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900">Browse Independent Services</h2>
          <p className="mt-2 text-lg text-stone-600">
            Explore local businesses organized by category. Every business listed here is verified to be independently owned.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <div
              key={category.name}
              // Removed framer-motion specific props: custom, initial, whileInView, viewport, variants
            >
              <Card
                onClick={() => handleSelect(category.name)}
                className="p-6 text-center h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-amber-200/60 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/40 hover:from-amber-50 hover:to-orange-100/60"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200">
                  <category.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-stone-800">{category.name}</h3>
                <p className="mt-1 text-sm text-stone-500">{category.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

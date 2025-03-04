import { Calendar, Search } from "lucide-react";

interface SearchCommandProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedPeriod: string;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchCommand({
  searchTerm,
  setSearchTerm,
  selectedPeriod,
  setSelectedPeriod,
}: SearchCommandProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-stone-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            placeholder="Rechercher par n° de commande ou produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-stone-500" />
          <select
            className="border border-stone-300 rounded-md focus:ring-amber-500 focus:border-amber-500 py-2 px-4"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="all">Toutes les périodes</option>
            <option value="last-month">Dernier mois</option>
            <option value="last-3-months">3 derniers mois</option>
            <option value="last-6-months">6 derniers mois</option>
          </select>
        </div>
      </div>
    </div>
  );
}

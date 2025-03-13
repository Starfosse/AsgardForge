import Card from "@/wrapper/Card";
import { ThumbsUp } from "lucide-react";

interface JustAdminProps {
  allowed: boolean;
  setAllowed: (allowed: boolean) => void;
}

export default function JustAdmin({ allowed, setAllowed }: JustAdminProps) {
  if (!allowed) return false;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <Card variant="secondary" className="text-center p-8 flex flex-col">
        <h2 className="text-2xl font-bold text-amber-700 pb-5">Non autorisé</h2>
        <div className="flex flex-col gap-3">
          Seul l'admin peut effectuer cette action.
          <button
            className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-3"
            onClick={() => setAllowed(false)}
          >
            <ThumbsUp size={22} className="text-white" />
            J'ai compris
          </button>
        </div>
      </Card>
    </div>
  );
}

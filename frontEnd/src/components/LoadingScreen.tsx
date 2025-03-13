import Card from "@/wrapper/Card";

interface LoadingScreenProps {
  title: string;
}

export default function LoadingScreen({ title }: LoadingScreenProps) {
  return (
    <div className="bg-stone-100 flex-grow flex items-center justify-center">
      <Card variant="secondary" className="p-8">
        <div className="text-xl text-amber-700">
          Chargement de votre {title}...
        </div>
      </Card>
    </div>
  );
}
//ajouter une animation d'icon de chargement

interface LoadingScreenProps {
  title: string;
}

export default function LoadingScreen({ title }: LoadingScreenProps) {
  return (
    <div className="bg-stone-100 min-h-screen flex items-center justify-center">
      <div className="text-xl text-amber-700">
        Chargement de votre {title}...
      </div>
    </div>
  );
}

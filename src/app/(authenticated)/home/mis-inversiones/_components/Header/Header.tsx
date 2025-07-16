import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => router.push("/home")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Home
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Mis Inversiones</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

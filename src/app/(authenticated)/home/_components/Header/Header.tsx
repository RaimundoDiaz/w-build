import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image src="/wbuild.svg" alt="W Build" width={176} height={46} />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push("/home/mis-inversiones")}>Mis Inversiones</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

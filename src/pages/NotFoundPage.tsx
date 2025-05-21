
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-purple-800">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Página não encontrada</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;

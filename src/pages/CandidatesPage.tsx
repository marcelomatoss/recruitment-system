import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Candidate = {
  id: number;
  name: string;
  email: string;
};

const CandidatesPage = () => {
  const queryClient = useQueryClient();
  const candidates = queryClient.getQueryData<Candidate[]>(["candidates"]) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Candidatos</h1>
        <Button asChild>
          <Link to="/candidates/new">+ Adicionar</Link>
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-3">Nome</th>
              <th className="text-left p-3">Email</th>
            </tr>
          </thead>
            <tbody className="bg-background">   
            {candidates.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidatesPage;

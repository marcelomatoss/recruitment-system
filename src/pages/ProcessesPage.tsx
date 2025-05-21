import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Process = {
  id: number;
  name: string;
  stage: string;
};

const ProcessesPage = () => {
  const queryClient = useQueryClient();
  const processes = queryClient.getQueryData<Process[]>(["processes"]) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Processos Seletivos</h1>
        <Button asChild>
          <Link to="/processes/new">+ Adicionar</Link>
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-3">Processo</th>
              <th className="text-left p-3">Etapa</th>
            </tr>
          </thead>
          <tbody className="bg-background">
            {processes.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessesPage;

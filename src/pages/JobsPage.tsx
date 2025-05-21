import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Job = {
  id: number;
  title: string;
  location: string;
};

const JobsPage = () => {
  const queryClient = useQueryClient();
  const jobs = queryClient.getQueryData<Job[]>(["jobs"]) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vagas</h1>
        <Button asChild>
          <Link to="/jobs/new">+ Adicionar</Link>
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-3">Título</th>
              <th className="text-left p-3">Localização</th>
            </tr>
          </thead>
            <tbody className="bg-background">
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-3">{job.title}</td>
                <td className="p-3">{job.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsPage;

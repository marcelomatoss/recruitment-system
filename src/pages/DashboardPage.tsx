import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckSquare, FileText, Users } from "lucide-react";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalJobs: 0,
    activeProcesses: 0,
    recentCandidates: [],
    recentJobs: [],
  });

  useEffect(() => {
    const candidates = (queryClient.getQueryData(["candidates"]) as any[]) || [];
    const jobs = (queryClient.getQueryData(["jobs"]) as any[]) || [];
    const processes = (queryClient.getQueryData(["processes"]) as any[]) || [];

    setStats({
      totalCandidates: candidates.length,
      totalJobs: jobs.length,
      activeProcesses: processes.length,
      recentCandidates: candidates.slice(-3).reverse(),
      recentJobs: jobs.slice(-3).reverse(),
    });
  }, [queryClient]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex">
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral do sistema de recrutamento e seleção</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Candidatos</CardTitle>
                <Users className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCandidates}</div>
                <p className="text-xs text-muted-foreground">Total de candidatos cadastrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Vagas</CardTitle>
                <FileText className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalJobs}</div>
                <p className="text-xs text-muted-foreground">Total de vagas abertas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Processos</CardTitle>
                <CheckSquare className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeProcesses}</div>
                <p className="text-xs text-muted-foreground">Processos seletivos ativos</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidatos Recentes</CardTitle>
                <CardDescription>Últimos candidatos adicionados ao sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentCandidates.map((candidate: any) => (
                    <div key={candidate.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                      </div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                          {candidate.status || "Novo"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <a href="/candidates" className="text-sm text-purple-600 hover:text-purple-800">
                  Ver todos os candidatos →
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vagas Recentes</CardTitle>
                <CardDescription>Últimas vagas publicadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentJobs.map((job: any) => (
                    <div key={job.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.location}</p>
                      </div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                          + candidatos
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <a href="/jobs" className="text-sm text-purple-600 hover:text-purple-800">
                  Ver todas as vagas →
                </a>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
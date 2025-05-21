import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext"; // ⬅️ Novo provider

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";

import DashboardPage from "@/pages/DashboardPage";
import CandidatesPage from "@/pages/CandidatesPage";
import JobsPage from "@/pages/JobsPage";
import ProcessesPage from "@/pages/ProcessesPage";
import SettingsPage from "@/pages/SettingsPage";

import CreateCandidatePage from "@/pages/CreateCandidatePage";
import CreateJobPage from "@/pages/CreateJobPage";
import CreateProcessPage from "@/pages/CreateProcessPage";

import ProtectedLayout from "./components/layout/ProtectedLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ThemeProvider> {/* ⬅️ Ativa suporte a tema escuro */}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Rotas protegidas com layout */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ProtectedLayout />
                  </ProtectedRoute>
                }
              >
                {/* Visão geral e listas */}
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="candidates" element={<CandidatesPage />} />
                <Route path="jobs" element={<JobsPage />} />
                <Route path="processes" element={<ProcessesPage />} />
                <Route path="settings" element={<SettingsPage />} />

                {/* Formulários de criação */}
                <Route path="candidates/new" element={<CreateCandidatePage />} />
                <Route path="jobs/new" element={<CreateJobPage />} />
                <Route path="processes/new" element={<CreateProcessPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

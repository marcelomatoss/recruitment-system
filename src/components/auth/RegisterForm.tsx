
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon, UserIcon } from "lucide-react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password);
      toast.success("Registro realizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha no registro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Criar Conta</h1>
        <p className="text-muted-foreground">
          Registre-se para usar o sistema de Recrutamento e Seleção
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Registrando...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5" />
              <span>Registrar</span>
            </div>
          )}
        </Button>
      </form>
      
      <div className="text-center">
        <p>
          Já tem uma conta?{" "}
          <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

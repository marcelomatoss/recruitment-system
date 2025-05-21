import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import RegisterForm from "@/components/auth/RegisterForm";
import { Card, CardContent } from "@/components/ui/card";

const RegisterPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">RH Select</h1>
          <p className="text-muted-foreground">Sistema de Recrutamento e Seleção</p>
        </div>

        <Card className="border border-border shadow-lg">
          <CardContent className="pt-6">
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;

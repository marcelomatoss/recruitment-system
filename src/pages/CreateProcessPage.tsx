import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Process = {
  id: number;
  name: string;
  stage: string;
};

const CreateProcessPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", stage: "" });

  const mutation = useMutation({
    mutationFn: async (process: Omit<Process, "id">) => {
      const previous = queryClient.getQueryData<Process[]>(["processes"]) || [];
      const updated = [...previous, { id: Date.now(), ...process }];
      queryClient.setQueryData(["processes"], updated);
    },
    onSuccess: () => {
      navigate("/processes");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.stage.trim()) return;
    mutation.mutate(form);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Novo Processo Seletivo</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Input
          placeholder="Nome do processo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Etapa atual"
          value={form.stage}
          onChange={(e) => setForm({ ...form, stage: e.target.value })}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};

export default CreateProcessPage;

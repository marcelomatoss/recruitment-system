import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Candidate = {
  id: number;
  name: string;
  email: string;
};

const CreateCandidatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", email: "" });

  const mutation = useMutation({
    mutationFn: async (candidate: Omit<Candidate, "id">) => {
      const previous = (queryClient.getQueryData<Candidate[]>(["candidates"])) || [];
      const updated = [...previous, { id: Date.now(), ...candidate }];
      queryClient.setQueryData(["candidates"], updated);
    },
    onSuccess: () => {
      navigate("/candidates");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    mutation.mutate(form);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Novo Candidato</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};

export default CreateCandidatePage;

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Job = {
  id: number;
  title: string;
  location: string;
};

const CreateJobPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ title: "", location: "" });

  const mutation = useMutation({
    mutationFn: async (job: Omit<Job, "id">) => {
      const previous = queryClient.getQueryData<Job[]>(["jobs"]) || [];
      const updated = [...previous, { id: Date.now(), ...job }];
      queryClient.setQueryData(["jobs"], updated);
    },
    onSuccess: () => {
      navigate("/jobs");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim()) return;
    mutation.mutate(form);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Nova Vaga</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Localização"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};

export default CreateJobPage;

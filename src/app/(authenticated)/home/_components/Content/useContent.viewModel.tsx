import { Project } from "@/core/entities/Project.entity";
import ProjectCrudService from "@/core/services/models/ProjectCrudService";
import useService from "@/presentation/hooks/useService/useService";
import { useRouter } from "next/navigation";
import { useState } from "react";


const useContentViewModel = () => {
  const router = useRouter();
  const [investmentAmounts, setInvestmentAmounts] = useState<{ [key: string]: string }>({});
  const [{ data: projects, isLoading: isLoadingProjects }] = useService<Project[]>(ProjectCrudService.list);

  const handleInvestmentChange = (projectId: string, amount: string) => {
    setInvestmentAmounts((prev) => ({
      ...prev,
      [projectId]: amount
    }));
  };

  const handleInvest = (project: Project) => {
    const amount = investmentAmounts[project.id];
    if (!amount || Number.parseFloat(amount) < project.minInvestment) {
      alert(`El monto mínimo de inversión es $${project.minInvestment.toLocaleString()}`);

      return;
    }

    // Redirigir a la página de confirmación
    router.push(`/home/confirmation?projectId=${project.id}&amount=${amount}`);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return {
    router,
    projects,
    investmentAmounts,
    isLoadingProjects,
    handleInvestmentChange,
    handleInvest,
    getProgressPercentage
  };
};

export default useContentViewModel;

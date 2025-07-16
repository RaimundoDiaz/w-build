import { Project } from "@/core/entities/Project.entity";
import ProjectCrudService from "@/core/services/models/ProjectCrudService";
import useService from "@/presentation/hooks/useService/useService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useContentViewModel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [expectedReturns, setExpectedReturns] = useState<{ min: number, max: number }>({ min: 0, max: 0 });

  const [{ data: projectData, isLoading: isLoadingProject }, callProjectService] = useService<Project>(
    ProjectCrudService.get, true
  );


  useEffect(() => {
    const projectId = searchParams.get("projectId");
    const amount = searchParams.get("amount");

    if (!projectId || !amount) {
      router.push("/home");

      return;
    }

    callProjectService({ id: projectId });
    setInvestmentAmount(Number.parseFloat(amount));
  }, [searchParams, router]);


  useEffect(() => {
    if (projectData) {
      setExpectedReturns(calculateExpectedReturns(projectData));
    }
  }, [projectData]);

  const calculateExpectedReturns = (project: Project) => {
    const returnRange = project.expectedReturn.replace("%", "").split("-");
    const minReturn = (investmentAmount * Number.parseFloat(returnRange[0])) / 100;
    const maxReturn = (investmentAmount * Number.parseFloat(returnRange[1] || returnRange[0])) / 100;

    return { min: minReturn, max: maxReturn };
  };


  return {
    projectData,
    investmentAmount,
    expectedReturns,
    isLoadingProject
  };
};

export default useContentViewModel;

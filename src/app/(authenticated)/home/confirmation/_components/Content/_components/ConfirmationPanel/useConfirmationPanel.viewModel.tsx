import { Investment } from "@/core/entities/Investment.entity";
import { Project } from "@/core/entities/Project.entity";
import InvestmentCrudService from "@/core/services/models/InvestmentCrudService";
import useService from "@/presentation/hooks/useService/useService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useConfirmationPanelViewModel = (
  {
    projectData,
    investmentAmount
  }: {
    projectData: Project;
    investmentAmount: number;
  }
) => {
  const router = useRouter();
  const session = useSession();
  const [isConfirming, setIsConfirming] = useState(false);

  const [{ success: isSuccessInvestment }, callInvestmentService] = useService<Investment>(
    InvestmentCrudService.create, true
  );

  const handleCancel = () => {
    router.push("/home");
  };

  const handleConfirmInvestment = async () => {
    setIsConfirming(true);

    await callInvestmentService({
      projectId: projectData?.id,
      userId:    session.data?.user?.id,
      amount:    investmentAmount
    });
  };

  useEffect(() => {
    if (isSuccessInvestment) {
      router.push("/home/mis-inversiones");
    }
  }, [isSuccessInvestment, router]);

  return {
    isConfirming,
    handleCancel,
    handleConfirmInvestment
  };
};

export default useConfirmationPanelViewModel;

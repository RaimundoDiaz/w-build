import { Investment } from "@/core/entities/Investment.entity";
import { Project } from "@/core/entities/Project.entity";
import ProjectCrudService from "@/core/services/models/ProjectCrudService";
import useService from "@/presentation/hooks/useService/useService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const useContentViewModel = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState<{
    totalInvested: number;
    activeInvestments: number;
  }>({
    totalInvested:     0,
    activeInvestments: 0
  });

  const [{ data: userProjects, isLoading: isLoadingUserProjects }, callListByUserIdService] =
    useService<{ projects: Project[], investments: Investment[] }>(
      ProjectCrudService.listByUserId,
      true
    );
  useEffect(() => {
    if (session) {
      callListByUserIdService({ userId: session.user.id });
    }
  }, [session]);


  useEffect(() => {
    if (userProjects) {
      setStats(getTotalStats(userProjects.projects, userProjects.investments));
    }
  }, [userProjects]);

  const getTotalStats = (projects: Project[], investments: Investment[]) => {
    const totalInvested = investments.reduce((sum, investment) => sum + investment.amount, 0);

    return {
      totalInvested,
      activeInvestments: projects.length
    };
  };

  return {
    stats,
    userProjects,
    isLoadingUserProjects
  };
};

export default useContentViewModel;

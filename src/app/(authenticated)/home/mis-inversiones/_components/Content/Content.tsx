import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Building, DollarSign, MapPin, PieChart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import useContentViewModel from "./useContent.viewModel";

// Skeleton component for loading state
const ProjectSkeleton = () => (
  <Card className="hover:shadow-md transition-shadow animate-pulse">
    <CardContent className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Project Image Skeleton */}
        <div className="lg:w-48 flex-shrink-0">
          <div className="w-full h-32 lg:h-24 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Investment Details Skeleton */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="flex items-center mb-2">
                <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="mx-2 h-4 w-1 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* Investment Stats Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>
          </div>

          {/* Progress Bar Skeleton */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Stats Skeleton component
const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 bg-gray-200 rounded w-28"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </CardContent>
    </Card>
  </div>
);

const Content = () => {
  const router = useRouter();
  const { stats, userProjects, isLoadingUserProjects } = useContentViewModel();

  const getStatusBadge = (status: string) => {
    switch (status) {
    case "active":
      return <Badge className="bg-green-500">Activa</Badge>;
    default:
      return null;
    }
  };

  // Show loading state
  if (isLoadingUserProjects) {
    return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsSkeleton />

        <Card>
          <CardHeader>
            <CardTitle>Portfolio de Inversiones</CardTitle>
            <CardDescription>Gestiona y monitorea todas tus inversiones inmobiliarias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Show 3 skeleton cards while loading */}
              {[1, 2, 3].map((index) => (
                <ProjectSkeleton key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalInvested.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inversiones Activas</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeInvestments}</div>
          </CardContent>
        </Card>
      </div>

      {/* Investments List */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio de Inversiones</CardTitle>
          <CardDescription>Gestiona y monitorea todas tus inversiones inmobiliarias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userProjects?.projects.map((project) => {
              // Calcular el monto invertido por el usuario en este proyecto
              const investedAmount = userProjects.investments
                ? userProjects.investments
                  .filter((inv) => inv.projectId === project.id)
                  .reduce((sum, inv) => sum + inv.amount, 0)
                : 0;

              return (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Project Image */}
                      <div className="lg:w-48 flex-shrink-0">
                        <Image
                          src={project.imageUrl || "/placeholder.svg"}
                          alt={project.name}
                          width={300}
                          height={200}
                          className="w-full h-32 lg:h-24 object-cover rounded-lg"/>
                      </div>

                      {/* Investment Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                            <div className="flex items-center text-gray-500 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{project.location}</span>
                              <span className="mx-2">•</span>
                              <Building className="h-4 w-4 mr-1" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(project.status)}
                          </div>
                        </div>

                        {/* Investment Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-xs text-gray-500">Inversión</span>
                            <p className="font-semibold">${investedAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Retorno esperado</span>
                            <p className="font-semibold text-green-600">
                              {project.expectedReturn}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progreso del Proyecto</span>
                            <span>{Math.min((project.currentAmount / project.targetAmount) * 100, 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={Math.min((project.currentAmount / project.targetAmount) * 100, 100)} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {userProjects?.projects.length === 0 && (
              <div className="text-center py-12">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay inversiones</h3>
                <p className="text-gray-500 mb-4">Aún no has realizado ninguna inversión.</p>
                <Button onClick={() => router.push("/home")}>Explorar Proyectos</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Content;

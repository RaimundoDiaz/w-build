import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project } from "@/core/entities/Project.entity";
import { DollarSign, MapPin, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

import useContentViewModel from "./useContent.viewModel";


const Content = () => {
  const {
    projects,
    isLoadingProjects,
    investmentAmounts,
    handleInvestmentChange,
    handleInvest,
    getProgressPercentage
  } = useContentViewModel();

  const renderFooter = (project: Project) => {
    if (project.status === "active") {
      return (
        <div className="w-full space-y-3">
          <div>
            <Label htmlFor={`investment-${project.id}`} className="text-sm font-medium">
              Monto a invertir (USD)
            </Label>
            <Input
              id={`investment-${project.id}`}
              type="number"
              placeholder={`Mínimo $${project.minInvestment.toLocaleString()}`}
              value={investmentAmounts[project.id] || ""}
              onChange={(e) => handleInvestmentChange(project.id, e.target.value)}
              className="mt-1"
              min={project.minInvestment}/>
          </div>
          <Button
            onClick={() => handleInvest(project)}
            className="w-full"
            disabled={!investmentAmounts[project.id]}>
            Invertir Ahora
          </Button>
        </div>
      );
    }
    if (project.status === "funded") {
      return (
        <div className="w-full text-center">
          <Button disabled className="w-full">
            Proyecto Financiado
          </Button>
        </div>
      );
    }

    return (
      <div className="w-full text-center">
        <Button disabled className="w-full">
          Próximamente
        </Button>
      </div>
    );
  };

  const getSkeletonCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="overflow-hidden rounded-lg shadow bg-white animate-pulse">
          <div className="relative">
            <div className="w-full h-48 bg-gray-200" />
          </div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-full mb-4" />
            <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="h-8 bg-gray-100 rounded" />
              <div className="h-8 bg-gray-100 rounded" />
              <div className="h-8 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="bg-gray-50 border-t p-4">
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
    case "active":
      return (
        <Badge variant="default" className="bg-green-500">
          Activo
        </Badge>
      );
    default:
      return null;
    }
  };

  if (isLoadingProjects || !projects) {
    return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Proyectos de Inversión Inmobiliaria</h2>
          <p className="text-gray-600">
            Descubre oportunidades de inversión en proyectos inmobiliarios cuidadosamente seleccionados
          </p>
        </div>
        {getSkeletonCards()}
      </main>
    );
  }

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Proyectos de Inversión Inmobiliaria</h2>
        <p className="text-gray-600">
          Descubre oportunidades de inversión en proyectos inmobiliarios cuidadosamente seleccionados
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"/>
              <div className="absolute top-4 right-4">{getStatusBadge(project.status)}</div>
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progreso de financiamiento</span>
                  <span>{getProgressPercentage(project.currentAmount, project.targetAmount).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(project.currentAmount, project.targetAmount)}%` }}>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>${project.currentAmount.toLocaleString()}</span>
                  <span>${project.targetAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mb-1" />
                  <span className="text-xs text-gray-500">Mín. Inversión</span>
                  <span className="font-semibold text-sm">${project.minInvestment.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mb-1" />
                  <span className="text-xs text-gray-500">Retorno Esperado</span>
                  <span className="font-semibold text-sm">{project.expectedReturn}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-xs text-gray-500">Inversores</span>
                  <span className="font-semibold text-sm">{project.investors}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-gray-50 border-t">
              {renderFooter(project)}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Content;

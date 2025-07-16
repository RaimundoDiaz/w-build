import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/core/entities/Project.entity";
import { Building, DollarSign, MapPin, Users } from "lucide-react";
import Image from "next/image";

interface ProjectDetailsProps {
  projectData: Project;
}

const ProjectDetails = ({ projectData }: ProjectDetailsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2" />
          Detalles del Proyecto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Image
              src={projectData.imageUrl || "/placeholder.svg"}
              alt={projectData.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"/>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">{projectData.name}</h3>
            <div className="flex items-center text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{projectData.location}</span>
            </div>
            <p className="text-gray-600 mb-4">{projectData.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Objetivo de Inversión</span>
                <p className="font-semibold flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {projectData.targetAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Retorno Esperado</span>
                <p className="font-semibold text-green-600">{projectData.expectedReturn}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Inversores Actuales</span>
                <p className="font-semibold flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {projectData.investors}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetails;

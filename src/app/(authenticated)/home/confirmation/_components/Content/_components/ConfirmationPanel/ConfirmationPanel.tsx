import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/core/entities/Project.entity";
import { AlertCircle, CheckCircle } from "lucide-react";

import useConfirmationPanelViewModel from "./useConfirmationPanel.viewModel";

const ConfirmationPanel = (
  {
    projectData,
    investmentAmount
  }: {
    projectData: Project;
    investmentAmount: number;
  }
) => {
  const { isConfirming, handleConfirmInvestment, handleCancel } = useConfirmationPanelViewModel( { projectData, investmentAmount });

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Confirmar Inversión
          </CardTitle>
          <CardDescription>Revisa los detalles antes de confirmar tu inversión</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Esta inversión no puede ser cancelada una vez confirmada. Asegúrate de revisar todos los detalles.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Proyecto:</span>
              <span className="text-sm font-medium">{projectData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Inversión:</span>
              <span className="text-sm font-medium">${investmentAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Retorno esperado:</span>
              <span className="text-sm font-medium">{projectData.expectedReturn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Objetivo de inversión:</span>
              <span className="text-sm font-medium">${projectData.targetAmount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button onClick={handleConfirmInvestment} className="w-full" disabled={isConfirming}>
            {isConfirming ? (
              <>
                <span className="relative flex items-center mr-2">
                  <span className="block w-4 h-4 rounded-full border-2 border-t-2 border-white border-t-blue-200 animate-spin bg-gradient-to-tr from-blue-400 via-blue-200 to-blue-600" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-blue-100 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 8v4m8-8h-4M4 12H8" />
                    </svg>
                  </span>
                </span>
                <span className="animate-pulse">Procesando<span className="inline-block animate-bounce">...</span></span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirmar Inversión
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full bg-transparent"
            disabled={isConfirming}>
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConfirmationPanel;

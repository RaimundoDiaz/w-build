import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { DollarSign } from "lucide-react";

interface InvestmentSummaryProps {
  investmentAmount: number;
  expectedReturns: {
    min: number;
    max: number;
  };
}

const InvestmentSummary = ({ investmentAmount, expectedReturns }: InvestmentSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          Resumen de Inversión
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Monto a invertir:</span>
            <span className="text-2xl font-bold text-blue-600">${investmentAmount.toLocaleString()}</span>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Retornos Proyectados:</h4>
            <div className="flex justify-between">
              <span className="text-gray-600">Retorno mínimo estimado:</span>
              <span className="font-semibold text-green-600">${expectedReturns.min.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Retorno máximo estimado:</span>
              <span className="font-semibold text-green-600">${expectedReturns.max.toLocaleString()}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total estimado al vencimiento:</span>
            <span className="text-xl font-bold text-green-600">
              ${(investmentAmount + expectedReturns.max).toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentSummary;

import ConfirmationPanel from "./_components/ConfirmationPanel/ConfirmationPanel";
import InvestmentSummary from "./_components/InvestmentSummary/InvestmentSummary";
import ProjectDetails from "./_components/ProjectDetails/ProjectDetails";
import useContentViewModel from "./useContent.viewModel";

const Content = () => {
  const {
    projectData,
    investmentAmount,
    expectedReturns,
    isLoadingProject
  } = useContentViewModel();

  if (isLoadingProject || !projectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="flex flex-col items-center w-full max-w-2xl">
          {/* Spinner animado con gradiente */}
          <div className="relative mb-6">
            <span
              className="block w-16 h-16 rounded-full border-4 border-t-4 border-blue-400 border-t-blue-600 animate-spin bg-gradient-to-tr from-blue-400 via-blue-200 to-blue-600"/>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 8v4m8-8h-4M4 12H8" />
              </svg>
            </span>
          </div>
          {/* Texto animado */}
          <p className="text-lg font-medium text-blue-700 mb-8 animate-pulse">
            Cargando información del proyecto
            <span className="inline-block animate-bounce">...</span>
          </p>
          {/* Skeleton loader de la tarjeta */}
          <div className="w-full bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="w-full h-48 bg-blue-100 rounded-lg" />
              </div>
              <div className="md:w-2/3 space-y-3">
                <div className="h-6 bg-blue-100 rounded w-2/3" />
                <div className="h-4 bg-blue-100 rounded w-1/3" />
                <div className="h-4 bg-blue-100 rounded w-full" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="h-4 bg-blue-100 rounded w-3/4" />
                  <div className="h-4 bg-blue-100 rounded w-1/2" />
                  <div className="h-4 bg-blue-100 rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Details and Investment Summary */}
        <div className="lg:col-span-2">
          <ProjectDetails projectData={projectData} />
          <InvestmentSummary
            investmentAmount={investmentAmount}
            expectedReturns={expectedReturns}/>
        </div>

        <ConfirmationPanel
          projectData={projectData}
          investmentAmount={investmentAmount}/>
      </div>
    </main>
  );
};

export default Content;

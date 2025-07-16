import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useRegisterFormViewModel } from "./useRegisterForm.viewModel";

const RegisterForm = () => {
  const {
    email,
    password,
    serviceSucceeded,
    isServiceReqPending,
    responseError,
    handleSubmit,
    setEmail,
    setPassword
  } = useRegisterFormViewModel();

  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded-lg shadow p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Registro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
            autoComplete="email"/>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            autoComplete="new-password"/>
        </div>
        <Button type="submit" disabled={isServiceReqPending} className="mt-2 font-semibold">
          {isServiceReqPending ? "Registrando..." : "Registrarse"}
        </Button>
        {responseError && (
          <div className="text-red-600 text-sm text-center mt-2">{responseError.message}</div>
        )}
        {serviceSucceeded && (
          <div className="text-green-600 text-sm text-center mt-2">Registro exitoso</div>
        )}
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600 mr-1">¿Ya tienes cuenta?</span>
        <Button asChild variant="link" className="p-0 h-auto align-baseline text-sm">
          <Link href="/login">Inicia sesión</Link>
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;

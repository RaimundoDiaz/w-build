"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useLoginFormViewModel } from "./useLoginForm.viewModel";

const LoginForm = () => {
  const {
    email,
    password,
    isServiceReqPending,
    responseError,
    serviceSucceeded,
    handleSubmit,
    setEmail,
    setPassword
  } = useLoginFormViewModel();

  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded-lg shadow p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Iniciar sesión</h2>
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
            autoComplete="current-password"/>
        </div>
        <Button type="submit" disabled={isServiceReqPending} className="mt-2 font-semibold">
          {isServiceReqPending ? "Ingresando..." : "Iniciar sesión"}
        </Button>
        {responseError && (
          <div className="text-red-600 text-sm text-center mt-2">{responseError.message}</div>
        )}
        {serviceSucceeded && (
          <div className="text-green-600 text-sm text-center mt-2">Inicio de sesión exitoso</div>
        )}
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600 mr-1">¿No tienes cuenta?</span>
        <Button asChild variant="link" className="p-0 h-auto align-baseline text-sm">
          <Link href="/register">Regístrate</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;

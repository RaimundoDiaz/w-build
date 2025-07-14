import LoginService from "@/core/services/auth/LoginService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLoginFormViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isServiceReqPending, setIsServiceReqPending] = useState(false);
  const [responseError, setResponseError] = useState<{
    message: string;
  } | null>(null);
  const [serviceSucceeded, setServiceSucceeded] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponseError(null);
    setServiceSucceeded(false);
    setIsServiceReqPending(true);
    try {
      const loginSucceeded = await LoginService.login({
        email,
        password,
        redirect: false,
      });
      if (loginSucceeded) {
        setServiceSucceeded(true);
        router.push("/home");
      } else {
        setResponseError({ message: "Credenciales incorrectas" });
      }
    } catch (error) {
      setResponseError({ message: "Error inesperado al iniciar sesión" });
    } finally {
      setIsServiceReqPending(false);
    }
  };

  return {
    email,
    password,
    isServiceReqPending,
    responseError,
    serviceSucceeded,
    handleSubmit,
    setEmail,
    setPassword,
  };
};

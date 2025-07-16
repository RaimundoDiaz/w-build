import RegisterService from "@/core/services/auth/RegisterService";
import useService from "@/presentation/hooks/useService/useService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useRegisterFormViewModel = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    {
      success: serviceSucceeded,
      isLoading: isServiceReqPending,
      responseError
    },
    callRegisterService
  ] = useService<void>(RegisterService.register, true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callRegisterService({
      email,
      plainPassword: password
    });
  };

  useEffect(() => {
    if (serviceSucceeded) {
      router.push("/home");
    }
  }, [serviceSucceeded]);

  return {
    email,
    password,
    serviceSucceeded,
    isServiceReqPending,
    responseError,
    handleSubmit,
    setEmail,
    setPassword
  };
};

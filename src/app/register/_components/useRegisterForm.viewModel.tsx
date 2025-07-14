import { useState } from "react";

import RegisterService from "@/core/services/RegisterService";
import useService from "@/presentation/hooks/useService/useService";

export const useRegisterFormViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    {
      success: serviceSucceeded,
      isLoading: isServiceReqPending,
      responseError,
    },
    callRegisterService,
  ] = useService<void>(RegisterService.register, true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit");
    e.preventDefault();
    callRegisterService({
      email,
      plainPassword: password,
    });
  };

  return {
    email,
    password,
    serviceSucceeded,
    isServiceReqPending,
    responseError,
    handleSubmit,
    setEmail,
    setPassword,
  };
};

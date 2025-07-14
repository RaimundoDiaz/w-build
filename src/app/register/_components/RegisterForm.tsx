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
    <div
      style={{
        maxWidth:     400,
        margin:       "40px auto",
        padding:      24,
        border:       "1px solid #eee",
        borderRadius: 8
      }}>
      <h2>Registro</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}/>
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}/>
        </label>
        <button
          type="submit"
          disabled={isServiceReqPending}
          style={{ padding: 10, fontWeight: 600 }}>
          {isServiceReqPending ? "Registrando..." : "Registrarse"}
        </button>
        {responseError && (
          <div style={{ color: "red" }}>{responseError.message}</div>
        )}
        {serviceSucceeded && (
          <div style={{ color: "green" }}>Registro exitoso</div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;

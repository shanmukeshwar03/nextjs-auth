import { useEffect, useState } from "react";
import Input from "components/Input";
import Loading from "components/Loading";
import { useRouter } from "next/router";
import Link from "next/link";
import Helpers from "helpers";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ type: null, message: null });
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: null, password: null });
  const router = useRouter();

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!Helpers.isEmail(credentials.email)) {
      setErrors({ ...errors, email: "Invalid Email" });
      return;
    }
    if (!Helpers.isPassword(credentials.password)) {
      setErrors({ ...errors, password: "Wrong password" });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/auth/login", credentials);
      if (response.data === "Ok") router.replace("/");
    } catch (error) {
      const errors = error.response.data;
      if (typeof errors === "object") {
        if (errors.email === "Email Unverified")
          router.replace(`/verify?purpose=EmailVerify&_id=${errors._id}`);
        setErrors(errors);
      } else {
        setMeta({ type: "failed", message: errors });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setErrors({});
  }, [credentials]);

  return (
    <div className="login-container">
      <img src="/icons/login.svg" />
      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-header">
          <span>Welcome back</span>
          {meta.type && (
            <span className={meta.type === "failed" ? "login-error" : null}>
              {meta.message}
            </span>
          )}
        </div>
        <Input
          label="email"
          icon
          error={errors.email}
          value={credentials.email}
          onChange={handleChange}
          placeholder="yourname@host.com"
        />
        <Input
          label="password"
          icon
          error={errors.password}
          value={credentials.password}
          onChange={handleChange}
          placeholder="your secure password"
          isPassword={showPassword ? "eye-open" : "eye-close"}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <div className="login-footer">
          <Link href="/forgotpassword"> Forgot Password?</Link>
          <button>{loading ? <Loading type="button" /> : "Login"}</button>
        </div>
        <span>
          Not an existing user? <Link href="/register">Register here</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

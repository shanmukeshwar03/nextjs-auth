import { useEffect, useState } from "react";
import Input from "components/Input";
import Loading from "components/Loading";
import { useRouter } from "next/router";
import Link from "next/link";
import Helpers from "helpers";
import axios from "axios";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [meta, setMeta] = useState({ type: null, message: null });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [credentials, setCredentials] = useState({ password: "" });

  const [errors, setErrors] = useState({
    password: null,
    footer: null,
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!Helpers.isPassword(credentials.password)) {
      setErrors({ password: "Wrong password" });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/auth/resetpassword", {
        ...credentials,
        token: router.query.token,
      });
      if (response.data === "Ok")
        setMeta({
          type: "success",
          message: "Your password has updated sucessfully!",
        });
    } catch (error) {
      const errors = error.response.data;
      if (errors.password) setErrors(errors);
      else setMeta({ type: "failed", message: errors });
    }
    setLoading(false);
  };

  useEffect(() => {
    setErrors({});
  }, [credentials]);

  return (
    <div className="rp-container">
      <img src="/icons/login.svg" />
      <form className="rp-form" onSubmit={onSubmit}>
        <div className="rp-header">
          <span>Reset Password</span>
          {meta.type && (
            <span className={meta.type === "failed" ? "rp-error" : null}>
              {meta.message}
            </span>
          )}
        </div>
        <Input
          label="password"
          icon
          error={errors.password}
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your new password"
          isPassword={showPassword ? "eye-open" : "eye-close"}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <div className="rp-footer">
          <Link href="/login">Login?</Link>
          <button>{loading ? <Loading type="button" /> : "Reset"}</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;

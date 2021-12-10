import { useEffect, useState } from "react";
import Input from "components/Input";
import Loading from "components/Loading";
import Link from "next/link";
import Helpers from "helpers";
import axios from "axios";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ type: null, message: null });

  const [credentials, setCredentials] = useState({ email: "" });

  const [errors, setErrors] = useState({
    email: null,
    footer: null,
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMeta({});
    if (!Helpers.isEmail(credentials.email)) {
      setErrors({ ...errors, email: "Invalid Email" });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/auth/forgotpassword", credentials);
      if (response.data === "Ok")
        setMeta({ type: "success", message: "Please check your email" });
    } catch (error) {
      const errors = error.response.data;
      if (errors.email) setErrors(errors);
      else setMeta({ type: "failed", message: errors });
    }
    setLoading(false);
  };

  useEffect(() => {
    setErrors({});
  }, [credentials]);

  return (
    <div className="fp-container">
      <img src="/icons/login.svg" />
      <form className="fp-form" onSubmit={onSubmit}>
        <div className="fp-header">
          <span>Forgot Password</span>
          {meta.type && (
            <span className={meta.type === "failed" ? "fp-error" : null}>
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
        <div className="fp-footer">
          <Link href="/login">Login?</Link>
          <button disabled={loading}>
            {loading ? <Loading type="button" /> : "Request Reset"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

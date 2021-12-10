import { useEffect, useState } from "react";
import Input from "components/Input";
import Loading from "components/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import Helpers from "helpers";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [meta, setMeta] = useState({ type: null, message: null });
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    name: null,
    username: null,
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (credentials.name.length < 6) {
      setErrors({ ...errors, name: "Invalid name" });
      return;
    }
    if (credentials.username.length < 3) {
      setErrors({ ...errors, username: "Invalid username" });
      return;
    }
    if (!Helpers.isEmail(credentials.email)) {
      setErrors({ ...errors, email: "Invalid Email" });
      return;
    }
    if (credentials.password.length < 6) {
      setErrors({ ...errors, password: "Wrong password" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/auth/register", credentials);
      router.push(`/verify?purpose=EmailVerify&_id=${response.data}`);
    } catch (error) {
      const errors = error.response.data;
      if (typeof errors === "object") {
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
    <div className="register-container">
      <img src="/icons/login.svg" />
      <form className="register-form" onSubmit={onSubmit}>
        <div className="register-header">
          <span>Register here</span>
          {meta.type && (
            <span className={meta.type === "failed" ? "register-error" : null}>
              {meta.message}
            </span>
          )}
        </div>
        <Input
          label="name"
          error={errors.name}
          value={credentials.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
        <Input
          label="username"
          error={errors.username}
          value={credentials.username}
          onChange={handleChange}
          placeholder="Your username"
        />
        <Input
          label="email"
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
        <div className="register-footer">
          <Link href="/forgotpassword"> Forgot Password?</Link>
          <button>{loading ? <Loading /> : "Register"}</button>
        </div>
        <span>
          Already registered? <Link href="/login">Login here</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

import { useEffect, useState } from "react";
import Loading from "components/Loading";
import { useRouter } from "next/router";
import axios from "axios";

const Verify = () => {
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    f1: "",
    f2: "",
    f3: "",
    f4: "",
    f5: "",
    f6: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    if (event.target.value.length > 1) return;
    if (!isNaN(Number(event.target.value)) || event.target.value === "") {
      setCredentials({
        ...credentials,
        [event.target.name]: event.target.value,
      });
    }
  };

  const UpdateField = (event) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      const next = event.target.tabIndex - 2;
      if (next > -1) {
        event.target.form.elements[next].focus();
      }
    } else {
      if (!event.target.value) return;
      if (typeof Number(event.target.value) === "number") {
        const next = event.target.tabIndex;
        if (next < 6) {
          event.target.form.elements[next].focus();
        }
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log();
    setLoading(true);
    try {
      const response = await axios.post(`/auth/verifyOtp`, {
        purpose: meta.purpose,
        otp: Object.values(credentials).toString().replaceAll(",", ""),
        _id: meta._id,
      });
      if (response.data === "Ok") router.replace("/");
    } catch (error) {
      if (error.response.data) {
        setError(error.response.data);
      }
    }
    setLoading(false);
  };

  const getTitle = (purpose) => {
    switch (purpose) {
      case "EmailVerify":
        return "Confirm Email Address";
      case "DeleteUser":
        return "Confirm Account Deletion";
      default:
        break;
    }
  };

  const requestOtp = async () => {
    setLoading(true);
    const { purpose, _id } = router.query;
    try {
      await axios.post("/auth/requestotp", { purpose, _id });
      setMeta({
        title: getTitle(purpose),
        purpose: purpose,
        _id: _id,
        otpRequested: true,
        subTitle: "An otp has been sent to your registered email address",
      });
    } catch (error) {
      if (error.response.data === "Invalid Request!") router.replace("/");
      setMeta({
        ...meta,
        otpRequested: false,
        subTitle: "Unable to request OTP at the moment!",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    requestOtp();
  }, []);

  useEffect(() => {
    setError("");
  }, [credentials]);

  if (!meta) return <Loading type="page" />;

  return (
    <div className="verify-container">
      <img src="/icons/login.svg" />
      <form className="verify-form" onSubmit={onSubmit}>
        <div className="verify-header">
          <span>{meta.title}</span>
          <span
            className={meta.otpRequested ? "verify-success" : "verify-failed"}
          >
            {meta.subTitle}
          </span>
        </div>
        <div className="verify-input">
          <input
            name="f1"
            disabled={!meta.otpRequested}
            value={credentials.f1}
            onChange={handleChange}
            maxLength={1}
            tabIndex="1"
            onKeyUp={UpdateField}
          />
          <input
            name="f2"
            disabled={!meta.otpRequested}
            value={credentials.f2}
            onChange={handleChange}
            maxLength={1}
            tabIndex="2"
            onKeyUp={UpdateField}
          />
          <input
            name="f3"
            disabled={!meta.otpRequested}
            value={credentials.f3}
            onChange={handleChange}
            maxLength="1"
            tabIndex="3"
            onKeyUp={UpdateField}
          />
          <input
            name="f4"
            disabled={!meta.otpRequested}
            value={credentials.f4}
            onChange={handleChange}
            maxLength="1"
            tabIndex="4"
            onKeyUp={UpdateField}
          />
          <input
            name="f5"
            disabled={!meta.otpRequested}
            value={credentials.f5}
            onChange={handleChange}
            maxLength="1"
            tabIndex="5"
            onKeyUp={UpdateField}
          />
          <input
            name="f6"
            disabled={!meta.otpRequested}
            value={credentials.f6}
            onChange={handleChange}
            maxLength="1"
            tabIndex="6"
            onKeyUp={UpdateField}
          />
        </div>
        <span className="verify-error">{error}</span>
        <div className="verify-footer">
          <a href="#" onClick={() => requestOtp()}>
            Request again
          </a>
          <button disabled={loading}>
            {loading ? <Loading type="button" /> : "verify"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verify;

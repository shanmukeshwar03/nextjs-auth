import axios from "axios";

import "styles/globals.css";
import "styles/form.css";
import "styles/login.css";
import "styles/register.css";
import "styles/Input.css";
import "styles/Loading.css";
import "styles/verify.css";
import "styles/home.css";
import "styles/forgotpassword.css";
import "styles/resetpassword.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_HOST_URL;

const App = ({ Component }) => {
  return <Component />;
};

export default App;

import Loading from "components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const checkLoggedIn = async () => {
    let _user = localStorage.getItem("user");
    if (!_user) router.replace("/login");
    _user = JSON.parse(_user);
    setUser(_user);
    setLoading(false);
  };

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      localStorage.clear();
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    router.replace(`/verify?purpose=DeleteUser&_id=${user._id}`);
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  if (loading) return <Loading type="page" />;

  return (
    <div className="home-container">
      <div className="home-appbar">
        <h3>
          Hello , <span>{user.name}</span>
        </h3>
        <button className="home-warning" onClick={deleteUser}>
          Deregister
        </button>
      </div>
      <div className="home-body">
        <span>You are successfully logged in!</span>
        <button className="home-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

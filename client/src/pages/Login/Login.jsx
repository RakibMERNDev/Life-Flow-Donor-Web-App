import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Container from "../../Components/Shared/Container";
import useAuth from "../../hooks/useAuth.js";

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((result) => {
        // console.log(result.user);
        // dd

        if (result.user) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successful",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate(from, { replace: true });
        }
      })
      .catch(() => {
        // console.log(error.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Email or Password is incorrect",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <Container>
      <Helmet>
        <title>LifeFlowDonor | Login</title>
      </Helmet>
      <div className="py-10 px-5 min-h-[calc(100vh-220px)] flex justify-center items-center">
        <div className="md:w-2/4 lg:w-5/12 xl:w-1/4 mx-auto">
          <div className="border rounded-md shadow-xl shadow-red-900 py-10">
            <h1 className="text-center text-black font-semibold text-2xl">
              Log in here and join us
            </h1>
            <form className="card-body text-black" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="donor@donor.com"
                  className=" py-2 px-2 rounded-md input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="******"
                  className="py-2 px-2 rounded-md  input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6 w-1/4 mx-auto">
                <button
                  type="submit"
                  className="rounded-md transition delay-200 bg-white text-red-500 hover:bg-red-950 py-1 hover:text-black border-0"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-black font-semibold text-sm text-center">
              Do not have an account ?{" "}
              <Link to="/signup">
                <span className="hover:text-red-900">Signup</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;

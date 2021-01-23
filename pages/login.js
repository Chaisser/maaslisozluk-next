import { useState, useEffect } from "react";
import Link from "next/link";
import validator from "validator";
import Template from "./Template";
import Alert from "./../ui/Alert";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./../store/actions/user";
import PublicRoute from "./PublicRoute";

const Login = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const loginError = useSelector((state) => state.user.errorLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (data.errorMessage) {
      setButtonDisabled(false);
    }
    setErrorMessage(data.errorMessage);
    localStorage.setItem("token", data.token);
  }, [data]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (validator.isEmpty(email)) {
      return setErrorMessage("lütfen e-posta adresinizi girin");
    }

    if (!validator.isEmail(email)) {
      return setErrorMessage("lütfen geçerli bir e-posta adresi girin");
    }

    if (password.length < 6) {
      return setErrorMessage("şifreniz 6 haneden büyük olmalıdır");
    }
    setButtonDisabled(true);
    dispatch(loginUser(email, password));
  };
  return (
    <Template sidebarVisible={false}>
      <PublicRoute>
        <div className="col-span-12">
          <form className="w-full text-center" onSubmit={onSubmit}>
            <div className="mb-4 text-xl font-semibold text-brand-500">üye girişi</div>
            {loginError && <Alert bg="red" title={loginError} />}
            {errorMessage && <Alert bg="red" title={errorMessage} />}
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 text-center text-gray-800 bg-gray-200 rounded-md outline-none sm:w-1/2 md:w-2/4 lg:w-1/4"
                type="email"
                name="email"
                required
                placeholder="e-posta"
                onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                value={email}
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 text-center text-gray-800 bg-gray-200 rounded-md outline-none sm:w-1/2 md:w-2/4 lg:w-1/4"
                type="password"
                required
                name="password"
                placeholder="şifre"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="w-full mx-auto sm:w-1/2 md:w-2/4 lg:w-1/4">
              <div className="flex items-center justify-between mb-4">
                <button
                  disabled={buttonDisabled}
                  className="px-3 py-2 rounded-md bg-brand-500 text-brand-300"
                  type="submit"
                >
                  giriş yap
                </button>

                <div className="text-center">
                  <Link href="/sifremi-unuttum">
                    <a className="hover:text-gray-500">şifremi unuttum!</a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </PublicRoute>
    </Template>
  );
};

export default Login;

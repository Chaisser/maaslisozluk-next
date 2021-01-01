import { useState, useEffect } from "react";
import validator from "validator";
import Template from "./Template";
import Alert from "./../ui/Alert";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./../store/actions/user";
import PublicRoute from "./PublicRoute";

const Login = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
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

    if (password.length > 12) {
      return setErrorMessage("şifreniz 12 haneden büyük olamaz");
    }

    if (password.length < 6) {
      return setErrorMessage("şifreniz 8 haneden büyük olmalıdır");
    }
    setButtonDisabled(true);
    dispatch(loginUser(email, password));
  };
  return (
    <Template sidebarVisible={false}>
      <PublicRoute>
        <div className="col-span-12">
          <form className="w-full text-center" onSubmit={onSubmit}>
            <div className="text-xl text-brand-500 font-semibold mb-4">üye girişi</div>
            {errorMessage && <Alert bg="red" title={errorMessage} />}
            <div className="mb-4">
              <input
                className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full sm:w-1/2 md:w-2/4 lg:w-1/4 outline-none text-center"
                type="email"
                required
                placeholder="e-posta"
                onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                value={email}
              />
            </div>
            <div className="mb-4">
              <input
                className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full sm:w-1/2 md:w-2/4 lg:w-1/4 outline-none text-center"
                type="password"
                required
                placeholder="şifre"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="mb-4">
              <input
                className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full sm:w-1/2 md:w-2/4 lg:w-1/4 outline-none text-center"
                type="text"
                placeholder="2fa kodu"
                onChange={(e) => setTwoFactorCode(e.target.value)}
                value={twoFactorCode}
              />
            </div>

            <div className="mb-4">
              <button
                disabled={buttonDisabled}
                className="bg-brand-500 text-brand-300 rounded-md px-3 py-2"
                type="submit"
              >
                giriş yap
              </button>
            </div>
            <div className="text-center">aa</div>
          </form>
        </div>
      </PublicRoute>
    </Template>
  );
};

export default Login;

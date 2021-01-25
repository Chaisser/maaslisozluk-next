import { useState, useEffect } from "react";
import Link from "next/link";
import validator from "validator";
import Alert from "./../ui/Alert";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./../store/actions/user";
import { GrClose } from "react-icons/gr";

import Modal from "react-modal";

const customStyles = {
  overlay: {
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(2px)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "none",
    marginRight: "-50%",
    padding: "0px",
    minWidth: "600px",
    transform: "translate(-50%, -50%)",
  },
};

const Login = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);
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

  useEffect(() => {
    if (token) {
      props.closeModal();
    }
  }, [token]);
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
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={() => console.log("modal açıldı")}
      onRequestClose={props.closeModal}
      style={customStyles}
      ariaHideApp={true}
      contentLabel="Login"
    >
      <div className="">
        <div className="relative dark:bg-dark-600">
          <div className="absolute right-3 top-3">
            <button className="text-xl dark:text-dark-200" onClick={props.closeModal}>
              <GrClose />
            </button>
          </div>
          <div className="absolute w-full text-center bottom-3">
            <div className="mb-4 text-xl font-semibold dark:text-dark-400">üye girişi</div>
          </div>
          <div className="flex justify-center py-32 text-2xl dark:text-white">Maaslisozluk</div>
        </div>
        <form className="w-full px-24 pt-12 pb-8 text-center dark:bg-dark-300" onSubmit={onSubmit}>
          {loginError && <Alert bg="red" title={loginError} />}
          {errorMessage && <Alert bg="red" title={errorMessage} />}
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 text-center text-gray-800 rounded-md outline-none dark:bg-dark-200"
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
              className="w-full px-3 py-2 text-center text-gray-800 rounded-md outline-none dark:bg-dark-200"
              type="password"
              required
              name="password"
              placeholder="şifre"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="w-full mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button
                disabled={buttonDisabled}
                className="px-5 py-1 rounded-full dark:bg-dark-200 dark:text-dark-600"
                type="submit"
              >
                giriş yap
              </button>

              <div className="text-center">
                <Link href="/sifremi-unuttum">
                  <a className="hover:text-gray-500 dark:text-dark-400">şifremi unuttum!</a>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Login;

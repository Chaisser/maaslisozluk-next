import { useState, useEffect } from "react";
import validator from "validator";
import Alert from "./../ui/Alert";
import InputMask from "react-input-mask";
import passwordStrength from "check-password-strength";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "./../store/actions/user";
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

const Register = (props) => {
  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.user.errorRegister);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCondition, setPasswordCondition] = useState("Weak");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (password) {
      setPasswordCondition(passwordStrength(password).value);
    } else {
      setPasswordCondition("Weak");
    }
  }, [password]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (passwordCondition === "Weak") {
      return setErrorMessage("zayıf şifre kullanılamaz");
    }
    if (username.length < 4) {
      return setErrorMessage("kullanıcı adı 4 haneden küçük olamaz");
    }

    if (username.length > 24) {
      return setErrorMessage("kullanıcı adı 24 haneden büyük olamaz");
    }

    if (validator.isEmpty(email)) {
      return setErrorMessage("lütfen e-posta adresinizi girin");
    }

    if (!validator.isEmail(email)) {
      return setErrorMessage("lütfen geçerli bir e-posta adresi girin");
    }

    if (password.length < 6) {
      return setErrorMessage("şifreniz 6 haneden büyük olmalıdır");
    }

    dispatch(createUser(username, email, city, phoneNumber, password));
  };
  return (
    <Modal
      isOpen={props.isOpen}
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
            <div className="mb-4 text-xl font-semibold dark:text-dark-400">kayıt ol</div>
          </div>
          <div className="flex justify-center py-32 text-2xl dark:text-white">Maaslisozluk</div>
        </div>
        <form className="w-full px-24 pt-12 pb-8 text-center dark:bg-dark-300" onSubmit={onSubmit}>
          {registerError && <Alert bg="red" title={registerError} />}
          {errorMessage && <Alert bg="red" title={errorMessage} />}
          <div className="mb-4">
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold dark:text-dark-400">kullanıcı adı</label>
              <input
                className="w-full px-3 py-2 text-center text-gray-800 rounded-md outline-none dark:bg-dark-200"
                type="text"
                required
                name="username"
                placeholder="kullanıcı adı*"
                onChange={(e) => setUsername(e.target.value.replace(" ", "").toLowerCase().trim())}
                value={username}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold dark:text-dark-400">e-posta</label>
              <input
                className="w-full px-3 py-2 text-center text-gray-800 rounded-md outline-none dark:bg-dark-200"
                type="email"
                required
                name="email"
                placeholder="e-posta*"
                onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                value={email}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold dark:text-dark-400">telefon</label>
            <InputMask
              mask="0 (999) 999 99 99"
              className="w-full px-3 py-2 text-center text-gray-800 rounded-md outline-none dark:bg-dark-200"
              type="text"
              name="phoneNumber"
              placeholder="telefon"
              onChange={(e) => setPhoneNumber(e.target.value.toLowerCase().trim())}
              value={phoneNumber}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold dark:text-dark-400">şehir</label>
            <input
              className="w-full px-3 py-2 text-center text-gray-800 rounded-md outline-none dark:bg-dark-200"
              type="text"
              name="city"
              placeholder="şehir"
              onChange={(e) => setCity(e.target.value.toLowerCase().trim())}
              value={city}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold dark:text-dark-400">şifre</label>
            <input
              className="w-full px-3 py-2 text-center text-gray-800 rounded-md outline-none dark:bg-dark-200"
              type="password"
              required
              name="password"
              placeholder="şifre*"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="flex justify-center -mt-2">
              <span
                className={`text-xs text-right px-4 py-1 rounded-lg dark:text-white ${
                  passwordCondition === "Weak" && "bg-red-500"
                }  ${passwordCondition === "Medium" && "bg-yellow-600"} ${
                  passwordCondition === "Strong" && "bg-green-600"
                }`}
              >
                {passwordCondition === "Weak" && "zayıf"}
                {passwordCondition === "Medium" && "idare eder"}
                {passwordCondition === "Strong" && "çok iyi"}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <button className="px-5 py-1 rounded-full dark:bg-dark-200 dark:text-dark-600" type="submit">
              kayıt ol
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Register;

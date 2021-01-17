import { useState } from "react";
import validator from "validator";
import Template from "./Template";
import Alert from "./../ui/Alert";
import PublicRoute from "./PublicRoute";

import { useDispatch } from "react-redux";
import { createUser } from "./../store/actions/user";

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

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
    <Template sidebarVisible={false}>
      <PublicRoute>
        <form className="w-full text-center" onSubmit={onSubmit}>
          <div className="text-xl text-brand-500 font-semibold mb-4">kayıt ol</div>
          {errorMessage && <Alert bg="red" title={errorMessage} />}
          <div className="mb-4">
            <div className="mb-4">
              <input
                className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full md:w-1/4   outline-none text-center"
                type="text"
                required
                name="username"
                placeholder="kullanıcı adı*"
                onChange={(e) => setUsername(e.target.value.replace(" ", "").toLowerCase().trim())}
                value={username}
              />
            </div>

            <input
              className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full md:w-1/4   outline-none text-center"
              type="email"
              required
              name="email"
              placeholder="e-posta*"
              onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
              value={email}
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full md:w-1/4 outline-none text-center"
              type="text"
              name="phoneNumber"
              placeholder="telefon"
              onChange={(e) => setPhoneNumber(e.target.value.toLowerCase().trim())}
              value={phoneNumber}
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full md:w-1/4   outline-none text-center"
              type="text"
              name="city"
              placeholder="şehir"
              onChange={(e) => setCity(e.target.value.toLowerCase().trim())}
              value={city}
            />
          </div>

          <div className="mb-4">
            <input
              className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full sm:w-1/2 md:w-1/4 outline-none text-center"
              type="password"
              required
              name="password"
              placeholder="şifre*"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="mb-4">
            <button className="bg-brand-500 text-brand-300 rounded-md px-3 py-2" type="submit">
              kayıt ol
            </button>
          </div>
        </form>
      </PublicRoute>
    </Template>
  );
};

export default Register;

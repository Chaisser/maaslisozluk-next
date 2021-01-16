import { useState } from "react";
import { useSelector } from "react-redux";

import getClient from "./../apollo/apollo";
import Template from "./Template";
import { GETME } from "./../gql/user/query";
import Title from "./../ui/Title";
import Alert from "./../ui/Alert";
import { getTokenFromCookie } from "./../utils/functions";

import moment from "moment";
import "moment/locale/tr";
moment.locale("tr");

const Profil = ({ userInformation }) => {
  console.log(userInformation, "USER INFO");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");

  const emailValidated = false;

  const token = useSelector((state) => state.user.token);

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordErrorMessage("");
    if (!currentPassword) {
      return setPasswordErrorMessage("mecvut şifrenin girilmesi gereklidir");
    }

    if (!password) {
      return setPasswordErrorMessage("şifre girilmesi gereklidir");
    }

    if (password.length < 6) {
      return setPasswordErrorMessage("şifreniz 6 haneden büyük olmalıdır");
    }

    if (rePassword !== password) {
      return setPasswordErrorMessage("şifreler uyuşmuyor");
    }

    //TODO -> Change Password
  };
  return (
    <Template>
      <div className="col-span-9">
        <Title title="profil" />
        <div className="mb-4"></div>
        <div className="mb-4">
          <input
            className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full sm:w-1/2 md:w-2/4 table-auto outline-none"
            type="text"
            required
            placeholder="şehir"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>
        <br />
        <div className="mb-4">
          <input
            className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full sm:w-1/2 md:w-2/4 table-auto outline-none"
            type="password"
            required
            placeholder="yeni şifre"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        telefon <br />
        <hr />
        <Title title="şifre değiştir" />
        {passwordErrorMessage && <Alert title={passwordErrorMessage} bg="red" />}
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <input
              className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full sm:w-1/2 md:w-2/4 table-auto outline-none"
              type="password"
              required
              placeholder="mevcut şifre"
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full sm:w-1/2 md:w-2/4 table-auto outline-none"
              type="password"
              required
              placeholder="yeni şifre"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-200 text-gray-800 py-2 px-3 rounded-md w-full sm:w-1/2 md:w-2/4 table-auto outline-none"
              type="password"
              required
              placeholder="yeni şifre"
              onChange={(e) => setRePassword(e.target.value)}
              value={rePassword}
            />
          </div>
          <div className="mb-4">
            <button className="bg-brand-500 text-brand-300 rounded-md px-3 py-2" type="submit">
              şifre değiştir
            </button>
          </div>
        </form>
      </div>
    </Template>
  );
};

export async function getServerSideProps(context) {
  const token = getTokenFromCookie(context);
  if (!token) {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/login`);
  }
  try {
    const result = await getClient(token).query({
      query: GETME,
    });

    console.log(result);
    return {
      props: {
        userInformation: result.data.me,
      },
    };
  } catch {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/error`);
  }
  return {
    props: {},
  };
}

export default Profil;

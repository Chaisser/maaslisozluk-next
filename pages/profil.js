import { useState } from "react";
import { useSelector } from "react-redux";
import getClient from "./../apollo/apollo";
import Link from "next/link";
import Template from "./Template";
import { GETME } from "./../gql/user/query";
import { SENDEMAILACTIVATIONCODE, SENDPHONENUMBERACTIVATIONCODE } from "./../gql/user/mutation";
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
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [smsError, setSmsError] = useState("");

  const token = useSelector((state) => state.user.token);

  const sendPhoneActivationCode = async () => {
    setSmsError("");
    try {
      const result = await getClient(token).mutate({
        mutation: SENDPHONENUMBERACTIVATIONCODE,
      });
      if (result.data.sendPhoneActivationCode.result === "success") {
        return setSmsSent(true);
      }
    } catch (error) {
      console.log("hata");
      setSmsError(error.message);
    }
  };
  const sendEmailActivationCode = async () => {
    const result = await getClient(token).mutate({
      mutation: SENDEMAILACTIVATIONCODE,
      variables: {},
    });
    if (result.data.sendEmailActivationCode.result === "OK") {
      return setEmailSent(true);
    }
  };
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
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700">e-posta</label>
          <div className="flex w-full mt-1 rounded-md shadow-sm md:w-1/2">
            <span
              className={`inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md  ${
                userInformation.emailActivation ? "bg-green-200" : "bg-red-200"
              }`}
            >
              {userInformation.emailActivation ? "onaylı" : "onaysız"}
            </span>
            <input
              type="text"
              className="flex-1 block w-full px-3 py-2 text-gray-800 bg-gray-200 outline-none table-auto "
              placeholder="e-mail"
              value={userInformation.email}
              disabled={userInformation.emailActivation}
            />
            {userInformation.emailActivation ? (
              ""
            ) : emailSent ? (
              <Link href="/aktivasyon">
                <a
                  className={`inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-l-0 border-gray-300 underline rounded-r-md bg-yellow-200`}
                >
                  aktifleştir
                </a>
              </Link>
            ) : (
              <button
                onClick={sendEmailActivationCode}
                className={`inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-l-0 border-gray-300 underline rounded-r-md bg-gray-50`}
              >
                kod gönder
              </button>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700">telefon</label>
          <div className="flex w-full mt-1 rounded-md shadow-sm md:w-1/2">
            <span
              className={`inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md  ${
                userInformation.phoneNumberActivation ? "bg-green-200" : "bg-red-200"
              }`}
            >
              {userInformation.phoneNumberActivation ? "onaylı" : "onaysız"}
            </span>
            <input
              type="text"
              className="flex-1 block w-full px-3 py-2 text-gray-800 bg-gray-200 outline-none table-auto"
              placeholder="telefon"
              value={""}
            />
            {userInformation.phoneActivation ? (
              ""
            ) : smsSent ? (
              <Link href="/aktivasyon">
                <a
                  className={`inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-l-0 border-gray-300 underline rounded-r-md bg-yellow-200`}
                >
                  aktifleştir
                </a>
              </Link>
            ) : (
              <button
                onClick={sendPhoneActivationCode}
                className={`inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-l-0 border-gray-300 underline rounded-r-md bg-gray-50`}
              >
                kod gönder
              </button>
            )}
          </div>
          {smsError && <Alert title={smsError} bg="red" />}
        </div>
        <div className="mb-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">şehir</label>
          </div>
          <div className="mt-1">
            <input
              className="w-full px-3 py-2 text-gray-800 bg-gray-200 rounded-md outline-none table-auto sm:w-1/2 md:w-2/4"
              type="text"
              required
              placeholder="şehir"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
        </div>

        <div className="mt-12">
          <Title title="şifre değiştir" />
        </div>
        {passwordErrorMessage && <Alert title={passwordErrorMessage} bg="red" />}
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700">mevcut şifre</label>
            <div className="mt-1">
              <input
                className="w-full px-3 py-2 text-gray-800 bg-gray-200 rounded-md outline-none table-auto sm:w-1/2 md:w-2/4"
                type="password"
                required
                placeholder="mevcut şifre"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700">yeni şifre</label>
            <div className="mt-1">
              <input
                className="w-full px-3 py-2 text-gray-800 bg-gray-200 rounded-md outline-none table-auto sm:w-1/2 md:w-2/4"
                type="password"
                required
                placeholder="yeni şifre"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700">yeni şifre (tekrar)</label>
            <div className="mt-1">
              <input
                className="w-full px-3 py-2 text-gray-800 bg-gray-200 rounded-md outline-none table-auto sm:w-1/2 md:w-2/4"
                type="password"
                required
                placeholder="yeni şifre (tekrar)"
                onChange={(e) => setRePassword(e.target.value)}
                value={rePassword}
              />
            </div>
          </div>
          <div className="mb-4">
            <button className="px-3 py-2 rounded-md bg-brand-500 text-brand-300" type="submit">
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

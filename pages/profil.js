import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import getClient from "./../apollo/apollo";
import Link from "next/link";
import Template from "./Template";
import { GETME } from "./../gql/user/query";
import {
  SENDEMAILACTIVATIONCODE,
  SENDPHONENUMBERACTIVATIONCODE,
  CHECKPHONEACTIVATIONCODE,
  UPDATEUSER,
  CHANGEPASSWORD,
} from "./../gql/user/mutation";
import Title from "./../ui/Title";
import Alert from "./../ui/Alert";
import { getTokenFromCookie } from "./../utils/functions";
import InputMask from "react-input-mask";
import passwordStrength from "check-password-strength";

import moment from "moment";
import "moment/locale/tr";

moment.locale("tr");

const Profil = ({ userInformation }) => {
  const router = useRouter();

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [updateErrorMessage, setUpdateErrorMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [city, setCity] = useState(userInformation.city);
  const [email, setEmail] = useState(userInformation.email);
  const [phoneNumber, setPhoneNumber] = useState(userInformation.phoneNumber);
  const [phoneNumberActivation, setPhoneNumberActivation] = useState(userInformation.phoneNumberActivation);
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [smsError, setSmsError] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [passwordCondition, setPasswordCondition] = useState("Weak");
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  useEffect(() => {
    if (password) {
      setPasswordCondition(passwordStrength(password).value);
    } else {
      setPasswordCondition("Weak");
    }
  }, [password]);

  const handlePhoneActivationCode = async (phoneActivationCode) => {
    try {
      const result = await getClient(token).mutate({
        mutation: CHECKPHONEACTIVATIONCODE,
        variables: {
          phoneActivationCode,
        },
      });
      if (result.data.checkPhoneActivationCode.result === "success") {
        return setSmsSent(true);
      }
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    const code = smsCode;
    if (code.length === 6) {
      setSmsError("");

      handlePhoneActivationCode(code)
        .then((res) => {
          if (res === "Hatalı Kod") {
            setSmsCode("");
            return setSmsError("hatalı kod");
          }
          setPhoneNumberActivation(true);
          setSmsSent(false);
        })
        .catch((err) => {
          setSmsError(err.message);
        });
    }
  }, [smsCode]);

  const handleUpdateUser = async () => {
    setUpdateErrorMessage("");

    if (!email) {
      return setUpdateErrorMessage("e-posta alanı zorunludur");
    }

    try {
      const result = await getClient(token).mutate({
        mutation: UPDATEUSER,
        variables: {
          email,
          phoneNumber,
          city,
        },
      });
      if (result.data.updateUser.id) {
        console.log("ok");
      }
    } catch (error) {
      setUpdateErrorMessage(error.message);
    }
  };
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
  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordErrorMessage("");
    if (passwordCondition === "Weak") {
      return setPasswordErrorMessage("zayıf şifre kullanılamaz");
    }

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

    try {
      const result = await getClient(token).mutate({
        mutation: CHANGEPASSWORD,
        variables: {
          currentPassword,
          password,
        },
      });

      if (result.data.changePassword.id) {
        setPassword("");
        setRePassword("");
        setCurrentPassword("");
        console.log("ok");
      }
    } catch (error) {
      console.log(error);
      setPasswordErrorMessage(error.message);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                phoneNumberActivation ? "bg-green-200" : "bg-red-200"
              }`}
            >
              {phoneNumberActivation ? "onaylı" : "onaysız"}
            </span>
            <InputMask
              mask="0 (999) 999 99 99"
              type="text"
              className="flex-1 block w-full px-3 py-2 text-gray-800 bg-gray-200 outline-none table-auto"
              placeholder="telefon"
              value={phoneNumber}
              disabled={phoneNumberActivation}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {phoneNumberActivation ? (
              ""
            ) : smsSent ? (
              <InputMask
                mask="9-9-9-9-9-9"
                type="text"
                className={`flex-1 text-right block w-full px-3 py-2 text-gray-800 bg-yellow-200 outline-none table-auto`}
                value={smsCode}
                disabled={smsCode.length === 6}
                placeholder="onay kodu"
                onChange={(e) => setSmsCode(e.target.value.replace(/_/g, "").replace(/-/g, ""))}
              />
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
        <div className="mb-4">
          <button onClick={handleUpdateUser} className="px-3 py-2 rounded-md bg-brand-500 text-brand-300" type="submit">
            güncelle
          </button>
        </div>

        <div className="mt-12">
          <Title title="şifre değiştir" />
        </div>
        <div className="sm:w-1/2 md:w-2/4">
          {passwordErrorMessage && <Alert title={passwordErrorMessage} bg="red" />}
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-700">mevcut şifre</label>
              <div className="mt-1">
                <input
                  className="w-full px-3 py-2 text-gray-800 bg-gray-200 rounded-md outline-none table-auto "
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
                  className="w-full px-3 py-2 text-gray-800 bg-gray-200 rounded-md outline-none table-auto "
                  type="password"
                  required
                  placeholder="yeni şifre"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
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
              <label className="text-sm font-semibold text-gray-700">yeni şifre (tekrar)</label>
              <div className="mt-1">
                <input
                  className="w-full px-3 py-2 text-gray-800 bg-gray-200 rounded-md outline-none table-auto "
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
      </div>
    </Template>
  );
};

export async function getServerSideProps(context) {
  const token = getTokenFromCookie(context);

  if (!token) {
    context.res.statusCode = 302;
    return context.res.setHeader("Location", `/login`);
  }
  try {
    const result = await getClient(token).query({
      query: GETME,
    });
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

import { useState } from "react";
import getClient from "./../apollo/apollo";
import Template from "./Template";
import Title from "./../ui/Title";
import Alert from "./../ui/Alert";
import { RESETPASSWORD, CHECKPASSWORDACTIVATIONCODE } from "./../gql/user/mutation";

const Aktivasyon = (props) => {
  const [errorMessage, setErrorMessage] = useState(props.result !== "success" && "geçersiz kod");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordErrorMessage("");

    if (!password) {
      return setPasswordErrorMessage("şifre girilmesi gereklidir");
    }

    if (password.length < 6) {
      return setPasswordErrorMessage("şifreniz 6 haneden büyük olmalıdır");
    }

    if (rePassword !== password) {
      return setPasswordErrorMessage("şifreler uyuşmuyor");
    }

    const variables = {
      password,
      emailActivationCode: props.emailActivationCode,
      email: props.email,
      id: props.id,
    };

    try {
      const result = await getClient().mutate({
        mutation: RESETPASSWORD,
        variables,
      });

      if (result.data.resetPassword.result) {
        setPassword("");
        setRePassword("");
        setPasswordErrorMessage("değişti");
      }
    } catch (error) {
      setPasswordErrorMessage(error.message);
    }

    //TODO -> Change Password
  };

  return (
    <Template>
      <div className="col-span-9">
        {errorMessage ? (
          <Alert title={errorMessage} bg="red" />
        ) : (
          <div>
            <Title title="yeni şifre oluştur" />

            {passwordErrorMessage && <Alert title={passwordErrorMessage} bg="red" />}
            <form onSubmit={handleChangePassword}>
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
        )}
      </div>
    </Template>
  );
};

export async function getServerSideProps(context) {
  try {
    const result = await getClient().mutate({
      mutation: CHECKPASSWORDACTIVATIONCODE,
      variables: {
        emailActivationCode: context.query.kod,
        email: context.query.email,
        id: context.query.id,
      },
    });

    return {
      props: {
        result: "success",
        emailActivationCode: context.query.kod,
        email: context.query.email,
        id: context.query.id,
      },
    };
  } catch (err) {
    return {
      props: {
        result: "error",
      },
    };
  }
}

export default Aktivasyon;

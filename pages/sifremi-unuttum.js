import { useState, useEffect } from "react";
import Link from "next/link";
import validator from "validator";
import Template from "./Template";
import Alert from "./../ui/Alert";
import PublicRoute from "./PublicRoute";
import { SENDFORGETPASSWORDCODE } from "./../gql/user/mutation";
import getClient from "./../apollo/apollo";

const SifremiUnuttum = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (validator.isEmpty(email)) {
      return setErrorMessage("lütfen e-posta adresinizi girin");
    }

    if (!validator.isEmail(email)) {
      return setErrorMessage("lütfen geçerli bir e-posta adresi girin");
    }
    setButtonDisabled(true);

    try {
      const result = getClient().mutate({
        mutation: SENDFORGETPASSWORDCODE,
        variables: {
          email,
        },
      });
      setEmail("");
      setSuccessMessage("böyle bir hesap varsa şifre sıfırlama talimatı e-posta adresinize gönderilmiştir");
    } catch (error) {
      setErrorMessage(error.message);
      setEmail("");
      setButtonDisabled(true);
    }
  };
  return (
    <Template sidebarVisible={false}>
      <PublicRoute>
        <div className="col-span-12">
          {successMessage ? (
            <Alert bg="green" title={successMessage} />
          ) : (
            <form className="w-full text-center" onSubmit={onSubmit}>
              <div className="mb-4 text-xl font-semibold text-brand-500">şifremi unuttum</div>
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

              <div className="w-full mx-auto sm:w-1/2 md:w-2/4 lg:w-1/4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    disabled={buttonDisabled}
                    className="px-3 py-2 rounded-md bg-brand-500 text-brand-300"
                    type="submit"
                  >
                    şifremi sıfırla
                  </button>

                  <div className="text-center">
                    <Link href="/login">
                      <a className="hover:text-gray-500">giriş yap</a>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </PublicRoute>
    </Template>
  );
};

export default SifremiUnuttum;

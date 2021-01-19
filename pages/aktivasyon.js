import { useState } from "react";
import getClient from "./../apollo/apollo";
import Template from "./Template";
import Title from "./../ui/Title";
import { CHECKEMAILACTIVATIONCODE } from "./../gql/user/mutation";

const Aktivasyon = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Template>
      <div className="col-span-9">
        <Title title="Bakiye" />
        {props.result}
      </div>
    </Template>
  );
};

export async function getServerSideProps(context) {
  console.log(context.query, "CTX QUERY");
  try {
    const result = await getClient().mutate({
      mutation: CHECKEMAILACTIVATIONCODE,
      variables: {
        emailActivationCode: context.query.kod,
        email: context.query.email,
        id: context.query.id,
      },
    });

    return {
      props: {
        result: "success",
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

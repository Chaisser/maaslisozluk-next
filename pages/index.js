import { useEffect, useState } from "react";
import { TRANSACTIONSUBSCRIPTION } from "./../gql/transaction/subscription";
import { useSubscription } from "@apollo/react-hooks";

import Template from "./Template";
import getClient from "./../apollo/apollo";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const { loading, error, data } = useSubscription(TRANSACTIONSUBSCRIPTION);

  return (
    <Template>
      <div className="col-span-9">topics</div>
    </Template>
  );
};

export default Home;

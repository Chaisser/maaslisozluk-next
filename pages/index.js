import { useEffect, useState } from "react";
import { TRANSACTIONSUBSCRIPTION } from "./../gql/transaction/subscription";
import Template from "./Template";
import getClient from "./../apollo/apollo";

const Home = () => {
  const [transactions, setTransactions] = useState([]);

  const data = getClient().subscribe({
    query: TRANSACTIONSUBSCRIPTION,
  });

  console.log(data);

  return (
    <Template>
      <div className="col-span-9">topics</div>
    </Template>
  );
};

export default Home;

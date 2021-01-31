import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import getClient from "./../apollo/apollo";
import Template from "./Template";
import Title from "./../ui/Title";
import { getTokenFromCookie } from "./../utils/functions";
import { GETUSERTRANSACTIONS } from "./../gql/user/query";
import Th from "./../ui/TableHead";
import Td from "./../ui/TableData";

import moment from "moment";
import "moment/locale/tr";
moment.locale("tr");

const Bakiye = (props) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  const renderTransactions = (transactions) => {
    if (transactions.length === 0) {
      return (
        <tr>
          <td colSpan="4">Hesapta hareket bulunmamıştır.</td>
        </tr>
      );
    }

    return transactions.map((transaction) => {
      return (
        <tr className={transaction.amount > 0 ? "bg-green-200" : "bg-red-200"} key={transaction.id}>
          <Td>{moment(transaction.createdAt).format("DD MMM YYYY - HH:mm")}</Td>
          <Td>{transaction.budgetType === "CUSTOM" ? transaction.description : transaction.topic.title}</Td>
          <Td>{transaction.budgetType}</Td>
          <Td>{(transaction.amount / 100000000).toFixed(8)}</Td>
        </tr>
      );
    });
  };
  return (
    <Template>
      <div className="col-span-9">
        <Title title="Bakiye" />
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <Th>tarih</Th>
              <Th>konu</Th>
              <Th>işlem</Th>
              <Th>miktar</Th>
            </tr>
          </thead>
          {renderTransactions(props.transactions)}
        </table>
      </div>
    </Template>
  );
};

export async function getServerSideProps(context) {
  const token = getTokenFromCookie(context);
  if (!token) {
    context.res.statusCode = 302;
    return context.res.setHeader("Location", `/`);
  }
  try {
    const result = await getClient(token).query({
      query: GETUSERTRANSACTIONS,
    });

    return {
      props: {
        transactions: result.data.getTransactions,
      },
    };
  } catch (err) {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/`);
  }
}

export default Bakiye;

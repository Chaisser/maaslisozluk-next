import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const PrivateRoute = (props) => {
  const token = useSelector((state) => state.user.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return <div>{props.children}</div>;
};

export default PrivateRoute;

import { useRouter } from "next/router";

const PrivateRoute = (props) => {
  // const token = useSelector((state) => state.user.token);
  const token = props.token;
  const router = useRouter();

  return <div>{props.children}</div>;
};

export default PrivateRoute;

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loading from "./../components/Loading";
const PublicRoute = (props) => {
  const token = useSelector((state) => state.user.token);
  const router = useRouter();

  if (token) {
    router.push("/");
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return <div>{props.children}</div>;
};

export default PublicRoute;

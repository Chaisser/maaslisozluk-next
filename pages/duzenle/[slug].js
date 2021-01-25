import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import getClient from "./../../apollo/apollo";
import { GETPOST } from "./../../gql/post/query";
import { UPDATEPOST } from "./../../gql/post/mutation";
import Template from "./../Template";
import NewEntry from "./../../components/NewEntry";
import Alert from "./../../ui/Alert";
import Title from "./../../ui/Title";
import { getTokenFromCookie } from "./../../utils/functions";
const Duzenle = (props) => {
  const router = useRouter();

  const [description, setDescription] = useState(props.description);

  const [errorMessage, setErrorMessage] = useState("");

  const token = useSelector((state) => state.user.token);
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!description) {
      return setErrorMessage("konunun ilk yazısının girilmesi gereklidir.");
    }

    if (description.length < 10) {
      return setErrorMessage("yazı minimum 10 karakterden oluşmalıdır");
    }

    try {
      const result = await getClient(token).mutate({
        mutation: UPDATEPOST,
        variables: {
          description,
          id: props.id,
        },
      });
      if (result.data) {
        router.push(`/konu/${props.slug}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Template>
      <div className="col-span-9">
        <Title title={props.topic} />

        <form onSubmit={onSubmit}>
          {errorMessage && <Alert title={errorMessage} bg="red" />}

          <NewEntry description={description} setDescription={setDescription} />
          <div className="mb-4">
            <button className="px-3 py-2 rounded-md bg-brand-500 text-brand-300" type="submit">
              kaydet
            </button>
          </div>
        </form>
      </div>
    </Template>
  );
};

export async function getServerSideProps(context) {
  const token = getTokenFromCookie(context);
  if (!token) {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/login`);
  }
  try {
    const result = await getClient(token).query({
      query: GETPOST,
      variables: {
        id: context.params.slug,
      },
    });

    return {
      props: {
        token,
        id: result.data.post.id,
        description: result.data.post.description,
        topic: result.data.post.topic.title,
        slug: result.data.post.topic.slug,
      },
    };
  } catch (err) {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/`);
  }
}

export default Duzenle;

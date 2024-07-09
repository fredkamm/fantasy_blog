import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() &&
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <h2 className="text-light p-3 mb-5">
        Viewing @{user.username}'s profile.
      </h2>

      {!userParam && (
        <div className="thoughtForm-profile">
          <ThoughtForm />
        </div>
      )}
      <div className="thoughts-profile">
        <ThoughtList
          thoughts={user.thoughts}
          title={`${user.username}'s Post History`}
          showTitle={false}
        />
      </div>
    </>
  );
};

export default Profile;

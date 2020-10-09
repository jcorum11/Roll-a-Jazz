import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

import CardList from "../components/CardList";
import CardCarousel from "../components/Carousel";
import CardToggle from "../components/CardToggle";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [viewSelected, setViewSelected] = useState(true);

  // const testCards = [
  //   'card1',
  //   'card2',
  //   'card2'
  // ];

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { username: userParam } = useParams();

  console.log(state);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const addCard = () => {
    dispatch({
      type: "CREATE_CARDS",
      cards: [{}, {}],
    });
  };
  useEffect(() => {
    addCard();
    // console.log(state.user);
  }, [user]);

  // if user is logged in, change the home page to the user cards list
  if (userParam) {
    // redirect to personal profile page if username is the logged-in user's
    if (
      Auth.loggedIn() &&
      Auth.getProfile().data.username.toLowerCase() === userParam.toLowerCase()
    ) {
      return <Redirect to="/home" />;
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if the user is not logged in, display this hero text and CTA
  if (!user?.username) {
    return (
      <div className="text-center m-4">
        <h1>Welcome to Roll-o-Jazz!</h1>
        <h4>Join a community of business professionals.</h4>
        <p>Login in or sign-up to get started!</p>
        <Button href="/login">Get Started</Button>
      </div>
    );
  }

  // if the user is logged in, display the user's unique cards
  return (
    <main className="container">
      <div className="row justify-content-center">
        <h3 className="p-3">My cards</h3>
        <div className="col-12 p-0">
          <CardToggle
            viewSelected={viewSelected}
            setViewSelected={setViewSelected}
          />
        </div>
        <div
          className="col-12 mt-0 p-0 text-center"
          style={{ backgroundColor: "#6C757D", minHeight: "50vh" }}
        >
          {loading && <div> Loading... </div>}
          {viewSelected ? (
            <CardList cards={user.cards} />
          ) : (
            <CardCarousel cards={user.cards} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

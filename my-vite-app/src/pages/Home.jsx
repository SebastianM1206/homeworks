import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BookStackComponent from "./BookStackComponent";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <BookStackComponent />
    </div>
  );
};

export default Home;

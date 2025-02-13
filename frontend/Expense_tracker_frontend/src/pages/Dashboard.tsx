// import React from 'react'

import { Box } from "@chakra-ui/react";
import { ExpensePage } from "../components/ExpensePage";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    // const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/"); // Redirect to login page
    }
  }, [accessToken, navigate]);
  return (
    <div>
      <Navbar />
      <Box borderRadius="lg" boxShadow="lg" bg={"orange.300"}>
        <ExpensePage />
      </Box>
    </div>
  );
};

export default Dashboard;

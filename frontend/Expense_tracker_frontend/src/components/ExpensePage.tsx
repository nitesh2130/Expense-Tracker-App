// import React from 'react'

import { Box, Button, FormControl, Input, SimpleGrid } from "@chakra-ui/react";
import AddExpense from "./addExpense";
import { useEffect, useState } from "react";
import { ExpenseCard } from "./ExpenseCard";
import axios from "axios";

export const ExpensePage = () => {
  const [ExpenseData, setExpenseData] = useState([]);
  const [typesOfExpense, setTypeOfExpense] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [updatePage, setUpdatePage] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [apidata, setApidata] = useState({
    typesOfExpense: "",
    startTime: "",
    endTime: "",
  });
  const apiUrlGetExpense = "http://localhost:3000/expense-users/all_expense";
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    getData();
  }, [apidata, updatePage]);

  // const submitFilter = (e) => {
  //   e.preventDefault(); // Prevent page refresh
  //   setFilters({ typesOfExpense, startDate, endDate }); // Update filters state
  // };

  const getData = async () => {
    const response = await axios.get(apiUrlGetExpense, {
      params: apidata,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // Ensure the correct content type
      },
    });

    setExpenseData(response.data);
    // const totalAmount = ExpenseData?.reduce(
    //   (sum: number, expense: any) => sum + expense.amount,
    //   0
    // );
  };

  useEffect(() => {
    setTotalAmount(
      ExpenseData.reduce((sum: number, expense: any) => sum + expense.amount, 0)
    );
  }, [ExpenseData]);

  const submitFilter = (e: any) => {
    e.preventDefault();

    const formattedStartDate = startTime
      ? new Date(`${startTime}T00:00:00.000Z`).toISOString()
      : "";
    const formattedEndDate = endTime
      ? new Date(`${endTime}T23:59:59.999Z`).toISOString()
      : "";
    setApidata({
      typesOfExpense,
      startTime: formattedStartDate,
      endTime: formattedEndDate,
    });
  };
  return (
    <div>
      <Box display="flex" justifyContent="space-between" p={5}>
        <AddExpense setUpdatePage={setUpdatePage} updatePage={updatePage} />
        <form onSubmit={submitFilter}>
          <Box display="flex" gap={4}>
            <Input
              placeholder="Search..."
              // value={searchQuery}
              onChange={(e) => setTypeOfExpense(e.target.value)}
              bg="white"
              width="250px"
              borderRadius="md"
              mr={2}
            />
            <FormControl mr={2}>
              <Input
                type="date"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                bg="white"
                borderRadius="md"
              />
            </FormControl>

            <FormControl mr={2}>
              <Input
                type="date"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                bg="white"
                borderRadius="md"
              />
            </FormControl>
            <Button type="submit" px={6} colorScheme="teal">
              Search
            </Button>
          </Box>
        </form>
      </Box>
      <Box
        bg="blue.500"
        color="white"
        p={6}
        borderRadius="md"
        textAlign="center"
        fontSize="2xl"
        fontWeight="bold"
        boxShadow="lg"
      >
        Total Expense: ₹ {totalAmount}
        {/* {totalExpense} */}
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 5 }} spacing={6} p={4}>
        {ExpenseData?.map((Expense: any) => (
          <ExpenseCard
            key={Expense.id}
            typesOfExpense={Expense.typesOfExpense}
            amount={Expense.amount}
            description={Expense.description}
            id={Expense.id}
            setUpdatePage={setUpdatePage}
            updatePage={updatePage}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

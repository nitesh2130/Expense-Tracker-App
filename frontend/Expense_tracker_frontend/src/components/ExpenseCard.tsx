import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { UpdateExpense } from "./Model";

export const ExpenseCard = ({
  typesOfExpense,
  amount,
  description,
  id,
  updatePage,
  setUpdatePage,
}: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const apiUrlDelete = "http://localhost:3000/expense-users/deleteExpense";
  const deleteExpense = async () => {
    console.log(id, "//////////id");
    alert("You want to delete this expense data");
    const response = await axios.delete(apiUrlDelete, {
      params: { id },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // Ensure the correct content type
      },
    });
    setUpdatePage(!updatePage);
    console.log(response);
  };
  return (
    <Card
      width="320px"
      m={4}
      bg="orange.100"
      color="black"
      borderRadius="lg"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      minH="220px"
    >
      {/* Card Header */}
      <CardHeader
        bg="orange.500"
        color="white"
        fontSize="lg"
        fontWeight="bold"
        borderTopRadius="lg"
        p={4}
      >
        {typesOfExpense}
      </CardHeader>

      {/* Card Body with Fixed Height */}
      <CardBody
        bg="orange.50"
        p={4}
        flex="1"
        minH="80px"
        display="flex"
        alignItems="center"
      >
        <Text textAlign="center">{description}</Text>
      </CardBody>

      <Box
        bg="orange.400"
        color="white"
        fontSize="xl"
        fontWeight="bold"
        display="flex"
        justifyContent="center"
        py={4}
      >
        Rs. = {amount}
      </Box>

      {/* Card Footer */}
      <Box
        bg="orange.500"
        p={4}
        display="flex"
        justifyContent="space-between"
        borderBottomRadius="lg"
      >
        <UpdateExpense
          typesOfExpense={typesOfExpense}
          amount={amount}
          description={description}
          id={id}
          setUpdatePage={setUpdatePage}
          updatePage={updatePage}
        />
        <Button colorScheme="red" onClick={deleteExpense}>
          Delete
        </Button>
      </Box>
    </Card>
  );
};

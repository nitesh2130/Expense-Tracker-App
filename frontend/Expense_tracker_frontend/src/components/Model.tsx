import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";

export const UpdateExpense = ({
  id,
  updatePage,
  setUpdatePage,
  typesOfExpense,
  amount,
  description,
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  // const accessToken = localStorage.getItem("accessToken");
  const accessToken = localStorage.getItem("accessToken");

  const [expense, setExpense] = useState({
    typesOfExpense: typesOfExpense,
    amount: amount,
    description: description,
    id: id,
  });

  useEffect(() => {
    typesOfExpense;
    amount;
    description;
  }, []);

  const apiUrlUapdate = "http://localhost:3000/expense-users/updateExpense";

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // console.log(typeOfExpense, " this is typeOfExpense bro.........");
    // console.log(expense);
    console.log(accessToken, "......this is AccessToken");
    await axios.put(apiUrlUapdate, expense, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // Ensure the correct content type
      },
    });
    setUpdatePage(!updatePage);
    onClose();
  };

  return (
    <>
      <Box>
        <Button
          // m={0}
          // colorScheme="orange"
          colorScheme="green"
          onClick={onOpen}
        >
          Update Expense
        </Button>
      </Box>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Type of Expense</FormLabel>
              <Input
                type="text"
                name="typesOfExpense"
                value={expense.typesOfExpense}
                onChange={handleChange}
                // placeholder={typeOfExpense}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                // placeholder={amount}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={expense.description}
                onChange={handleChange}
                // placeholder={description}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

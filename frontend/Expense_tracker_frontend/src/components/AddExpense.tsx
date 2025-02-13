import { useState } from "react";
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

export const AddExpense = ({ setUpdatePage, updatePage }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const [expense, setExpense] = useState({
    typesOfExpense: "",
    amount: "",
    description: "",
  });
  const apiUrlAddExpense = "http://localhost:3000/expense-users/addExpense";
  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(expense);
    const response = await axios.post(apiUrlAddExpense, expense, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // Ensure the correct content type
      },
    });
    const data = response.data;
    if (data) {
      setUpdatePage(!updatePage);
      setExpense({
        typesOfExpense: "",
        amount: "",
        description: "",
      });
    }
    onClose();
  };

  return (
    <>
      <Box>
        <Button m={0} bg="orange.500" colorScheme="orange" onClick={onOpen}>
          Add Expense
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
                name="typesOfExpense"
                value={expense.typesOfExpense}
                onChange={handleChange}
                placeholder="Enter type"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                isRequired
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={expense.description}
                onChange={handleChange}
                placeholder="Enter description"
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

export default AddExpense;

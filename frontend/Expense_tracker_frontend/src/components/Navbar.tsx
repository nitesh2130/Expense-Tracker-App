import { Box, Flex, HStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("accessToken");
    // localStorage.clear();
    navigate("/");
  };
  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box fontWeight="bold" color="white" fontSize="xl">
            Expense Tracker
          </Box>
          {/* <Box>
    
          </Box> */}
        </HStack>
        <Flex alignItems="center">
          <Button colorScheme="teal" variant="solid" onClick={logOut}>
            LogOut
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

import { MouseEventHandler, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import useNavigate from 'Na'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const apiUrlLogin = "http://localhost:3000/users/login";

  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const toRegister: MouseEventHandler<HTMLButtonElement> | undefined = () => {
    navigate("/register");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // console.log(formData, "this is form data///////////////");
    setFormData({ ...formData, [name]: value });
    // console.log(formData, "this is form data...........");
  };

  const submitFormData = async (e: any) => {
    console.log("this is API  data ......../////,,", formData);
    e.preventDefault();
    const response = await axios.post(apiUrlLogin, formData);
    const data = response.data;
    console.log(data, "this is Api respose Data");

    if (data) {
      alert("You are Login successful !");

      // console.log(data.access_token, "..........this is AccessToken");
      localStorage.setItem("accessToken", data.access_token);
      navigate("/dashboard");
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="green.500" />
        <Heading color="green.500">Welcome</Heading>
        <Box minW={{ base: "90%", md: "68px" }}>
          <form
            className="h-100vh"
            onChange={handleChange}
            onSubmit={submitFormData}
          >
            <Stack
              spacing={8}
              p="8rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    // onChange={handleChange}
                    placeholder="email address"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    // onChange={handleChange}
                    placeholder="Password"
                  />
                  <InputRightElement width="4rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={10}
                type="submit"
                variant="solid"
                colorScheme="green"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Not have an acconut?{" "}
        <Button color="green.500" onClick={toRegister}>
          Sign Up
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;

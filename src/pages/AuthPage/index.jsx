import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import {loginEP,signupEP} from "../../services/auth.service";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation()

  const isLogin = location.pathname === "/login" ;
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const toast = useToast()
  const statuses = ['success', 'error', 'warning', 'info']

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    if(!isLogin){
      requestBody.name = name;
      requestBody.lastName = lastName;
    }
    const service = isLogin
      ? loginEP(requestBody)
      : signupEP(requestBody);

    service
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage ||   error.response.data.message
        setErrorMessage(errorDescription);
        toast({
          title: `${errorDescription}`,
          status: statuses[1],
          isClosable: true,
        })
      });
  };

  const validateField=(login)=>{
    if(!login){
      return !(name.length && email.length && password.length)
    }else{
      return !( email.length && password.length)
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {isLogin ? "Login" : "Sign up"}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {/* stack f&l name */}
            {!isLogin && (
              <>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        onChange={handleName}
                        name="firstName"
                        value={name}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input onChange={handleLastName} type="text"  name="lastName" />
                    </FormControl>
                  </Box>
                </HStack>
              </>
            )}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input 
               onChange={handleEmail}
               name="email"
              type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                 onChange={handlePassword}
                 name="password"
                type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                disabled={validateField(isLogin)}
                onClick={handleLoginSubmit}
              >
                {isLogin ? "Login" : "Sign up"}
              </Button>
            </Stack>
            <Stack pt={6}>
              {isLogin ? (
                <Text align={"center"}>
                  Are you not a user yet? <Link to="/signup" color={"blue.400"}>Signup</Link>
                </Text>
              ) : (
                <Text align={"center"}>
                  Already a user? <Link to="/login" color={"blue"}>Login</Link>
                </Text>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

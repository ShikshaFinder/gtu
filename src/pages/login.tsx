import supabase from "../../supabase";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter(); // Initialize the router
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const Router = useRouter();
  const Signin = async () => {
    if (!email || !password) {
      toast({
        title: "Error.",
        description: "Email and password fields are required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }else{
        toast({
          title: "Success.",
          description: "Logged in successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/addimage");
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: "Invalid email or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }

  };

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
            Sign In
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Admin Dashbord{" "}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)}  color={"-moz-initial"}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                onClick={Signin}
                loadingText="Submitting"
                size="lg"
                bg={"purple.600"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
              >
                SignIn
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not registered yet?{" "}
                <Link
                  href={"/signup"}
                  style={{ color: "blue.600", textDecoration: "underline" }}
                >
                  Signup
                </Link>
              </Text>
            </Stack>
            <Stack align={"center"}>
              {" "}
              <Link href="/magicLink">
                {" "}
                <Text color={"blue.500"}>Forgot password?</Text>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

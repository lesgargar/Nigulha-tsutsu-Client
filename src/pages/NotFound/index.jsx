import { Box, Heading, Text, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Flex
    minH={"100vh"}
    align={"center"}
    justify={"center"}
    bg={useColorModeValue("gray.50", "gray.800")}
  >
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        onClick={()=>navigate("/")}
        colorScheme="pink"
        bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
        color="white"
        variant="solid">
        Go to Home
      </Button>
    </Box>


  </Flex>

  );
}
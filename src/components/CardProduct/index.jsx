import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function CardProduct({
  _id,
  image,
  name,
  description,
  detail,
  isNotMyProduct,
  onDelete=()=>{},
  onEdit=()=>{},
  data
}) {
  const navigate = useNavigate();
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={image}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {name}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {description}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"purple.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "purple.300",
              }}
              _focus={{
                bg: "purple.300",
              }}
              onClick={() => navigate(`/product/${_id}/detail`, {state:{data}})}
            >
              view detail
            </Button>
          </Stack>
          {isNotMyProduct ? (
            ""
          ) : (
            <HStack>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"purple.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "purple.300",
                }}
                _focus={{
                  bg: "purple.300",
                }}
                onClick={onEdit}
              >
                <EditIcon />
              </Button>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"purple.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "purple.300",
                }}
                _focus={{
                  bg: "purple.300",
                }}
                onClick={onDelete}
              >
                <DeleteIcon />
              </Button>
            </HStack>
          )}
        </Stack>
      </Box>
    </Center>
  );
}

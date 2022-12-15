import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button,
  Avatar,
  Box,
  Spacer,
} from "@chakra-ui/react";
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import { ReactElement } from "react";
import NigulhaTsutsu from "../../images/NigulhaTsutsu.png";
import { Link } from "react-router-dom";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function AboutPage() {
  return (
    <Container maxW={"5xl"} py={40}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"white"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("#e79eff", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            About us
          </Text>
          <Heading>Supporting independent women</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            Nigulha tsutsu comes from Zapoteco, a Mexican language specifically
            from Oaxaca, this means “brave woman” We are a community that
            encourages all women to be independent and support their business
            trough this virtual bazaar.
            <br /> It is not only for those who have higher income from this, it
            is also for those who want to share their hobbies and obtain some
            profit from them or make their creations or products known.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Increase your audience"}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Make money doing what you love"}
            />
            <Feature
              icon={
                <Icon as={IoSearchSharp} color={"purple.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"Find other products or services you may be interested in"}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={NigulhaTsutsu}
            objectFit={"cover"}
          />
        </Flex>
        
      </SimpleGrid>
      <br/><br/><br/>
      <Flex justify={"center"} alignItems="center">
        
        <a href="https://github.com/lesgargar">
          <Image
            borderRadius="full"
            boxSize="60px"
            src="data:image/png;base64,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"
            alt="Github"
          />
        </a>

        <a href="https://www.linkedin.com/in/leslie-garcia-garcia/">
          <Image
            borderRadius="full"
            boxSize="55px"
            src="data:image/png;base64,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"
            alt="Github"
          />
        </a>
        
      </Flex>
   
    </Container>
  );
}

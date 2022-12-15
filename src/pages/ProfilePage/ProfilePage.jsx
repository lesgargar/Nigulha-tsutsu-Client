import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  useDisclosure,
  Avatar,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Container,
  Stack,
  StackDivider,
  Heading,
} from "@chakra-ui/react";

import { EmptyMessage, CardStore, ModalStoreForm } from "../../components";
import { AuthContext } from "../../context/auth.context";
import { myProfileEP } from "../../services/user.service";
import { deleteStoreEP, getAllMyStoresEP } from "../../services/store.service";

export default function ProfilePage({}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user,setUser]= useState({})
  const [stores, setStores] = useState([]);
  const [editStore,setEditStore]= useState({})
  const { logOutUser } = useContext(AuthContext);

  const getData = async()=>{
    try {
      const { data:userData } = await myProfileEP()
      const { data:storeData } = await getAllMyStoresEP()
      setUser(userData.user)
      setStores(storeData.result)
    } catch (error) {
      
    }
  }

  const onDelete = async (idStore) => {
    try {
      await deleteStoreEP(idStore);
       setStores(prevState => prevState.filter(item=> item._id != idStore))
    } catch (error) {
      console.log("error");
    }
  };
  const onEdit = (item)=>{
    setEditStore(item)
    onOpen()
  }

  const changeItem = (newStore)=>{
    setStores(prevState => prevState.map(item=> item._id != newStore._id ? item : newStore ))
    setEditStore({})
  }





  useEffect(()=>{
    getData()
  },[])


  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <SidebarContent onOpen={onOpen}  {...user} onLogout={()=>logOutUser()}/>
        </Flex>
        <Stack

        >
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              Stores
            </Heading>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            {!stores.length ? (
              <EmptyMessage
                title={"Stores"}
                subTitle={"You dont have any store yet"}
                desription={
                  "Crea tu tienda para que todos puedan conocer tus productos"
                }
                buttonText={"Create your first store"}
                onClick={onOpen}
              />
            ) : (
              <SimpleGrid columns={[2, null, 3]} spacing="40px">
                {stores.map((item) => (
                  <CardStore key={item._id} {...item} data={item} isProfile={true} onEdit={()=>onEdit(item)} onDelete={()=>onDelete(item._id)} />
                ))}
              </SimpleGrid>
            )}
          </Stack>
        </Stack>
      </SimpleGrid>
      <ModalStoreForm {...{ isOpen, onOpen, onClose,editStore,changeItem }} createStore={(res)=>setStores(prevState=>[...prevState,res])} />
    </Container>
  );
}

const SidebarContent = ({ onOpen, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
     
      align={"center"}
      w={{ base: "100%" }}
      h={{ base: "300px"}}
      {...rest}
    >
      <Flex
        direction="column"
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Profile
        </Text>
        <VStack>
          <Avatar
            size="2xl"
            name={`${rest.name} ${rest.lastName || ""}`}
            src={rest.image}
          />
          <Text>{rest.name} {rest.lastName || ""}</Text>
          <Text>{rest.email}</Text>
        </VStack>

        <HStack>
          <Button
            fontWeight={600}
            color={"white"}
            bg={"purple.400"}
            _hover={{
              bg: "purple.300",
            }}
            onClick={rest.onLogout}
          >
            logout
          </Button>

          <Button
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"purple.400"}
            _hover={{
              bg: "purple.300",
            }}
            onClick={onOpen}
          >
            Create Store
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};



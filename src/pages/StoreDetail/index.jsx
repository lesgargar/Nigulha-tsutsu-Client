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
  Image,
  Spacer
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
  EmptyMessage,
  CardProduct,
  ModalProductForm,
  BackgroundReview,
  ReviewCard,
  FloatingButton,
} from "../../components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getAllReviewsEP } from "../../services/reviews.service";
import {
  deleteProductEp,
  getAllProductsEP,
} from "../../services/product.service";
import { deleteSoreEP, detailStoreEP } from "../../services/store.service";
import { AuthContext } from "../../context/auth.context";

export default function ProfilePage() {
  const { state } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [detailStore, setDetailStore] = useState({});
  const [editProduct, setEditProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

 
  const { user } = useContext(AuthContext);

  const getData = async () => {
    try {
      const { data: productRes } = await getAllProductsEP(id);
      const { data: reviewsRes } = await getAllReviewsEP(id);

      setProducts(productRes.result);
      setReviews(reviewsRes.result);
    } catch (error) {
    }
  };
  const getDetail = async () => {
    try {
      const { data: storeRes } = await detailStoreEP(id);
      setDetailStore(storeRes.result);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
    if (!state) {
      getDetail();
    } else {
      setDetailStore(state.data);
    }
  }, []);

  const onDelete = async (idProduct) => {
    try {
      await deleteProductEp(idProduct);
      setProducts((prevState) =>
        prevState.filter((item) => item._id != idProduct)
      );
    } catch (error) {
      console.log("error");
    }
  };
  const onEdit = (item) => {
    setEditProduct(item);
    onOpen();
  };

  const changeItem = (newProduct) => {
    setProducts((prevState) =>
      prevState.map((item) => (item._id != newProduct._id ? item : newProduct))
    );
    setEditProduct({});
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <SidebarContent user={user} store={detailStore} onOpen={onOpen} />
        </Flex>
        <Stack>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            {!products.length ? (
              <EmptyMessage
                title={"Products"}
                subTitle={"You dont have any products yet"}
                desription={"Add your first product"}
                buttonText={"Create your first product"}
                onClick={onOpen}
              />
            ) : (
              <SimpleGrid columns={[2, null, 3]} spacing="40px">
                {products.map((item) => (
                  <CardProduct
                    data={item}
                    key={item._id}
                    {...item}
                    isNotMyProduct={
                      user === undefined ||
                      user === null ||
                      user._id !== detailStore._owner
                    }
                    onEdit={() => onEdit(item)}
                    onDelete={() => onDelete(item._id)}
                  />
                ))}
              </SimpleGrid>
            )}

            <Box ml={{ base: 0, md: 60 }}>
              <BackgroundReview
                _owner={detailStore._owner}
                id={id}
                changeItemReview={() => {}}
                createReview={(res) => setReviews((prev) => [...prev, res])}
              >
                {user ? (
                  reviews.map((item, index) => (
                    <ReviewCard {...item} key={index} />
                  ))
                ) : (
                  <EmptyMessage
                    title={"Reviews"}
                    subTitle={"Reviews not available"}
                    desription={"Login to see what people say"}
                    buttonText={"or Login to Review this"}
                    onClick={onOpen}
                  />
                )}
              </BackgroundReview>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>

      <ModalProductForm
        {...{ isOpen, onOpen, onClose, id, changeItem, editProduct }}
        createProduct={(res) => setProducts((prevState) => [...prevState, res])}
      />
    </Container>
  );
}

const SidebarContent = ({ onOpen, user, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      align={"center"}
      w={{ base: "100%" }}
      h={{ base: "300px" }}
      {...rest}
    >
      <Flex
        direction="column"
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <VStack>
          <Avatar
            size="2xl"
            name={`${rest.store.name}`}
            src={rest.store.image}
          />
          <Text>{rest.store.name}</Text>
          <Text>{rest.store.description}</Text>
          <Flex justify='center'>
                {rest.store.instagram && 
                <a href={rest.store.instagram}>
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src="data:image/jpeg;base64,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"
                  alt="Instagram"
                />
                </a>}
                {rest.store.facebook &&
                <a href={rest.store.facebook}>
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src="data:image/png;base64,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"
                  alt="Facebook"
                />
                </a>}
              </Flex>
          {user === undefined ||
          user === null ||
          user._id !== rest.store._owner ? (
            ""
          ) : (
            <>
            

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
                Add new product
              </Button>
            </>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

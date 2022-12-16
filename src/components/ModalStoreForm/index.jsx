import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { createStoreEP, editStoreEP } from "../../services/store.service";
import { EditIcon } from "@chakra-ui/icons";
import { uploadSingleEP } from "../../services/upload.services";

export default function ModalStoreForm({
  isOpen,
  onClose,
  createStore,
  editStore = {},
  changeItem,
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const inputFile = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [preview, setPreview] = useState(
    "https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png"
  );
  const toast = useToast();
  const onSubmit = async () => {
    try {
      const requestBody = {
        name,
        description,
        facebook,
        instagram,
        address,
        editStore,
        image:selectedFile
      };
      const { data: storeRes } = !Object.keys(editStore).length
        ? await createStoreEP(requestBody)
        : await editStoreEP(editStore._id, requestBody);

      if (!Object.keys(editStore).length) {
        createStore(storeRes.result);
      } else {
        changeItem(storeRes.result);
      }
      close();
    } catch (error) {
      const errorDescription =
        error.response.data.errorMessage || error.response.data.message;
      toast({
        title: `${errorDescription}`,
        status: error,
        isClosable: true,
      });
    }
  };
  const close = () => {
    onClose();
    setName("");
    setDescription("");
    setFacebook("");
    setInstagram("");
    setAddress("");
  };
  const validateField = () => {
    return !(name.length && description.length);
  };

  const uploadImage = () => {
    const value = inputFile.current;
    value.click();
  };

  const handleImage = async (e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(objectUrl);
      const formData = new FormData();
      formData.append("image",e.target.files[0])
      const {data:imageData} = await uploadSingleEP(formData)
      setSelectedFile(imageData.url.uri);
    } catch (error) {
      console.log("error",error)
    }
  };

  useEffect(() => {
    if (Object.keys(editStore).length) {
      setName(editStore.name);
      setDescription(editStore.description);

      setFacebook(editStore.facebook);
      setInstagram(editStore.instagram);
      setAddress(editStore.address);
      setPreview(editStore.image);
    }
  }, [Object.keys(editStore).length]);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={close}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your store</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Avatar size="2xl" name="Segun Adebayo" src={preview} />
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
              onClick={uploadImage}
            >
              <EditIcon />
            </Button>
            <input
              className="hidden"
              ref={inputFile}
              type="file"
              onChange={handleImage}
            />
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={initialRef}
                placeholder="Name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Facebook</FormLabel>
              <Input
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Facebook"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Instagram</FormLabel>
              <Input
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={validateField()}
              onClick={onSubmit}
              colorScheme="purple"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

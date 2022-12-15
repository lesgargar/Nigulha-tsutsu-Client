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

export default function ModalStoreForm({
  onOpen,
  isOpen,
  onClose,
  createStore,
  editStore={},
  changeItem
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [address, setAddress] = useState("");
  const toast = useToast()
  const onSubmit = async () => {
    try {
      const requestBody = { name, description, facebook, instagram, address,editStore };
      const { data: storeRes } = !Object.keys(editStore).length ? await  createStoreEP(requestBody) : await editStoreEP(editStore._id,requestBody);
      
      if(!Object.keys(editStore).length){
        createStore(storeRes.result);
      }else{
       
        changeItem(storeRes.result)
      }
      close();
    } catch (error) {

      const errorDescription = error.response.data.errorMessage ||   error.response.data.message
      toast({
        title: `${errorDescription}`,
        status: error,
        isClosable: true,
      })
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

  useEffect(()=>{
    if(Object.keys(editStore).length){
      setName(editStore.name)
      setDescription(editStore.description)
     
      setFacebook(editStore.facebook);
      setInstagram(editStore.instagram);
      setAddress(editStore.address);
    }
  },[Object.keys(editStore).length])
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
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
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

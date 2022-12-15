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
import { createReviewsEP, editReviewsStoreEP } from "../../services/reviews.service";

export default function ModalReviewForm({ editReview={}, isOpen, onClose,id, changeItemReview, createReview }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToast()
  const onSubmit = async () => {
    try {
      const requestBody = { title, description};
      const { data: storeRes } = !Object.keys(editReview).length ? await  createReviewsEP(id,requestBody) : await editReviewsStoreEP(editReview._id,requestBody);
      
      if(!Object.keys(editReview).length){
        createReview(storeRes.result);
      }else{
       
        changeItemReview(storeRes.result)
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
    setTitle("");
    setDescription("");
  };
  const validateField = () => {
    return !(title.length && description.length);
  };

  useEffect(()=>{
    if(Object.keys(editReview).length){
      setTitle(editReview.title)
      setDescription(editReview.description)
     
     
    }
  },[Object.keys(editReview).length])
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
          <ModalHeader>Write about your experience with this store</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e)=>setTitle(e.target.value)} ref={initialRef} placeholder="Title" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input  value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button disabled={validateField()} onClick={onSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

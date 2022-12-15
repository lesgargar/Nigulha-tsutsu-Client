import { useEffect, useRef,useState } from "react";
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
import { createProductsEP, editProductEP } from "../../services/product.service";

export default function ModalProductForm({ editProduct={},changeItem, isOpen, onClose,createProduct ,id}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState( "");
  const [detail, setDetail] = useState( "");
  const [price, setPrice] = useState( "");
  const toast = useToast()
  const onSubmit = async () => {
    try {
      const requestBody = { name, description, price, detail};

      const { data: productRes } = !Object.keys(editProduct).length ? await  createProductsEP(id,requestBody) : await editProductEP(editProduct._id,requestBody)
      if(!Object.keys(editProduct).length){
        createProduct(productRes.result);
      }else{
       
        changeItem(productRes.result)
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
  };
  const validateField = () => {
    return !(name.length && description.length);
  };

  useEffect(()=>{
    if(Object.keys(editProduct).length){
      setName(editProduct.name)
      setDescription(editProduct.description)
      setDetail(editProduct.detail)
      setPrice(editProduct.price || 0)
    }
  },[Object.keys(editProduct).length])
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
          <ModalHeader>New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input value={name} onChange={(e)=>setName(e.target.value)} ref={initialRef} placeholder="Product name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input  value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Detail</FormLabel>
              <Input  value={detail} onChange={(e)=>setDetail(e.target.value)} placeholder="detail" />
            </FormControl>
           
            <FormControl mt={4}>
              <FormLabel>price</FormLabel>
              <Input type={"number"}  value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="price" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>upload</FormLabel>
              
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSubmit} disabled={validateField()} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

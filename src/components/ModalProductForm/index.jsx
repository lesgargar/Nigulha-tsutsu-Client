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
import { uploadSingleEP } from "../../services/upload.services";
import { EditIcon } from "@chakra-ui/icons";

export default function ModalProductForm({ editProduct={},changeItem, isOpen, onClose,createProduct ,id}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const inputFile = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState( "");
  const [detail, setDetail] = useState( "");
  const [price, setPrice] = useState( "");
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [preview, setPreview] = useState(
   "https://cdn-icons-png.flaticon.com/512/1170/1170577.png"
  );
  const toast = useToast()
  const onSubmit = async () => {
    try {
      const requestBody = { 
        name, 
        description, 
        price, 
        detail,
        image:selectedFile
      };

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

  useEffect(()=>{
    if(Object.keys(editProduct).length){
      setName(editProduct.name)
      setDescription(editProduct.description)
      setDetail(editProduct.detail)
      setPrice(editProduct.price || 0)
      setPreview(editProduct.image)
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

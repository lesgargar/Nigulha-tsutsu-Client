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
import { editProfileEP } from "../../services/user.service";

export default function ModalProfileForm({ editProfile={},changeItem, isOpen, onClose,id}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState( "");
  const [gender, setGender] = useState( "");
  const toast = useToast()
  const onSubmit = async () => {
    try {
      const requestBody = { name, lastName, gender};

    //  const { data: profileRes } = !Object.keys(editProfile).length ?  await editProfileEP(editProfile._id,requestBody)
    //   if(!Object.keys(editProfile).length){
    //     createProfile(profileRes.result);
    //   }else{
       
    //     changeItem(profileRes.result)
    //   }
     // close();
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
    setLastName("");
    setGender("");
  };
  const validateField = () => {
    return !(name.length && lastName.length);
  };

  useEffect(()=>{
    if(Object.keys(editProfile).length){
      setName(editProfile.name)
      setLastName(editProfile.lastName)
      setGender(editProfile.gender)
    }
  },[Object.keys(editProfile).length])
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
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e)=>setName(e.target.value)} ref={initialRef} placeholder="Name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Lastname</FormLabel>
              <Input  value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Lastname" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Select placeholder='Select option'>
  <option value='Female'>Female</option>
  <option value='Male'>Male</option>
  <option value='Transgender'>Transgender</option>
  <option value='Other'>Other</option>
  <option value='I prefer not to say'>I prefer not to say</option>
  
</Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>upload</FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSubmit} disabled={validateField()} colorScheme="purple" mr={3}>
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

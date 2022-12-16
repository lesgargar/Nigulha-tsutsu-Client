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
  Select,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { uploadSingleEP } from "../../services/upload.services";
import { editProfileEP } from "../../services/user.service";

export default function ModalStoreForm({
  isOpen,
  onClose,
  changeUser,
  user={name:"",lastName:"",gender:""}
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const inputFile = useRef(null);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [preview, setPreview] = useState(
    user.image
  );
  const toast = useToast();
  const onSubmit = async () => {
    try {
      const requestBody = {
        name,
        lastName,
        gender,
        image: selectedFile,
      };
      const {data:userRes}=  await  editProfileEP(requestBody);
      changeUser(userRes.user);
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
  };
  const validateField = () => {
    return !name.length;
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
      formData.append("image", e.target.files[0]);
      const { data: imageData } = await uploadSingleEP(formData);
      setSelectedFile(imageData.url.uri);
    } catch (error) {
    }
  };

  useEffect(()=>{
    if(isOpen){
      setPreview(user.image)
      setName(user.name)
      setLastName(user.lastName || "")
      setGender(user.gender || "")
    }
    
  },[isOpen])
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

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                ref={initialRef}
                placeholder="Last Name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                value={gender}
                placeholder="Select option"
              >
                {[
                  "Female",
                  "Male",
                  "Transgender",
                  "Other",
                  "I prefer not to say",
                ].map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Select>
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

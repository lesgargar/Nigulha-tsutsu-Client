import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import {useNavigate} from "react-router-dom"
  export default function CardStore({image,name,description,_id,data,onEdit,onDelete,isMyStore=false,isProfile}) {
    const navigate = useNavigate()
    return (
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: '100%', md: '540px' }}
          height={{ sm: '476px', md: '20rem' }}
          direction={{ base: 'column', md: 'row' }}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          padding={4}>
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={image}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {name}
            </Heading>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}>
              {description}
      
            </Text>
        
  
            <Stack
              width={'100%'}
              mt={'2rem'}
              direction={'row'}
              padding={2}
              justifyContent={'space-between'}
              alignItems={'center'}>
              
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'purple.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'purple.500',
                }}
                _focus={{
                  bg: 'purple.500',
                }}
                onClick={()=>navigate(`/store/${_id}/detail`,{state:{data}})}
                >
                See store
              </Button>
              {!isMyStore && !isProfile ? (
            ""
          ) : (
            <HStack>
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
                onClick={onEdit}
              >
                <EditIcon />
              </Button>
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
                onClick={onDelete}
              >
                <DeleteIcon />
              </Button>
            </HStack>
          )}
            </Stack>

          </Stack>
        </Stack>
      </Center>
    );
  }
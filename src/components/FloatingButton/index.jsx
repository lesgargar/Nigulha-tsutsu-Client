import { Button, ButtonProps, Flex } from '@chakra-ui/react';

export default function FloatingButton({onOpen,...props}){
    return(
        <Button
        {...props}
        /* flex={1} */
        px={4}
        onClick={onOpen}
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
       
        >
        Review this store
      </Button>
    )
}
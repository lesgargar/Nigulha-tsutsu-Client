import { Box, Heading, Text, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

export default function EmptyMessage({title,subTitle,desription}) {
  const { user} = useContext(AuthContext)
  return (

    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text">
        {title}
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
       {subTitle}
      </Text>
      <Text color={'gray.500'} mb={6}>
        {desription}
      </Text>
  
    </Box>


  );
}
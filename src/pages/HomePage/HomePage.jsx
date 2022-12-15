import { SimpleGrid, Flex, Image, Box } from "@chakra-ui/react";
import "./HomePage.css";
import { CardStore } from "../../components";
import { useEffect, useState } from "react";
import { getAllStoreEP } from "../../services/store.service";
import NigulhaTsutsu from "../../images/NigulhaTsutsu.png";
function HomePage() {
  const [stores, setStores] = useState([]);
  const getData = async () => {
    try {
      const { data: storeData } = await getAllStoreEP();
      setStores(storeData.result);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  });
  return (
    <div>
      <Flex justify={"center"} align={"center"}>
        <Image src={NigulhaTsutsu} alt="Nigulha Tsutsu" boxSize='300px'/>
        <Box width={"40vh"} >
          Welcome to Nigula tsutsu ! It is a community made for all the brave
          women. You can find many products, services and handicrafts.
          </Box>
      </Flex>
      <Flex justify={"center"} align={"center"}>
      <Box width={"40vh"} >
          Meet the comunity and explore the stores below 🫶
        </Box>
      </Flex>
      <SimpleGrid columns={[2, null, 3]} spacing="40px">
        {stores.map((item) => (
          <CardStore key={item._id} {...item} data={item} isProfile={false} />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default HomePage;

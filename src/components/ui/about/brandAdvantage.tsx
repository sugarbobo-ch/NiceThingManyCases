import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const CardItem = ({ title, description }: CardData) => {
  return (
    <GridItem
      colSpan={{ base: 2, sm: 1 }}
      bg="white"
      h="300px"
      borderRadius="2xl"
      boxShadow="sm"
      color="black"
      p="4"
    >
      <Text fontWeight={600} fontSize="2xl">
        {title}
      </Text>
      {description}
    </GridItem>
  );
};

interface CardData {
  title: string;
  description: string;
  image: string;
}

const cardData = [
  {
    title: '一站式服務中心',
    description:
      '無論是新車配件、包膜隔熱紙、保養維修或改裝升級，一站搞定所有大小事。',
    image: '',
  },
  {
    title: '原廠級專業技師',
    description:
      '多年電動車服務廠經驗技師團隊，種，比照美國原廠標準化施工服務。',
    image: '',
  },
  {
    title: '高規格客戶服務',
    description:
      '除了專業熱情的夥伴外，更提供80坪客戶休息區、VIP Lounge與餐飲服務。',
    image: '',
  },
  {
    title: '頂級駐廠設備',
    description:
      '採用Hunter、Snap-On等頂級設備，比照原廠最高規格建置服務中心。',
    image: '',
  },
] satisfies CardData[];

const BrandAdvantage = ({ id }: { id: string }) => {
  return (
    <Flex
      id={id}
      direction="column"
      align="center"
      justify="center"
      minH="calc(100dvh - 60px)"
      w="100dvw"
      bgImage="linear-gradient(180deg, rgba(0,0,06,0.4) 0%,rgba(0,0,0,0.9) 100%), url(https://spacet-lab.com/wp-content/uploads/2024/09/IMG_1019.jpg)"
      bgSize="cover"
      bgPos="center"
    >
      <Flex
        minH="100%"
        maxW={{ base: '100%', md: '1280px' }}
        direction="column"
        align="center"
        justify={{ base: 'flex-start', lg: 'center' }}
        w="100%"
        px={{ base: 4, md: 'auto' }}
        pb={{ base: 4, md: 'auto' }}
      >
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          templateRows="repeat(2, 1fr)"
          gap={4}
          w="100%"
        >
          <GridItem colSpan={2} h="300px" color="white">
            <Flex direction="column" align="left" justify="center" h="100%">
              <Heading size="5xl">Example Title</Heading>
              <Heading size="3xl">Example SubTitle</Heading>
              <Text mt="4">
                好事多膜是專門服務特斯拉車款一站式服務品牌，從交車後必備的隔熱紙、包膜犀牛皮、行車紀錄器、車用配件，電裝品配備升級、底盤避震器、輪胎輪框以及比照原廠規格的定期保養、四輪定位與各項保養維修服務，所有特斯拉相關需求一站搞定！
              </Text>
            </Flex>
          </GridItem>
          <GridItem
            colSpan={2}
            bg="white"
            h="300px"
            borderRadius="2xl"
            boxShadow="sm"
          >
            <Flex direction="column" align="center" justify="center" h="100%">
              {/* <Image
                    src=""
                    alt="Description of image"
                    width={500}
                    height={300}
                    style={{ borderRadius: '1rem' }}
                  /> */}
            </Flex>
          </GridItem>
          {cardData.map((item) => (
            <CardItem
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default BrandAdvantage;

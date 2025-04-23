import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  SimpleGrid,
  List,
  ListItem,
  IconButton,
} from '@chakra-ui/react';
import {
  FaCar,
  FaCheck,
  FaChevronRight,
  FaMotorcycle,
  FaShieldAlt,
  FaToolbox,
  FaRegClock,
} from 'react-icons/fa';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import CardItem from '@/components/ui/cardItem';
import kimImage from '/public/KIM7486_0.webp';

export default function ColorWrapPage() {
  const bgColor = 'gray.50';
  const cardBg = 'white';
  const borderColor = 'gray.200';
  const accentColor = 'blue.500';

  return (
    <Box
      bg={bgColor}
      minH="calc(100dvh - 60px)"
      w="100dvw"
      bgImage="linear-gradient(180deg, rgba(0,0,06,0.4) 0%,rgba(0,0,0,0.9) 100%), url(https://spacet-lab.com/wp-content/uploads/2024/09/IMG_1019.jpg)"
      bgSize="cover"
      bgPos="center"
    >
      <Breadcrumb
        items={[
          { label: '首頁', href: '/' },
          { label: '主要服務項目 - 改色膜', href: '/services/color-film' },
        ]}
      />

      <Container py={8} px={4} margin={'auto'}>
        <Heading as="h1" size="3xl" mb={2} color="white">
          主要服務項目
        </Heading>
        <SimpleGrid
          columns={{ base: 2, md: 1 }}
          gap={4}
          mb={8}
          templateColumns={{ base: 'repeat(2 ,1fr)', md: 'repeat(5 ,1fr)' }}
        >
          <CardItem
            title="改色膜"
            description="提供多種顏色與材質選擇，滿足您的個性化需求。"
            image={kimImage}
            height="150px"
            clickable
          />
          <CardItem
            title="犀牛皮"
            description="高強度保護膜，防止車漆刮傷與損壞。"
            image={kimImage}
            height="150px"
          />
          <CardItem
            title="改色犀牛皮"
            description="結合改色與保護功能，雙重保障您的愛車。"
            image={kimImage}
            height="150px"
          />
          <CardItem
            title="客製化彩繪"
            description="專業設計與施工，打造獨一無二的車身彩繪。"
            image={kimImage}
            height="150px"
          />
          <CardItem
            title="企業形象車"
            description="提升企業形象，專業設計與施工企業形象車。"
            image={kimImage}
            height="150px"
          />
        </SimpleGrid>
        <Box
          bg={cardBg}
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          border="1px"
          borderColor={borderColor}
          p={6}
        >
          {/* 主要內容區域 */}
          <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
            {/* 左側圖片與標誌 */}
            <Box flex={{ base: '1', lg: '3' }} position="relative">
              <Box position="absolute" top={4} left={4} zIndex={2}>
                <Image
                  src="/images/mj-wraps-logo.png"
                  alt="M.J WRAPS"
                  h="60px"
                />
              </Box>
              <Image
                src="/images/green-car-wrap.jpg"
                alt="汽車改色包膜展示"
                w="100%"
                h={{ base: '250px', md: '400px' }}
                objectFit="cover"
                borderRadius="md"
              />
            </Box>

            {/* 右側內容 */}
            <Flex
              flex={{ base: '1', lg: '2' }}
              direction="column"
              justify="center"
              gap={4}
            >
              <Box>
                <Flex align="center" mb={2}>
                  <Icon boxSize={6} color={accentColor} mr={2}>
                    <FaCar />
                  </Icon>
                  <Heading as="h1" size="xl">
                    改色包膜
                  </Heading>
                </Flex>
                <Text fontSize="md" color="gray.600" mt={4}>
                  M.J WRAPS
                  提供多種化色包膜服務，包含各大品牌改色包膜、皮革皮質變更化彩繽包膜服務，可依需求量身
                  打造包膜成要制化包膜規格。
                </Text>

                <Button mt={6} size="md" colorScheme="blue">
                  各種型改色3D樣品展示 <FaChevronRight />
                </Button>
              </Box>

              {/* 服務類別 */}
              <Box mt={6}>
                <Flex gap={4} mt={4}>
                  <Flex
                    align="center"
                    bg="gray.100"
                    px={4}
                    py={2}
                    borderRadius="md"
                  >
                    <Icon boxSize={6} color={accentColor} mr={2}>
                      <FaCar />
                    </Icon>
                    <Text fontWeight="medium">汽車包膜</Text>
                  </Flex>
                  <Flex
                    align="center"
                    bg="gray.100"
                    px={4}
                    py={2}
                    borderRadius="md"
                  >
                    <Icon boxSize={6} color={accentColor} mr={2}>
                      <FaMotorcycle />
                    </Icon>
                    <Text fontWeight="medium">機車 / 車輛包膜</Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Flex>

          {/* 特點與保固區域 */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} divideX="2px">
            {/* 左側：模式選擇 */}
            <Box>
              <Flex align="center" mb={4}>
                <Icon boxSize={6} color={accentColor} mr={2}>
                  <FaToolbox />
                </Icon>
                <Heading as="h3" size="md">
                  模式選擇
                </Heading>
              </Flex>

              <List.Root gap={3}>
                <List.Item>
                  <Flex align="center">
                    <Icon boxSize={6} color={accentColor} mr={2}>
                      <FaToolbox />
                    </Icon>
                    提供多種品牌，顏色，紋路選擇。
                  </Flex>
                </List.Item>
                <List.Item>
                  <Flex align="center">
                    <Icon boxSize={6} color={accentColor} mr={2}>
                      <FaToolbox />
                    </Icon>
                    高度客製化服務，提供不同顏色或設計選擇。（價格另計）
                  </Flex>
                </List.Item>
              </List.Root>
            </Box>

            {/* 右側：施工與保固 */}
            <Box>
              <Flex align="center" mb={4}>
                <Icon boxSize={6} color={accentColor} mr={2}>
                  <FaShieldAlt />
                </Icon>
                <Heading as="h3" size="md">
                  施工與保固
                </Heading>
              </Flex>

              <List.Root gap={3}>
                <ListItem>
                  <Icon boxSize={6} color={accentColor} mr={2}>
                    <FaCheck />
                  </Icon>
                  專業前置隔離作業，確保切勿殘膠料後產生殘膠。
                </ListItem>
                <ListItem>
                  <Icon boxSize={6} color={accentColor} mr={2}>
                    <FaCheck />
                  </Icon>
                  施工終身保固，細縫回邊免費調整，小範圍破損免費修補。
                </ListItem>
                <ListItem>
                  <Icon boxSize={6} color={accentColor} mr={2}>
                    <FaCheck />
                  </Icon>
                  選材依品牌提供2-5年保固。
                </ListItem>
              </List.Root>
            </Box>
          </SimpleGrid>

          {/* 底部按鈕 */}
          <Flex justify="flex-end" mt={6}>
            <IconButton variant="outline" colorScheme="gray" size="sm">
              <FaRegClock />
              施工免費說明
            </IconButton>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}

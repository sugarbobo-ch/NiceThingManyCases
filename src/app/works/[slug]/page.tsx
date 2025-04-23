'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Heading,
  Text,
  Box,
  Image,
  SimpleGrid,
  Center,
  Badge,
  VStack,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { WorkModel } from '@/types/strapi';
import ImageViewer from '@/components/ui/works/imageViewer';
import { fetchWorkBySlug } from '@/lib/api/strapi';
import Breadcrumb from '@/components/ui/breadcrumb';
import { FaChevronLeft } from 'react-icons/fa';

export type FilmType = 'ppf' | 'others';
export type GlossEffectType = 'glossy' | 'satin' | 'matte';
export type BrightnessType = 'light' | 'dark';

export const filmTypeMap: Record<FilmType, string> = {
  ppf: '犀牛皮 PPF',
  others: '其他膜類型',
};

export const finishTypeMap: Record<GlossEffectType, string> = {
  glossy: '亮面',
  satin: '緞面',
  matte: '消光',
};

export const brightnessMap: Record<BrightnessType, string> = {
  light: '淺色',
  dark: '深色',
};

export const carModelMap: Record<string, string> = {
  'Tesla Model 3': 'Tesla Model 3',
  'Tesla Model Y': 'Tesla Model Y',
  'Tesla Model S': 'Tesla Model S',
  'Tesla Model X': 'Tesla Model X',
  AUDI: 'AUDI',
  BMW: 'BMW',
  BENZ: 'BENZ',
  PORSCHE: 'PORSCHE',
  'Range Rover': 'Range Rover',
  HYUNDAI: 'HYUNDAI',
  SKODA: 'SKODA',
};

export default function WorkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const [work, setWork] = useState<WorkModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { open, setOpen } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (slug) {
      const fetchWork = async () => {
        try {
          setLoading(true);
          const { data } = await fetchWorkBySlug(slug as string);
          if (data.length > 0) {
            setWork(data[0]);
          } else {
            setError('Work not found');
          }
        } catch (error) {
          console.error('Error fetching work:', error);
          setError('Failed to fetch work details');
        } finally {
          setLoading(false);
        }
      };

      fetchWork();
    } else {
      setError('Invalid slug');
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return <Center h="100vh"></Center>;
  }

  if (error || !work) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error || 'Work not found'}</Text>
      </Center>
    );
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setOpen(true);
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: '首頁', href: '/' },
          { label: '作品欣賞', href: '/works' },
          { label: work.name, href: `/works/${slug}` },
        ]}
      />
      <Container py={{ base: 4, lg: 8 }} px={4} margin={'auto'}>
        <Box
          as="button"
          onClick={handleBack}
          mb={6}
          display="flex"
          alignItems="center"
          gap={1}
          fontSize="lg"
          _hover={{ color: 'orange.500', cursor: 'pointer' }}
        >
          <FaChevronLeft size={24} />
          <Text fontSize="xl" fontWeight="bold">
            返回上一頁
          </Text>
        </Box>
        <VStack gap={4} align="start">
          <Heading as="h1" size="3xl">
            {work.name}
          </Heading>

          <HStack wrap="wrap" gap={4}>
            {work.filmType && (
              <Badge colorScheme="blue" fontSize="sm" p={2}>
                膜類型:{' '}
                {filmTypeMap[work.filmType as FilmType] || work.filmType}
              </Badge>
            )}
            {work.glossEffect && (
              <Badge colorScheme="green" fontSize="sm" p={2}>
                表面效果:{' '}
                {finishTypeMap[work.glossEffect as GlossEffectType] ||
                  work.glossEffect}
              </Badge>
            )}
            {work.brightness && (
              <Badge colorScheme="purple" fontSize="sm" p={2}>
                亮度:{' '}
                {brightnessMap[work.brightness as BrightnessType] ||
                  work.brightness}
              </Badge>
            )}
            {work.filmBrand && (
              <Badge colorScheme="orange" fontSize="sm" p={2}>
                品牌: {work.filmBrand.name}
              </Badge>
            )}
            {work.carModel && (
              <Badge colorScheme="red" fontSize="sm" p={2}>
                車型: {carModelMap[work.carModel.name] || work.carModel.name}
              </Badge>
            )}
          </HStack>

          {work.colorCategories && work.colorCategories.length > 0 && (
            <Box>
              <Text fontWeight="bold" mb={2}>
                顏色分類:
              </Text>
              <HStack>
                {work.colorCategories.map((category) =>
                  category.isDisplayColor ? (
                    <Badge
                      bg={category.hex}
                      color="white"
                      key={category.documentId}
                      colorScheme="teal"
                      fontSize="sm"
                      p={2}
                    >
                      {category.name}
                    </Badge>
                  ) : (
                    <Badge
                      key={category.documentId}
                      colorScheme="teal"
                      fontSize="sm"
                      p={2}
                    >
                      {category.name}
                    </Badge>
                  )
                )}
              </HStack>
            </Box>
          )}

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4} w="100%">
            {work.images &&
              work.images.map((image, index) => (
                <Box
                  key={image.id}
                  cursor="pointer"
                  onClick={() => handleImageClick(index)}
                  borderRadius="md"
                  overflow="hidden"
                  transition="transform 0.3s"
                  _hover={{ transform: 'scale(1.02)' }}
                  boxShadow="md"
                >
                  <Image
                    src={image.url}
                    alt={image.alternativeText || work.name}
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                </Box>
              ))}
          </SimpleGrid>
        </VStack>

        <ImageViewer
          isOpen={open}
          setOpen={setOpen}
          works={[work]}
          currentWorkIndex={0}
          currentImageIndex={selectedImageIndex}
          setCurrentImageIndex={setSelectedImageIndex}
        />
      </Container>
    </>
  );
}

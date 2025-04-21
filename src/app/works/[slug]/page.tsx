'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function WorkDetailPage() {
  const params = useParams();
  const { slug } = params;
  const [work, setWork] = useState<WorkModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { open, setOpen } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="start">
        <Heading as="h1">{work.name}</Heading>

        <HStack wrap="wrap" gap={4}>
          {work.filmType && (
            <Badge colorScheme="blue" fontSize="sm" p={2}>
              膜類型: {work.filmType}
            </Badge>
          )}
          {work.glossEffect && (
            <Badge colorScheme="green" fontSize="sm" p={2}>
              表面效果: {work.glossEffect}
            </Badge>
          )}
          {work.brightness && (
            <Badge colorScheme="purple" fontSize="sm" p={2}>
              亮度: {work.brightness}
            </Badge>
          )}
          {/* {work.filmBrand?.data && (
            <Badge colorScheme="orange" fontSize="sm" p={2}>
              品牌: {work.filmBrand.data.attributes.name}
            </Badge>
          )}
          {work.carModel && (
            <Badge colorScheme="red" fontSize="sm" p={2}>
              車型: {work.carModel.name}
            </Badge>
          )} */}
        </HStack>

        {/* {work.colorCategories.length > 0 && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              顏色分類:
            </Text>
            <HStack>
              {work.colorCategories.map((category) => (
                <Badge key={category} colorScheme="teal" fontSize="sm" p={2}>
                  {category.name}
                </Badge>
              ))}
            </HStack>
          </Box>
        )} */}

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
  );
}

import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Image,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { WorkModel } from '@/types/strapi';
import ImageViewer from './imageViewer';

interface MasonryGalleryProps {
  works: WorkModel[];
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ works }) => {
  const { open, setOpen } = useDisclosure();
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const columns =
    useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }) || 3;

  const handleWorkClick = (workIndex: number, imageIndex: number = 0) => {
    setSelectedWorkIndex(workIndex);
    setSelectedImageIndex(imageIndex);
    setOpen(true);
  };

  return (
    <Box px={4} py={8}>
      <SimpleGrid columns={columns} gap={4}>
        {works.map((work, workIndex) => {
          const previewImage = work.images[0];
          if (!previewImage) return null;

          return (
            <Box
              key={work.id}
              cursor="pointer"
              onClick={() => handleWorkClick(workIndex)}
              borderRadius="md"
              overflow="hidden"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.02)' }}
              boxShadow="md"
            >
              <Image
                src={previewImage.url}
                alt={previewImage.alternativeText || work.name}
                width="100%"
                height="auto"
                objectFit="cover"
                loading="lazy"
              />
            </Box>
          );
        })}
      </SimpleGrid>

      <ImageViewer
        isOpen={open}
        setOpen={setOpen}
        works={works}
        currentWorkIndex={selectedWorkIndex}
        currentImageIndex={selectedImageIndex}
        setCurrentImageIndex={setSelectedImageIndex}
      />
    </Box>
  );
};

export default MasonryGallery;

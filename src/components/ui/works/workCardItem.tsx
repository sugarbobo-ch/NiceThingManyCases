import {
  Avatar,
  Box,
  GridItem,
  GridItemProps,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import defaultThumbnail from '/public/KIM7486_0.webp';
import { StrapiImage } from '@/types/strapi';

export interface WorkCardItemProps extends GridItemProps {
  title: string;
  description?: string;
  image?: StrapiImage | StaticImageData | string;
  clickable?: boolean;
  onClick?: () => void;
}

const WorkCardItem = ({
  title,
  description,
  image,
  clickable = false,
  onClick,
  ...rest
}: WorkCardItemProps) => {
  console.log('image', image);
  return (
    <GridItem
      colSpan={{ base: 2, sm: 1 }}
      bg="white"
      borderRadius="2xl"
      boxShadow="sm"
      color="black"
      position="relative"
      overflow="hidden"
      cursor="pointer"
      onClick={clickable && onClick ? onClick : undefined}
      {...rest}
    >
      <VStack gap={0} align="stretch" justify="flex-start" height="100%">
        <Box width="100%" height="150px" position="relative" overflow="hidden">
          <Box
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform .3s"
            position="absolute"
            height="150px"
            top={0}
            left={0}
            right={0}
            bottom={0}
            overflow="hidden"
          >
            {image &&
              typeof image !== 'string' &&
              'url' in image &&
              image.url && (
                <Image
                  src={image.url}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  quality={80}
                />
              )}
            {image && typeof image === 'string' && (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                quality={80}
              />
            )}
            {!image && (
              <Image
                src={defaultThumbnail}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                quality={80}
              />
            )}
          </Box>
        </Box>

        <Box p="4">
          <HStack>
            <Avatar.Root>
              <Avatar.Fallback name="3M" />
              <Avatar.Image src="https://www.3m.com.tw/3m_theme_assets/themes/3MTheme/assets/images/unicorn/Logo_mobile.png" />
            </Avatar.Root>
            <Text fontWeight={600} fontSize="2xl" userSelect="none">
              {title}
            </Text>
          </HStack>

          {description && <Text userSelect="none">{description}</Text>}
        </Box>
      </VStack>
    </GridItem>
  );
};

export default WorkCardItem;

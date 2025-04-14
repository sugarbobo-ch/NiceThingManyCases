import { Box, GridItem, GridItemProps, Text } from '@chakra-ui/react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

export interface CardItemProps extends GridItemProps {
  title: string;
  description: string;
  image?: StaticImageData | string;
  clickable?: boolean;
  onClick?: () => void;
}

const CardItem = ({
  title,
  description,
  image,
  height = '300px',
  clickable = false,
  onClick,
  ...rest
}: CardItemProps) => {
  // Handle both StaticImageData and string URLs
  // const imageUrl = typeof image === 'string' ? image : image?.src;

  return (
    <GridItem
      colSpan={{ base: 2, sm: 1 }}
      bg="white"
      height={height}
      borderRadius="2xl"
      boxShadow="sm"
      color={image ? 'white' : 'black'}
      position="relative"
      overflow="hidden"
      p={4}
      cursor={clickable ? 'pointer' : 'default'}
      onClick={clickable && onClick ? onClick : undefined}
      {...rest}
    >
      {image && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
          {...(clickable && {
            _hover: { transform: 'scale(1.05)' },
            transition: 'transform .3s',
          })}
        >
          {typeof image === 'string' ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              quality={80}
            />
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              quality={80}
            />
          )}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={1}
            bgGradient="linear-gradient(0deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%)"
            pointerEvents="none"
          />
        </Box>
      )}
      <Box position="relative" zIndex={1} pointerEvents="none">
        <Text fontWeight={600} fontSize="2xl" userSelect="none">
          {title}
        </Text>
        <Text userSelect="none">{description}</Text>
      </Box>
    </GridItem>
  );
};

export default CardItem;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Image,
  Text,
  useBreakpointValue,
  Box,
  Dialog,
  Portal,
  CloseButton,
  ConditionalValue,
  IconButton,
} from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight, LuInfo } from 'react-icons/lu';
import { WorkModel } from '@/types/strapi';
import {
  FilmType,
  filmTypeMap,
  GlossEffectType,
  finishTypeMap,
  BrightnessType,
  brightnessMap,
} from '@/app/works/[slug]/page';

interface ImageViewerProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  works: WorkModel[];
  currentWorkIndex: number;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  setOpen,
  works,
  currentWorkIndex,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [hasTouched, setHasTouched] = useState(false);
  const currentWork = works[currentWorkIndex];

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance =
    useBreakpointValue({
      base: 50,
      md: 100,
    }) || 50;
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const buttonSize = useBreakpointValue({
    base: 'xl',
    md: '2xl',
  }) as ConditionalValue<
    'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' | '2xs' | undefined
  >;

  const handleNextImage = () => {
    const images = currentWork.images;
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    const images = currentWork.images;
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setHasTouched(true);
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const distance = touchEndX.current - touchStartX.current;
    const isLeftSwipe = distance < -minSwipeDistance;
    const isRightSwipe = distance > minSwipeDistance;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    } else if (Math.abs(distance) < 10) {
      setShowInfo(!showInfo);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          handleNextImage();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          handlePrevImage();
          break;
        case 'Escape':
        case 'Space':
          setOpen(false);
          break;
        case 'i':
          setShowInfo(!showInfo);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    setOpen,
    currentWorkIndex,
    currentImageIndex,
    showInfo,
    handleNextImage,
    handlePrevImage,
    setOpen,
  ]);

  // Added to prevent default touch behavior on the image container
  useEffect(() => {
    setHasTouched(false); // Reset hasTouched when the image viewer opens
    setShowInfo(false); // Reset showInfo when the image viewer opens
    const preventDefault = (e: TouchEvent) => {
      if (isOpen && imageContainerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    // Disable touchmove event on the document when the image viewer is open
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isOpen]);

  if (!currentWork) return null;

  const currentImage = currentWork.images?.length
    ? currentWork.images[currentImageIndex]
    : null;
  if (!currentImage) return null;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => setOpen(e.open)}
      size="full"
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop opacity={0.1} />
        <Dialog.Positioner>
          <Dialog.Content bg="blackAlpha.900">
            <Dialog.CloseTrigger asChild>
              <CloseButton
                variant="ghost"
                size={buttonSize}
                opacity={0.8}
                rounded="full"
                _hover={{ opacity: 1, bg: 'whiteAlpha.100' }}
                color="white"
              />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <Flex
                ref={imageContainerRef}
                direction="column"
                align="center"
                justify="center"
                h="100dvh"
                onClick={() => setShowInfo(!showInfo)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={currentImage.url}
                  alt={currentImage.alternativeText || currentWork.name}
                  maxH="90dvh"
                  maxW="100%"
                  objectFit="contain"
                  draggable={false}
                  pointerEvents="none"
                />
                {showInfo && (
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    bg="blackAlpha.700"
                    p={4}
                    color="white"
                  >
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      {currentWork.name}
                    </Text>
                    <Flex wrap="wrap" gap={2} mb={2}>
                      {currentWork.filmType && (
                        <Text
                          fontSize="sm"
                          bg="whiteAlpha.300"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {filmTypeMap[currentWork.filmType as FilmType]}
                        </Text>
                      )}
                      {currentWork.glossEffect && (
                        <Text
                          fontSize="sm"
                          bg="whiteAlpha.300"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {
                            finishTypeMap[
                              currentWork.glossEffect as GlossEffectType
                            ]
                          }
                        </Text>
                      )}
                      {currentWork.brightness && (
                        <Text
                          fontSize="sm"
                          bg="whiteAlpha.300"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {
                            brightnessMap[
                              currentWork.brightness as BrightnessType
                            ]
                          }
                        </Text>
                      )}
                    </Flex>
                  </Box>
                )}
              </Flex>

              {/* 導航按鈕 */}
              <IconButton
                display={showInfo ? 'none' : 'flex'}
                size={buttonSize}
                aria-label="上一張圖片"
                position="absolute"
                left="2"
                bottom="50%"
                transform="translateY(50%)"
                rounded="full"
                opacity={0.8}
                _hover={{ opacity: 1 }}
                bg="whiteAlpha.100"
                color="white"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
              >
                <LuChevronLeft />
              </IconButton>
              <IconButton
                display={showInfo ? 'none' : 'flex'}
                size={buttonSize}
                aria-label="下一張圖片"
                position="absolute"
                right="2"
                bottom="50%"
                transform="translateY(50%)"
                rounded="full"
                opacity={0.8}
                _hover={{ opacity: 1 }}
                bg="whiteAlpha.100"
                color="white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                <LuChevronRight />
              </IconButton>
              <IconButton
                size={buttonSize}
                variant="ghost"
                aria-label="顯示資訊"
                position="absolute"
                top={2}
                right={{ base: 16, md: 20 }}
                opacity={0.8}
                rounded="full"
                _hover={{ opacity: 1, bg: 'whiteAlpha.100' }}
                color="white"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
              >
                <LuInfo />
              </IconButton>

              {!hasTouched && (
                <Box
                  position="absolute"
                  bottom={16}
                  left="50%"
                  transform="translateX(-50%)"
                  color="white"
                  fontSize="sm"
                  display={showInfo ? 'none' : { base: 'block', md: 'none' }}
                  animation="pulse 2s linear infinite"
                >
                  向左/右滑動切換圖片
                </Box>
              )}

              {/* 圖片導航指示器 */}
              <Flex
                position="absolute"
                bottom={4}
                left="50%"
                transform="translateX(-50%)"
                gap={1}
                display={showInfo ? 'none' : 'flex'}
              >
                {currentWork.images.map((_, index) => (
                  <Box
                    key={index}
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={
                      index === currentImageIndex ? 'white' : 'whiteAlpha.500'
                    }
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                  />
                ))}
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ImageViewer;

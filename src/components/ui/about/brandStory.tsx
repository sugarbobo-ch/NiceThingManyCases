import {
  Box,
  Flex,
  Text,
  Image,
  Stack,
  Span,
  Grid,
  GridItem,
  Container,
} from '@chakra-ui/react';

const BrandStoryContent = () => (
  <>
    <GridItem display="flex" justifyContent="center" alignItems="flex-start">
      <Stack
        flex="1"
        gap="0"
        justifyContent="center"
        alignItems={{ base: 'center', md: 'flex-end' }}
      >
        <Span fontWeight={600} fontSize="3xl" display="inline-flex">
          Our Brand
        </Span>
        <Span fontSize="lg" display="inline-flex">
          Inspiring Subtitle
        </Span>
      </Stack>
      <Flex
        height="72px"
        minWidth={{ base: '0', md: '40%' }}
        alignItems="center"
      >
        <Flex
          ml={{ base: 0, md: 4 }}
          width="100%"
          height="2px"
          bg="orange.300"
        ></Flex>
      </Flex>
    </GridItem>

    <Stack flex="1" textAlign="center" alignItems="center" mt="9">
      <Box
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        left="50%"
        top="0"
        bottom="0"
        width="2px"
        bg="orange.300"
      />
      <Image
        width={300}
        src="https://housewrapper.com/wp-content/uploads/2023/10/kim8612.jpg?w=2048"
        alt="Brand Image"
        mb={4}
      />
      <Text fontSize="md" p="4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </Stack>
  </>
);

const BrandStory = ({ id }: { id: string }) => {
  return (
    <Container py={12} id={id} margin="auto">
      <Grid
        direction="row"
        p={5}
        position="relative"
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      >
        <BrandStoryContent />
        <BrandStoryContent />
        <BrandStoryContent />
        <BrandStoryContent />
        <BrandStoryContent />
      </Grid>
    </Container>
  );
};

export default BrandStory;

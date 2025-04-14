import { Box, Container, Grid, Heading, Text, Flex } from '@chakra-ui/react';

interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const TeamIntroductionContent = ({
  name,
  title,
  description,
  imageUrl,
}: TeamMemberProps) => {
  return (
    <Flex
      direction={['column', 'column', 'row']}
      bg={'gray.100'}
      overflow="hidden"
      minH="300px"
      borderRadius="2xl"
      shadow="lg"
    >
      <Box
        w={['100%', '100%', '40%']}
        h={['250px', '250px', 'auto']}
        bgImage={`url(${imageUrl})`}
        bgSize="cover"
        bgPos="center"
      />
      <Box w={['100%', '100%', '60%']} p={8}>
        <Heading as="h2" size="lg" color="blue.500" mb={1}>
          {name}
        </Heading>
        <Text fontSize="lg" color="gray.500" mb={5}>
          {title}
        </Text>
        <Text color="gray.600">{description}</Text>
      </Box>
    </Flex>
  );
};

const TeamIntroduction = ({ id }: { id: string }) => {
  const teamMembers = [
    {
      name: 'Philippa',
      title: 'Marketer',
      description:
        'Nullam blandit ipsum vitae justo semper, in ultrices mi luctus. Mauris a turpis quis massa imperdiet.',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Caroline',
      title: 'Web Designer',
      description:
        'Nullam blandit ipsum vitae justo semper, in ultrices mi luctus. Mauris a turpis quis massa imperdiet.',
      imageUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Isabel',
      title: 'Engineer',
      description:
        'Nullam blandit ipsum vitae justo semper, in ultrices mi luctus. Mauris a turpis quis massa imperdiet.',
      imageUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Narcisse',
      title: 'Director',
      description:
        'Nullam blandit ipsum vitae justo semper, in ultrices mi luctus. Mauris a turpis quis massa imperdiet.',
      imageUrl:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ];

  return (
    <Container py={12} id={id} margin="auto">
      <Box position="relative" textAlign="center" mb={16}>
        <Heading
          as="h1"
          display="inline-block"
          bg="black"
          color="white"
          px={12}
          py={4}
          fontSize="4xl"
          fontWeight="bold"
          zIndex={2}
          position="relative"
        >
          團隊成員
        </Heading>
      </Box>
      <Box
        position="absolute"
        left={0}
        top="20%"
        h="60%"
        w="80px"
        bg="blue.500"
        zIndex={-1}
      />
      <Grid
        templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
        gap={8}
        mb={16}
        px="4"
      >
        {teamMembers.map((member, index) => (
          <TeamIntroductionContent key={index} {...member} />
        ))}
      </Grid>
    </Container>
  );
};

export default TeamIntroduction;

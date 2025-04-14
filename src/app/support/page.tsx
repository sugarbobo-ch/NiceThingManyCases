'use client';

import React, { useState } from 'react';
import {
  Box,
  Center,
  Input,
  InputGroup,
  VStack,
  Heading,
  Icon,
  Container,
  Grid,
  Flex,
  Button,
  Text,
  Spinner,
  Accordion,
  CloseButton,
} from '@chakra-ui/react';
import CardItem from '@/components/ui/cardItem';
import { LuSearch } from 'react-icons/lu';
import { useFAQCategories } from '@/hooks/useFAQData';
import { useRouter } from 'next/navigation';

const SupportPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const {
    categories,
    faqs,
    loading,
    error,
    pagination,
    handleSearch,
    handlePageChange,
    clearSearch,
  } = useFAQCategories();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleCardClick = (categoryId: number) => {
    // Navigate to category detail page
    router.push(`/support/category/${categoryId}`);
  };

  const handleClearSearch = () => {
    clearSearch();
    setSearchTerm('');
  };

  return (
    <Box>
      <Center
        background="linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/KIM6143_0.webp')"
        bgSize="cover"
        bgPos="center"
        h="300px"
        position="relative"
      >
        <VStack gap={8} minW={{ base: '90%', md: 'md', xl: 'xl' }} p={4}>
          <Heading size={{ base: '2xl', md: '4xl' }} color={'white'}>
            歡迎使用好室多膜常見問題
          </Heading>
          <form onSubmit={handleSubmitSearch} style={{ width: '100%' }}>
            <InputGroup
              startElement={
                <Icon ml="5" color="gray.400">
                  <LuSearch />
                </Icon>
              }
              endElement={
                searchTerm && (
                  <CloseButton
                    mr="3"
                    color="gray.400"
                    _hover={{ color: 'gray.600' }}
                    variant="ghost"
                    aria-label="Clear search"
                    onClick={handleClearSearch}
                  />
                )
              }
            >
              <Input
                fontSize="xl"
                size="xl"
                placeholder="搜尋"
                variant="subtle"
                borderRadius="full"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </InputGroup>
          </form>
        </VStack>
      </Center>

      <Container py={{ base: 4, lg: 8 }} px={4} margin={'auto'}>
        {loading ? (
          <Center py={10}>
            <Spinner size="xl" />
          </Center>
        ) : error ? (
          <Center py={10}>
            <Text color="red.500">發生錯誤: {error.message}</Text>
          </Center>
        ) : categories.length === 0 && faqs.length === 0 ? (
          <Center py={10}>
            <VStack gap={4} align="center">
              <Heading size="xl">沒有找到相關的問題 😭😭😭</Heading>
              <Button
                variant="subtle"
                p="4"
                borderRadius="full"
                onClick={() => {
                  clearSearch();
                  setSearchTerm('');
                }}
              >
                清除搜尋
              </Button>
            </VStack>
          </Center>
        ) : (
          <>
            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={{ base: 4, lg: 8 }}
            >
              {categories.map((category) => (
                <CardItem
                  key={category.id}
                  title={category.title}
                  description={category.description || ''}
                  // image={getImageUrl(category.image)}
                  height="150px"
                  clickable
                  onClick={() => handleCardClick(category.id)}
                />
              ))}
            </Grid>
            {faqs.length > 0 && (
              <Box mt={8}>
                <Heading size="4xl" mb={4} textAlign={'center'}>
                  「{searchTerm}」的搜尋結果
                </Heading>
                <VStack gap={4} align="stretch">
                  <Accordion.Root collapsible>
                    {faqs.map((faq) => (
                      <Accordion.Item key={faq.id} value={faq.question}>
                        <h2>
                          <Accordion.ItemTrigger
                            py={4}
                            _hover={{ cursor: 'pointer' }}
                          >
                            <Box
                              flex="1"
                              textAlign="left"
                              fontSize="xl"
                              fontWeight="semibold"
                            >
                              Q: {faq.question}
                            </Box>
                            <Accordion.ItemIndicator />
                          </Accordion.ItemTrigger>
                        </h2>
                        <Accordion.ItemContent pb={4}>
                          <div
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </Accordion.ItemContent>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                </VStack>
              </Box>
            )}

            {pagination.pageCount > 1 && (
              <Flex justify="center" mt={8}>
                {Array.from({ length: pagination.pageCount }).map(
                  (_, index) => (
                    <Button
                      key={index}
                      mx={1}
                      colorScheme={
                        pagination.page === index + 1 ? 'blue' : 'gray'
                      }
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  )
                )}
              </Flex>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default SupportPage;

'use client';

import React, { use } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Spinner,
  Center,
  Button,
  Accordion,
} from '@chakra-ui/react';
import { useFAQsByCategory } from '@/hooks/useFAQData';
import { usePathname, useRouter } from 'next/navigation';
import Breadcrumb from '@/components/ui/breadcrumb';

interface CategoryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ params }) => {
  const { id } = use(params);
  const { faqs, loading, error } = useFAQsByCategory(id);
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    router.back();
  };

  return (
    <Box>
      <Breadcrumb
        items={[
          { label: '首頁', href: '/' },
          { label: '常見QA', href: '/support' },
          {
            label: faqs.length > 0 ? faqs[0].category.title : '類別',
            href: pathname,
          },
        ]}
      />
      <Container py={{ base: 4, lg: 8 }} px={4} margin={'auto'}>
        <Button
          onClick={handleBack}
          p="4"
          borderRadius="full"
          mb={4}
          variant="subtle"
        >
          返回
        </Button>

        {loading ? (
          <Center py={10}>
            <Spinner size="xl" />
          </Center>
        ) : error ? (
          <Center py={10}>
            <Text color="red.500">發生錯誤: {error.message}</Text>
          </Center>
        ) : faqs.length === 0 ? (
          <Center py={10}>
            <Text>此類別下沒有問題</Text>
          </Center>
        ) : (
          <VStack gap={8} align="stretch">
            <Heading size="4xl" mb={4} textAlign={'center'}>
              常見問題
            </Heading>

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
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default CategoryDetailPage;

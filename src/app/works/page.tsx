'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  VStack,
  Container,
  Center,
  Drawer,
  Portal,
  CloseButton,
} from '@chakra-ui/react';
import BreadcrumbNav from '@/components/ui/breadcrumbNav';
import WorkFilterFields from '@/components/ui/works/workFilterFields';
import WorkCardItem from '@/components/ui/works/workCardItem';
import { fetchCarModels } from '@/lib/api/strapi';
import { useEffect } from 'react';
import { CarModel } from '@/types/strapi';
const qs = require('qs');

const filmTypeOptions = [
  { label: '全部', value: 'all' },
  { label: '犀牛皮 PPF', value: 'ppf' },
  { label: '其他膜類型', value: 'others' },
];

const glossEffectOptions = [
  { label: '亮面(高亮)', value: 'glossy' },
  { label: '緞面(絲綢)', value: 'satin' },
  { label: '消光(啞光)', value: 'matte' },
];

const filmBrandOptions = [
  { label: '3M', value: '3m' },
  { label: 'Suntek', value: 'suntek' },
  { label: 'Stek', value: 'stek' },
  { label: 'Rodim', value: 'rodim' },
  { label: '米其林', value: 'michelin' },
  { label: '國產品牌', value: 'domestic' },
];

const colorToneOptions = [
  { label: '淺色', value: 'light' },
  { label: '深色', value: 'dark' },
];

const colorSeriesOptions = [
  { label: '紅', value: 'red' },
  { label: '粉', value: 'pink' },
  { label: '橙', value: 'orange' },
  { label: '黃', value: 'yellow' },
  { label: '綠', value: 'green' },
  { label: '藍', value: 'blue' },
  { label: '紫', value: 'purple' },
  { label: '彩色', value: 'rainbow' },
  { label: '黑', value: 'black' },
  { label: '灰', value: 'gray' },
  { label: '白', value: 'white' },
  { label: '黑白漸層', value: 'black-white-gradient' },
];

const carBrandOptions = [
  { label: 'Tesla Model 3', value: 'tesla-model-3' },
  { label: 'Tesla Model Y', value: 'tesla-model-y' },
  { label: 'Tesla Model S', value: 'tesla-model-s' },
  { label: 'Tesla Model X', value: 'tesla-model-x' },
  { label: 'AUDI', value: 'audi' },
  { label: 'BMW', value: 'bmw' },
  { label: 'BENZ', value: 'benz' },
  { label: 'PORSCHE', value: 'porsche' },
  { label: 'Range Rover', value: 'range-rover' },
  { label: 'HYUNDAI', value: 'hyundai' },
  { label: 'SKODA', value: 'skoda' },
];

export type FiltersType = {
  filmType: string;
  glossEffect: string[];
  filmBrand: string[];
  colorTone: string[];
  colorSeries: string[];
  carBrand: string[];
};

const WorksPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    filmType: 'all',
    glossEffect: [] as string[],
    filmBrand: [] as string[],
    colorTone: [] as string[],
    colorSeries: [] as string[],
    carBrand: [] as string[],
  });
  const [carModels, setCarModels] = useState<CarModel[]>([]);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  useEffect(() => {
    const loadCarModels = async () => {
      const { data } = await fetchCarModels();
      setCarModels(data);
    };

    loadCarModels();
  }, []);

  useEffect(() => {
    const loadFilteredCarModels = async (filters: FiltersType) => {
      const { data } = await fetchCarModels(filters);
      setCarModels(data);
    };

    loadFilteredCarModels(filters);
  }, [filters]);

  return (
    <Box>
      <Box
        bg="gray.50"
        w="100dvw"
        bgImage="linear-gradient(180deg, rgba(0,0,06,0.4) 0%,rgba(0,0,0,0.9) 100%), url(https://spacet-lab.com/wp-content/uploads/2024/09/IMG_1019.jpg)"
        bgSize="cover"
        bgPos="center"
      >
        <BreadcrumbNav />

        <Center alignSelf="center" minH="sm">
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
          >
            <GridItem colSpan={1}>
              <VStack
                textAlign="left"
                alignItems="flex-start"
                pr={{ base: 0, sm: '10dvw' }}
              >
                <Heading
                  as="h1"
                  size="4xl"
                  mb={2}
                  color="white"
                  textAlign="center"
                >
                  作品欣賞
                </Heading>
                <Heading as="h2" size="lg" color="white" textAlign="center">
                  讓我們一起探索改色膜的無限可能性
                </Heading>
              </VStack>
            </GridItem>
            <GridItem
              colSpan={1}
              display={{ base: 'none', xl: 'block' }}
            ></GridItem>
          </Grid>
        </Center>
      </Box>

      <Container py={{ base: 4, lg: 8 }} px={4} margin={'auto'}>
        <Drawer.Root>
          <Button
            onClick={toggleFilter}
            colorScheme="teal"
            mb={4}
            px={4}
            size="lg"
            borderRadius={'full'}
            display={{ base: 'none', md: 'block' }}
          >
            {isFilterOpen ? '縮小篩選欄' : '展開篩選欄'}
          </Button>

          <Box
            display={{ base: 'block', md: 'flex' }}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            {/* Left Filter Panel */}
            <Box
              width={isFilterOpen ? 'sm' : '0'}
              overflow="hidden"
              p={isFilterOpen ? 4 : 0}
              display={{ base: 'none', md: 'block' }}
            >
              {isFilterOpen && (
                <WorkFilterFields
                  filmTypeOptions={filmTypeOptions}
                  glossEffectOptions={glossEffectOptions}
                  filmBrandOptions={filmBrandOptions}
                  colorToneOptions={colorToneOptions}
                  colorSeriesOptions={colorSeriesOptions}
                  carBrandOptions={carBrandOptions}
                  setFilters={setFilters}
                  filters={filters}
                />
              )}
            </Box>
            {/* Drawer for mobile view when filter is open */}
            <Box display={{ base: 'block', md: 'none' }}>
              <Drawer.Trigger asChild>
                <Button width="100%" variant="outline" size="sm">
                  進階篩選
                </Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content p="4">
                    <Drawer.Header>
                      <Drawer.Title>進階篩選</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <WorkFilterFields
                        filmTypeOptions={filmTypeOptions}
                        glossEffectOptions={glossEffectOptions}
                        filmBrandOptions={filmBrandOptions}
                        colorToneOptions={colorToneOptions}
                        colorSeriesOptions={colorSeriesOptions}
                        carBrandOptions={carBrandOptions}
                        setFilters={setFilters}
                        filters={filters}
                      />
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Drawer.Trigger asChild>
                        <Button width="100%">關閉</Button>
                      </Drawer.Trigger>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Box>

            {/* Right Car Models Display */}
            <Box flex="1">
              <Grid
                templateColumns={{
                  base: 'repeat(2, 1fr)',
                  md: `repeat(${isFilterOpen ? 3 : 4}, 1fr)`,
                }}
                gap={4}
              >
                {carModels.map((car) => (
                  <WorkCardItem
                    key={car.id}
                    title={car.name}
                    height="250px"
                    clickable
                    onClick={() => console.log(`Clicked on ${car.name}`)}
                  />
                ))}
              </Grid>
            </Box>
          </Box>
        </Drawer.Root>
      </Container>
    </Box>
  );
};

export default WorksPage;

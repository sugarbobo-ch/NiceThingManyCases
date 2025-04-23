'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Spinner,
} from '@chakra-ui/react';
import Breadcrumb from '@/components/ui/breadcrumb';
import WorkFilterFields from '@/components/ui/works/workFilterFields';
import WorkCardItem from '@/components/ui/works/workCardItem';
import {
  fetchWorks,
  fetchColorCategories,
  fetchFilmBrands,
  fetchCarModels,
} from '@/lib/api/strapi';
import { ColorCategory, WorkModel, FilmBrand, CarModel } from '@/types/strapi';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';

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

const brightnessOptions = [
  { label: '淺色', value: 'light' },
  { label: '深色', value: 'dark' },
];

const colorCategoryOptions = [
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

const carModelOptions = [
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
  brightness: string[];
  colorCategory: string[];
  carModel: string[];
};

const WorksPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [workModels, setWorkModels] = useState<WorkModel[]>([]);
  const [colorCategories, setColorCategories] = useState<ColorCategory[]>([]);
  const [filmBrands, setFilmBrands] = useState<FilmBrand[]>([]);
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 從 URL 參數初始化篩選狀態
  const initialFilters = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return {
      filmType: params.get('filmType') || 'all',
      glossEffect: params.getAll('glossEffect') || [],
      filmBrand: params.getAll('filmBrand') || [],
      brightness: params.getAll('brightness') || [],
      colorCategory: params.getAll('colorCategory') || [],
      carModel: params.getAll('carModel') || [],
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<FiltersType>(initialFilters);

  // 更新 URL 參數
  const updateUrlParams = useCallback(
    (newFilters: FiltersType) => {
      const params = new URLSearchParams();

      if (newFilters.filmType !== 'all') {
        params.set('filmType', newFilters.filmType);
      }

      newFilters.glossEffect.forEach((value) =>
        params.append('glossEffect', value)
      );
      newFilters.filmBrand.forEach((value) =>
        params.append('filmBrand', value)
      );
      newFilters.brightness.forEach((value) =>
        params.append('brightness', value)
      );
      newFilters.colorCategory.forEach((value) =>
        params.append('colorCategory', value)
      );
      newFilters.carModel.forEach((value) => params.append('carModel', value));

      const newUrl = params.toString() ? `?${params.toString()}` : '/works';
      router.push(newUrl, { scroll: false });
    },
    [router]
  );

  // 更新篩選狀態並同步到 URL
  const handleFilterChange = useCallback(
    (newFilters: FiltersType) => {
      setFilters(newFilters);
      updateUrlParams(newFilters);
    },
    [updateUrlParams]
  );

  const colorCategoryOptionsMemo = useMemo(() => {
    if (colorCategories.length > 0) {
      return colorCategories.map((category) => ({
        value: category.name,
        label: category.name,
      }));
    }
    return colorCategoryOptions;
  }, [colorCategories]);

  const filmBrandOptionsMemo = useMemo(() => {
    if (filmBrands.length > 0) {
      return filmBrands.map((brand) => ({
        label: brand.name,
        value: brand.name,
      }));
    }
    return filmBrandOptions;
  }, [filmBrands]);

  const carModelOptionsMemo = useMemo(() => {
    if (carModels.length > 0) {
      return carModels.map((model) => ({
        value: model.name,
        label: model.name,
      }));
    }
    return carModelOptions;
  }, [carModels]);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const clearFilters = useCallback(() => {
    const defaultFilters = {
      filmType: 'all',
      glossEffect: [] as string[],
      filmBrand: [] as string[],
      brightness: [] as string[],
      colorCategory: [] as string[],
      carModel: [] as string[],
    };
    setFilters(defaultFilters);
    router.replace('/works', { scroll: false });
  }, [router]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.filmType !== 'all' ||
      filters.glossEffect.length > 0 ||
      filters.filmBrand.length > 0 ||
      filters.brightness.length > 0 ||
      filters.colorCategory.length > 0 ||
      filters.carModel.length > 0
    );
  }, [filters]);

  // 初始化數據（只在組件首次渲染時執行）
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [categoriesData, brandsData, modelsData] = await Promise.all([
          fetchColorCategories(),
          fetchFilmBrands(),
          fetchCarModels(),
        ]);
        setColorCategories(categoriesData.data);
        setFilmBrands(brandsData.data);
        setCarModels(modelsData.data);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('載入初始資料時發生錯誤，請稍後再試');
      }
    };

    fetchInitialData();
  }, []); // 空依賴數組表示只在組件掛載時執行一次

  // 根據篩選條件獲取作品
  useEffect(() => {
    const fetchFilteredWorks = async () => {
      try {
        setIsLoading(true);
        const worksData = await fetchWorks(filters);
        setWorkModels(worksData.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching works:', err);
        setError('載入作品時發生錯誤，請稍後再試');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredWorks();
  }, [filters]); // 只在篩選條件改變時執行

  if (error) {
    return (
      <Center h="calc(100dvh - 60px)">
        <VStack gap={4} align="center">
          <Heading size="xl" color="red.500">
            {error} 😭😭😭
          </Heading>
          <Button
            variant="subtle"
            p="4"
            borderRadius="full"
            onClick={() => {
              window.location.href = '/works';
            }}
          >
            重新載入
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Box>
      <Box
        bg="gray.50"
        w="100dvw"
        bgImage="linear-gradient(180deg, rgba(0,0,06,0.4) 0%,rgba(0,0,0,0.9) 100%), url(https://spacet-lab.com/wp-content/uploads/2024/09/IMG_1019.jpg)"
        bgSize="cover"
        bgPos="center"
      >
        <Breadcrumb
          items={[
            { label: '首頁', href: '/' },
            { label: '作品欣賞', href: '/works' },
          ]}
        />

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
          <Box display="flex" gap={2} mb={4}>
            <Button
              onClick={toggleFilter}
              colorScheme="teal"
              px={4}
              size="lg"
              borderRadius={'full'}
              display={{ base: 'none', md: 'block' }}
            >
              {isFilterOpen ? '縮小篩選欄' : '展開篩選欄'}
            </Button>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                colorScheme="gray"
                variant="outline"
                px={4}
                size="lg"
                borderRadius={'full'}
              >
                清除搜尋
                <FaTimes />
              </Button>
            )}
          </Box>

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
                  filmBrandOptions={filmBrandOptionsMemo}
                  brightnessOptions={brightnessOptions}
                  colorCategoryOptions={colorCategoryOptionsMemo}
                  carModelOptions={carModelOptionsMemo}
                  setFilters={handleFilterChange}
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
                        filmBrandOptions={filmBrandOptionsMemo}
                        brightnessOptions={brightnessOptions}
                        colorCategoryOptions={colorCategoryOptionsMemo}
                        carModelOptions={carModelOptionsMemo}
                        setFilters={handleFilterChange}
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
            <Box flex="1" position="relative">
              {isLoading && (
                <Portal>
                  <Box
                    position="fixed"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="rgba(0, 0, 0, 0.5)"
                    zIndex="overlay"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Spinner size="xl" color="white" />
                  </Box>
                </Portal>
              )}
              <Grid
                templateColumns={{
                  base: 'repeat(2, 1fr)',
                  md: `repeat(${isFilterOpen ? 3 : 4}, 1fr)`,
                }}
                gap={4}
              >
                {workModels.map((car) => (
                  <WorkCardItem
                    key={car.id}
                    title={car.name}
                    height="250px"
                    image={car.thumbnail}
                    clickable
                    onClick={() => router.push(`/works/${car.slug}`)}
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

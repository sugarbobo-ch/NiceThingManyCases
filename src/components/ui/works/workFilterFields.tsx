import React from 'react';
import {
  Accordion,
  HStack,
  Text,
  VStack,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { FiltersType } from '@/app/works/page';
import { useCallback } from 'react';

interface OptionType {
  label: string;
  value: string;
}

interface WorkFilterFieldsProps {
  filmTypeOptions: OptionType[];
  glossEffectOptions: OptionType[];
  filmBrandOptions: OptionType[];
  colorToneOptions: OptionType[];
  colorSeriesOptions: OptionType[];
  carBrandOptions: OptionType[];
  setFilters: (filters: FiltersType) => void;
  filters: FiltersType;
}

const WorkFilterFields = ({
  filmTypeOptions,
  glossEffectOptions,
  filmBrandOptions,
  colorToneOptions,
  colorSeriesOptions,
  carBrandOptions,
  setFilters,
  filters,
}: WorkFilterFieldsProps) => {
  const setSelectedFilmType = (value: string) => {
    setFilters({ ...filters, filmType: value });
  };

  const updateFilters = useCallback(
    (key: keyof FiltersType, value: string | string[]) => {
      setFilters({ ...filters, [key]: value });
      console.log('Updated filters:', {
        ...filters,
        [key]: value,
      });
    },
    [filters, setFilters]
  );

  const setSelectedGlossEffect = useCallback(
    (value: string[]) => {
      updateFilters('glossEffect', value);
    },
    [updateFilters]
  );

  const setSelectedBrand = useCallback(
    (value: string[]) => {
      updateFilters('filmBrand', value);
    },
    [updateFilters]
  );

  const setSelectedColorTone = useCallback(
    (value: string[]) => {
      updateFilters('colorTone', value);
    },
    [updateFilters]
  );

  const setSelectedColorSeries = useCallback(
    (value: string[]) => {
      updateFilters('colorSeries', value);
    },
    [updateFilters]
  );

  const setSelectedCarBrand = useCallback(
    (value: string[]) => {
      updateFilters('carBrand', value);
    },
    [updateFilters]
  );

  return (
    <>
      <Accordion.Root collapsible py="4" value={['filmType']}>
        <Accordion.Item value="filmType" userSelect="none">
          <HStack w="100%" justify="space-between" py={2}>
            <Text fontWeight="bold" fontSize="xl">
              膜類型
            </Text>
          </HStack>

          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <RadioGroup.Root
                defaultValue="all"
                onValueChange={(details) => setSelectedFilmType(details.value)}
                _hover={{ cursor: 'pointer' }}
              >
                <VStack align="flex-start" my="4" gap="4">
                  {filmTypeOptions.map((filmType) => (
                    <RadioGroup.Item
                      key={filmType.value}
                      value={filmType.value}
                      _hover={{ cursor: 'pointer' }}
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator
                        _hover={{ cursor: 'pointer' }}
                      />
                      <RadioGroup.ItemText>
                        {filmType.label}
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </VStack>
              </RadioGroup.Root>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      <Accordion.Root collapsible py="4">
        <Accordion.Item value="glossEffect">
          <Accordion.ItemTrigger _hover={{ cursor: 'pointer' }}>
            <HStack w="100%" justify="space-between" py={2}>
              <Text fontWeight="bold" fontSize="xl">
                光澤效果
              </Text>
              <Accordion.ItemIndicator />
            </HStack>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <CheckboxGroup
                defaultValue={[]}
                name="glossEffect"
                value={filters.glossEffect}
                onValueChange={setSelectedGlossEffect}
              >
                <VStack align="flex-start" my="4" gap="4">
                  {glossEffectOptions.map((effect) => (
                    <Checkbox.Root
                      key={effect.value}
                      _hover={{ cursor: 'pointer' }}
                      value={effect.value}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label>{effect.label}</Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </VStack>
              </CheckboxGroup>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      <Accordion.Root collapsible py="4">
        <Accordion.Item value="filmBrand">
          <Accordion.ItemTrigger _hover={{ cursor: 'pointer' }}>
            <HStack w="100%" justify="space-between" py={2}>
              <Text fontWeight="bold" fontSize="xl">
                膜料廠牌
              </Text>
              <Accordion.ItemIndicator />
            </HStack>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <CheckboxGroup
                defaultValue={[]}
                name="filmBrand"
                value={filters.filmBrand}
                onValueChange={setSelectedBrand}
              >
                <VStack align="flex-start" my="4" gap="4">
                  {filmBrandOptions.map((filmBrand) => (
                    <Checkbox.Root
                      key={filmBrand.value}
                      _hover={{ cursor: 'pointer' }}
                      value={filmBrand.value}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label>{filmBrand.label}</Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </VStack>
              </CheckboxGroup>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      {filters.filmType === 'others' && (
        <>
          <Accordion.Root collapsible py="4">
            <Accordion.Item value="colorTone">
              <Accordion.ItemTrigger _hover={{ cursor: 'pointer' }}>
                <HStack w="100%" justify="space-between" py={2}>
                  <Text fontWeight="bold" fontSize="xl">
                    深淺色調
                  </Text>
                  <Accordion.ItemIndicator />
                </HStack>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <CheckboxGroup
                    defaultValue={[]}
                    name="colorTone"
                    value={filters.colorTone}
                    onValueChange={setSelectedColorTone}
                  >
                    <VStack align="flex-start" my="4" gap="4">
                      {colorToneOptions.map((tone) => (
                        <Checkbox.Root
                          key={tone.value}
                          value={tone.value}
                          _hover={{ cursor: 'pointer' }}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Label>{tone.label}</Checkbox.Label>
                        </Checkbox.Root>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>

          <Accordion.Root collapsible py="4">
            <Accordion.Item value="colorSeries">
              <Accordion.ItemTrigger _hover={{ cursor: 'pointer' }}>
                <HStack w="100%" justify="space-between" py={2}>
                  <Text fontWeight="bold" fontSize="xl">
                    色系
                  </Text>
                  <Accordion.ItemIndicator />
                </HStack>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <CheckboxGroup
                    defaultValue={[]}
                    name="colorSeries"
                    value={filters.colorSeries}
                    onValueChange={setSelectedColorSeries}
                  >
                    <VStack align="flex-start" my="4" gap="4">
                      {colorSeriesOptions.map((color) => (
                        <Checkbox.Root
                          key={color.value}
                          value={color.value}
                          _hover={{ cursor: 'pointer' }}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Label>{color.label}</Checkbox.Label>
                        </Checkbox.Root>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </>
      )}
      <Accordion.Root collapsible py="4">
        <Accordion.Item value="carModels">
          <Accordion.ItemTrigger _hover={{ cursor: 'pointer' }}>
            <HStack w="100%" justify="space-between" py={2}>
              <Text fontWeight="bold" fontSize="xl">
                車種
              </Text>
              <Accordion.ItemIndicator />
            </HStack>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <CheckboxGroup
                defaultValue={[]}
                name="carModels"
                value={filters.carBrand}
                onValueChange={setSelectedCarBrand}
              >
                <VStack align="flex-start" my="4" gap="4">
                  {carBrandOptions.map((carBrand) => (
                    <Checkbox.Root
                      key={carBrand.value}
                      value={carBrand.value}
                      _hover={{ cursor: 'pointer' }}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label>{carBrand.label}</Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </VStack>
              </CheckboxGroup>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};

export default WorkFilterFields;

'use client';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapsible,
  CloseButton,
  useBreakpointValue,
  useDisclosure,
  HoverCard,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LuChevronDown } from 'react-icons/lu';
import Link from '@/components/ui/link';
import { useRouter } from 'next/navigation';

export default function WithSubnavigation() {
  const { open, onToggle } = useDisclosure();
  const router = useRouter();

  const handleConsultationClick = () => {
    console.log('立即諮詢 button clicked');
    router.push('/consultation');
  };

  return (
    <Box>
      <Flex
        bg={'gray.100'}
        color={'gray.800'}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.400'}
        justifyContent={'center'}
        align={'center'}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'space-between' }}
          align={'center'}
          maxW={'6xl'}
          m={'auto'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            {open ? (
              <CloseButton onClick={onToggle} />
            ) : (
              <IconButton
                variant="ghost"
                onClick={onToggle}
                aria-label={'Toggle Navigation'}
              >
                <GiHamburgerMenu />
              </IconButton>
            )}
          </Flex>
          <Flex
            flex={{ base: 1 }}
            justify={{ base: 'space-between', md: 'left' }}
          >
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              verticalAlign={'middle'}
              fontFamily={'heading'}
              color={'gray.800'}
            >
              Logo
            </Text>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10} m="auto">
              <DesktopNav />
            </Flex>

            <Button
              fontSize={'sm'}
              fontWeight={900}
              variant="solid"
              p={4}
              ml={4}
              borderRadius="full"
              onClick={handleConsultationClick}
            >
              立即諮詢
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <MobileNav />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = 'gray.600';
  const linkHoverColor = 'gray.900';
  const popoverContentBgColor = 'white';
  const router = useRouter();

  return (
    <Stack direction={'row'} gap={4} alignItems={'center'}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <HoverCard.Root openDelay={100} closeDelay={100}>
            <HoverCard.Trigger>
              <Box
                p={2}
                fontSize={'sm'}
                fontWeight={800}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                <Link href={navItem.href} text={navItem.label} />
              </Box>
            </HoverCard.Trigger>

            {navItem.children && (
              <HoverCard.Positioner>
                <HoverCard.Content
                  border={0}
                  boxShadow={'sm'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={navItem.label === '服務項目' ? '2xl' : 'sm'}
                >
                  {navItem.label !== '服務項目' && (
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  )}
                  {navItem.label === '服務項目' && (
                    <Stack direction={'row'} gapX={8} minW="xl">
                      {navItem.children.map((child, index) => (
                        <Stack key={index} direction="column" flex="1">
                          <Text fontSize="xl" fontWeight="bold">
                            {child.label}
                          </Text>
                          {child.children &&
                            child.children.map((subChild, subIndex) => (
                              <Box
                                key={subIndex}
                                onClick={() => {
                                  if (subChild.href) {
                                    router.push(subChild.href);
                                  }
                                }}
                                role={'group'}
                                display={'block'}
                                p={2}
                                rounded={'md'}
                                _hover={{ bg: 'orange.50', cursor: 'pointer' }}
                              >
                                <Stack direction={'row'} align={'center'}>
                                  <Box>
                                    <Text
                                      transition={'all .3s ease'}
                                      fontWeight={500}
                                    >
                                      {subChild.label}
                                    </Text>
                                  </Box>
                                </Stack>
                              </Box>
                            ))}
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </HoverCard.Content>
              </HoverCard.Positioner>
            )}
          </HoverCard.Root>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href }: NavItem) => {
  const router = useRouter();

  return (
    <Box
      onClick={() => {
        if (href) {
          router.push(href);
        }
      }}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: 'orange.50', cursor: 'pointer' }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} fontWeight={500}>
            {label}
          </Text>
          {/* <Text fontSize={'sm'}>{subLabel}</Text> */}
        </Box>
        {/* <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={LuChevronRight} />
        </Flex> */}
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={'white'} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { open, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Stack onClick={children && onToggle}>
      <Stack
        gap={0}
        onClick={() => {
          if (href) {
            router.push(href);
          }
        }}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600}>{label}</Text>
        {children && (
          <IconButton
            variant="ghost"
            as={LuChevronDown}
            transition={'all .25s ease-in-out'}
            transform={open ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
            mt={3}
          />
        )}
      </Stack>

      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <Stack
            mb={4}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={'gray.700'}
            align={'center'}
          >
            {children &&
              children.map((child) => {
                if (
                  child.label === '「主要服務項目」' ||
                  child.label === '「額外服務」' ||
                  child.label === '「服務預約步驟」'
                ) {
                  return (
                    <Grid
                      w="100%"
                      gap="4"
                      key={child.label}
                      borderBottom={1}
                      borderStyle={'solid'}
                      borderColor={'gray.700'}
                      templateColumns="repeat(2, 1fr)"
                    >
                      <GridItem
                        colSpan={1}
                        display={'flex'}
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                      >
                        <Text fontWeight={600} p={2} textAlign="right">
                          {child.label}
                        </Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Stack>
                          {child.children &&
                            child.children.map((subChild) => (
                              <Box
                                key={subChild.label}
                                py={2}
                                onClick={() => {
                                  if (subChild.href) {
                                    router.push(subChild.href);
                                  }
                                }}
                              >
                                {subChild.label}
                              </Box>
                            ))}
                        </Stack>
                      </GridItem>
                    </Grid>
                  );
                } else {
                  return (
                    <Box
                      as="a"
                      key={child.label}
                      py={2}
                      onClick={() => {
                        if (child.href) {
                          router.push(child.href);
                        }
                      }}
                    >
                      {child.label}
                    </Box>
                  );
                }
              })}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: '關於我們',
    children: [
      {
        label: '品牌故事',
        href: '#',
      },
      {
        label: '團隊介紹',
        href: '#',
      },
      {
        label: '品牌優勢',
        href: '#brand-advantage',
      },
      {
        label: '異業合作',
        href: '#',
      },
    ],
  },
  {
    label: '服務項目',
    children: [
      {
        label: '「主要服務項目」',
        children: [
          {
            label: '改色膜',
            href: '#',
          },
          {
            label: '犀牛皮',
            href: '#',
          },
          {
            label: '改色犀牛皮',
            href: '#',
          },
          {
            label: '客製化彩繪',
            href: '#',
          },
          {
            label: '企業形象車',
            href: '#',
          },
        ],
      },
      {
        label: '「額外服務」',
        children: [
          {
            label: '一站式施工',
            href: '#',
          },
          {
            label: '合作廠商加購',
            href: '#',
          },
          {
            label: '合作廠商優惠',
            href: '#',
          },
        ],
      },
      {
        label: '「服務預約步驟」',
        children: [
          {
            label: '諮詢服務(諮詢預約)',
            href: '#',
          },
          {
            label: '下訂流程',
            href: '#',
          },
          {
            label: '施工流程',
            href: '#',
          },
          {
            label: '專屬服務終身保固',
            href: '#',
          },
        ],
      },
    ],
  },
  {
    label: '作品欣賞',
    children: [
      {
        label: '改色包膜',
        href: '#',
      },
      {
        label: '透明/消光犀牛皮',
        href: '#',
      },
      {
        label: '改色犀牛皮',
        href: '#',
      },
      {
        label: '客製化彩繪',
        href: '#',
      },
      {
        label: '企業形象車',
        href: '#',
      },
      {
        label: '車主分享',
        href: '#',
      },
    ],
  },
  {
    label: '客戶服務',
    children: [
      {
        label: 'LINE@客服',
        href: '#',
      },
      {
        label: '常見QA',
        href: '#',
      },
      {
        label: '聯絡我們',
        href: '#',
      },
      {
        label: '測試者募集！',
        href: '#',
      },
    ],
  },
  {
    label: '最新活動',
    children: [
      {
        label: '活動總表',
        href: '#',
      },
      {
        label: '主打活動',
        href: '#',
      },
      {
        label: '指定色',
        href: '#',
      },
      {
        label: '遺愛色',
        href: '#',
      },
      {
        label: '年度優惠',
        href: '#',
      },
      {
        label: '表單優惠',
        href: '#',
      },
      {
        label: '推薦優惠',
        href: '#',
      },
    ],
  },
];

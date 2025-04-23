'use client';

import { Box, Container, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbNavProps> = ({
  items,
  showHomeIcon = true,
}) => {
  return (
    <Box py={2} px={4} bg="gray.800">
      <Container margin="auto">
        <Box display="flex" alignItems="center" color="gray.300">
          {items.map((item, index) => (
            <Box key={item.href} display="flex" alignItems="center">
              {index > 0 && (
                <Box mx={2} color="gray.400">
                  /
                </Box>
              )}
              {index === items.length - 1 ? (
                <Box color="orange.400">
                  {index === 0 && showHomeIcon ? (
                    <Box display="flex" alignItems="center">
                      <Icon mr={1}>
                        <FaHome />
                      </Icon>
                      {item.label}
                    </Box>
                  ) : (
                    item.label
                  )}
                </Box>
              ) : (
                <Link href={item.href}>
                  <Box _hover={{ color: 'orange.400' }} transition="color 0.2s">
                    {index === 0 && showHomeIcon ? (
                      <Box display="flex" alignItems="center">
                        <Icon mr={1}>
                          <FaHome />
                        </Icon>
                        {item.label}
                      </Box>
                    ) : (
                      item.label
                    )}
                  </Box>
                </Link>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Breadcrumb;

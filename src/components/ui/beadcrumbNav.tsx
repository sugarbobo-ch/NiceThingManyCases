'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb, Box, Icon, Container } from '@chakra-ui/react';
import Link from 'next/link';
import { useMemo } from 'react';
import { FaHome } from 'react-icons/fa';

// Define interface for route mapping
interface RouteMapping {
  [key: string]: string;
}

// Props interface
interface BreadcrumbNavProps {
  homeLabel?: string;
  separator?: React.ReactNode;
  routeLabels?: RouteMapping;
  showHomeIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: string;
  maxDisplayedCrumbs?: number;
}

// Component that provides breadcrumb navigation
export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  homeLabel = '首頁',
  routeLabels = {},
  showHomeIcon = true,
  size = 'lg',
  maxDisplayedCrumbs,
}) => {
  const pathname = usePathname();

  // Generate breadcrumb items based on current path
  const breadcrumbs = useMemo(() => {
    // Always add home as first item
    const crumbs = [{ href: '/', label: homeLabel }];

    // Split pathname into segments and create breadcrumb for each
    if (pathname !== '/') {
      const segments = pathname.split('/').filter(Boolean);

      let currentPath = '';
      segments.forEach((segment) => {
        currentPath += `/${segment}`;

        // Use custom label from routeLabels if available, otherwise capitalize segment
        const label =
          routeLabels[currentPath] ||
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

        crumbs.push({ href: currentPath, label });
      });
    }

    // If maxDisplayedCrumbs is set, limit the number of breadcrumbs shown
    if (maxDisplayedCrumbs && crumbs.length > maxDisplayedCrumbs) {
      // Always keep the first and last items
      const firstCrumb = crumbs[0];
      const lastCrumbs = crumbs.slice(crumbs.length - (maxDisplayedCrumbs - 1));
      return [firstCrumb, { href: '', label: '...' }, ...lastCrumbs];
    }

    return crumbs;
  }, [pathname, homeLabel, routeLabels, maxDisplayedCrumbs]);

  const breadcrumbContent = useMemo(() => {
    const breadcrumbWithoutSeparator = breadcrumbs.map((crumb, index) => {
      const isLastItem = index === breadcrumbs.length - 1;
      const isEllipsis = crumb.label === '...';

      if (isEllipsis) {
        return (
          <Breadcrumb.Item key={index}>
            <Breadcrumb.Ellipsis />
            <Breadcrumb.Separator />
          </Breadcrumb.Item>
        );
      }

      if (isLastItem) {
        return (
          <Breadcrumb.Item key={index}>
            <Breadcrumb.CurrentLink color="orange.400">
              {index === 0 && showHomeIcon ? (
                <Box display="flex" alignItems="center">
                  <Icon mr={1}>
                    <FaHome />
                  </Icon>
                  {crumb.label}
                </Box>
              ) : (
                crumb.label
              )}
            </Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        );
      }

      return (
        <Breadcrumb.Item key={`Item-${index}`}>
          <Breadcrumb.Link
            as={Link}
            href={crumb.href}
            aria-current={isLastItem ? 'page' : undefined}
          >
            {index === 0 && showHomeIcon ? (
              <Box display="flex" alignItems="center">
                <Icon mr={1}>
                  <FaHome />
                </Icon>
                {crumb.label}
              </Box>
            ) : (
              crumb.label
            )}
          </Breadcrumb.Link>
        </Breadcrumb.Item>
      );
    });

    const breadcrumbWithSeparator = breadcrumbWithoutSeparator.reduce(
      (acc, crumb, index) => {
        if (index < breadcrumbWithoutSeparator.length - 1) {
          acc.push(
            crumb,
            <Breadcrumb.Separator color="gray.300" key={`Separator-${index}`} />
          );
        } else {
          acc.push(crumb);
        }
        return acc;
      },
      []
    );
    return breadcrumbWithSeparator;
  }, [breadcrumbs, showHomeIcon]);

  return (
    <Box py={2} px={4} bg="gray.800">
      <Container margin="auto">
        <Breadcrumb.Root size={size} variant="plain">
          <Breadcrumb.List color="gray.300">
            {breadcrumbContent}
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Container>
    </Box>
  );
};

export default BreadcrumbNav;

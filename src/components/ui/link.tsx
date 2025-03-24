import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

interface LinkProps {
  href?: string;
  text: string;
}

const Link = ({ href, text }: LinkProps) => {
  return (
    <ChakraLink asChild>
      <NextLink href={href || '#'}>{text}</NextLink>
    </ChakraLink>
  );
};

export default Link;

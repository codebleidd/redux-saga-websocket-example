import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Flex, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher';

export const PageWrapper: FunctionComponent = ({ children }) => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Flex justifyContent="center" maxH="64px" alignItems="center">
          <Flex grow={1}>
            <HStack spacing={8}>
              <ChakraLink as={Link} to="/">
                Messages
              </ChakraLink>
              <ChakraLink as={Link} to="/buffers">
                Buffers
              </ChakraLink>
            </HStack>
          </Flex>
          <ColorModeSwitcher />
        </Flex>

        {children}
      </Grid>
    </Box>
  );
};

import React, { useState } from 'react';
import { PageWrapper } from '../../component/PageWrapper/PageWrapper';
import { Box, Button, Code, FormControl, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageAction } from '../../store/message/message.action';
import { BufferSelector } from '../../store/buffer/buffer.selector';
import { Message } from '../../store/buffer/buffer.action';
import { buffers } from 'redux-saga';

export const Buffers = () => {
  const [count, setCount] = useState('10');
  const [msgIndex, setMsgIndex] = useState(0);
  const dispatch = useDispatch();
  const none = useSelector(BufferSelector.getBufferNone);
  const expanding = useSelector(BufferSelector.getBufferExpanding);
  const dropping = useSelector(BufferSelector.getBufferDropping);
  const sliding = useSelector(BufferSelector.getBufferSliding);
  const submit = () => {
    const countNumber = parseInt(count, 10);
    Array.from(Array(countNumber)).forEach((x, index) =>
      dispatch(MessageAction.send(`${msgIndex + index}`)),
    );
    setMsgIndex(msgIndex + countNumber);
  };

  return (
    <PageWrapper>
      <VStack spacing={8}>
        <Box w="500px">
          <HStack>
            <Input
              type="number"
              min={0}
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="How many messages"
            />
            <Button onClick={submit}>Send</Button>
          </HStack>
        </Box>

        <Box pt={12}>
          <Code fontSize="xl">buffers.none()</Code>
        </Box>
        <Box w="800px" display="flex" alignItems="flex-start" flexWrap="wrap">
          {none.map((message, index) => (
            <Box
              w={10}
              h={10}
              bg="blue.600"
              color="blue.50"
              key={index}
              px={2}
              py={2}
              rounded="full"
              m={1}
            >
              <Text fontSize="md">{message}</Text>
            </Box>
          ))}
        </Box>

        <Box pt={12}>
          <Code fontSize="xl">buffers.expanding(5)</Code>
        </Box>
        <Box w="800px" display="flex" alignItems="flex-start" flexWrap="wrap">
          {expanding.map((message, index) => (
            <Box
              w={10}
              h={10}
              bg="blue.600"
              color="blue.50"
              key={index}
              px={2}
              py={2}
              rounded="full"
              m={1}
            >
              <Text fontSize="md">{message}</Text>
            </Box>
          ))}
        </Box>

        <Box pt={12}>
          <Code fontSize="xl">buffers.dropping(5)</Code>
        </Box>
        <Box w="800px" display="flex" alignItems="flex-start" flexWrap="wrap">
          {dropping.map((message, index) => (
            <Box
              w={10}
              h={10}
              bg="blue.600"
              color="blue.50"
              key={index}
              px={2}
              py={2}
              rounded="full"
              m={1}
            >
              <Text fontSize="md">{message}</Text>
            </Box>
          ))}
        </Box>

        <Box pt={12}>
          <Code fontSize="xl">buffers.sliding(5)</Code>
        </Box>
        <Box w="800px" display="flex" alignItems="flex-start" flexWrap="wrap">
          {sliding.map((message, index) => (
            <Box
              w={10}
              h={10}
              bg="blue.600"
              color="blue.50"
              key={index}
              px={2}
              py={2}
              rounded="full"
              m={1}
            >
              <Text fontSize="md">{message}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </PageWrapper>
  );
};

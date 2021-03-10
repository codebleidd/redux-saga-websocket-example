import React, { useState } from 'react';
import { Box, Button, VStack, HStack, FormControl, Input, Text } from '@chakra-ui/react';
import { PageWrapper } from '../../component/PageWrapper/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { MessageAction } from '../../store/message/message.action';
import { MessageSelector } from '../../store/message/message.selector';

export const Message = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector(MessageSelector.getMessageList);
  const submit = () => {
    setMessage('');
    dispatch(MessageAction.send(message));
  };
  const close = () => {
    dispatch(MessageAction.close());
  };

  return (
    <PageWrapper>
      <VStack spacing={8}>
        <Box w="500px">
          <HStack>
            <FormControl>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
            </FormControl>
            <Button onClick={submit}>Send</Button>
          </HStack>

          <Button mt={2} onClick={close}>
            Close connection
          </Button>
        </Box>
        <Box w="500px" display="flex" alignItems="flex-start" flexDirection="column">
          {messages.map((message, index) => (
            <Box bg="blue.600" color="blue.50" key={index} px={4} py={2} rounded="full" my={1}>
              <Text fontSize="md">{message}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </PageWrapper>
  );
};

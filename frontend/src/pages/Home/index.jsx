import React from 'react';
import { Main } from 'components/Layout';
import { ReactComponent as IconMessageBubbles } from 'assets/icons/message-bubbles.svg';
import { StyledHome } from './styled';

export default function Home() {
  return (
    <Main>
      <StyledHome>
        <h2>Messages</h2>
        <IconMessageBubbles className="icon-message-bubbles" />
      </StyledHome>
    </Main>
  );
}

import React from 'react';
import Container from '~/core/ui/Container';
import WordGame from './components/WordGame';

export default  function Home() {

  return (
    <div className={'flex flex-col space-y-16'}>
      <Container>
        <WordGame />
      </Container>
    </div>
  );
}

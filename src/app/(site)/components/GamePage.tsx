'use client';
import React, { useState, useEffect } from 'react';
import Container from '~/core/ui/Container';
import WordGame from './WordGame';
import ComingSoon from './ComingSoon';
import If from '~/core/ui/If';

const GamePage = () => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(window.location.href);
    console.log('url', window.location.href);
  }, []);

  return (
    <div>
      <If
        condition={url === 'https://wordokensolver.vercel.app'}
        fallback={<ComingSoon />}
      >
        <div className={'flex flex-col space-y-16'}>
          <Container>
            <WordGame />
          </Container>
        </div>
      </If>
    </div>
  );
};

export default GamePage;

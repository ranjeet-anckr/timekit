'use client';
import React, { useState, useEffect } from 'react';
import Container from '~/core/ui/Container';
import WordGame from './WordGame';
import ComingSoon from './ComingSoon';
import If from '~/core/ui/If';
import configuration from '~/configuration';

const GamePage = () => {
    const newUrl = configuration.site.siteUrl;
  return (
    <div>
      {/* <If
        condition={newUrl === 'https://wordokensolver.vercel.app'}
        fallback={<ComingSoon />}
      > */}
        <div className={'flex flex-col space-y-16'}>
          <Container>
            <WordGame />
          </Container>
        </div>
      {/* </If> */}
    </div>
  );
};

export default GamePage;

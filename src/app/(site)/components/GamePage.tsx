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
      <div className="flex flex-row justify-center items-start">
        <div className="bg-black w-64 m-4 h-[95vh] hidden md:flex md:items-center md:justify-center">
          <span className="text-white text-center">Google ads</span>
        </div>
        <div className={'flex flex-col '}>
          <Container>
            <WordGame />
            <div className="bg-black items-center justify-center mb-5 w-full h-48 flex md:hidden">
              <span className="text-white text-center">Google ads</span>
            </div>
          </Container>
        </div>
        <div className="bg-black w-60 m-4 h-[95vh] hidden md:flex md:items-center md:justify-center">
          <span className="text-white text-center">Google ads</span>
        </div>
      </div>
      {/* </If> */}
    </div>
  );
};

export default GamePage;

import React from 'react';
import Container from '~/core/ui/Container';
import Image from 'next/image';
import Button from '~/core/ui/Button';
import { ChevronLeft } from 'lucide-react';

const ComingSoon = () => {
  return (
    <div className="flex flex-col overflow-auto">
      <Container>
        <div className="relative w-full h-screen">
          <Button
            variant="link"
            href="/"
            className="absolute top-4 left-4 z-10 bg-white font-bold text-lg"
          >
            <ChevronLeft />
            <span className="ml-2">Back to HomePage</span>
          </Button>
          <Image
            className="absolute inset-0 w-full h-full "
            layout="fill"
            src="/assets/images/coming-soon.png"
            alt="App Image"
            placeholder="empty"
          />
        </div>
      </Container>
    </div>
  );
};

export default ComingSoon;

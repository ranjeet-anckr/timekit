'use client';
import React from 'react';
import Container from '~/core/ui/Container';
import Button from '~/core/ui/Button';
import { ChevronLeft } from 'lucide-react';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';
import TextField from '~/core/ui/TextField';

const ComingSoon = () => {
  return (
    <div className="flex flex-col overflow-auto">
      <Container>
        <div
          className="w-full h-screen bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url("/assets/images/yellow background.png")`,
          }}
        >
          <Button
            variant="link"
            href="/"
            className="  bg-customColor text-black font-bold text-lg mt-10 ml-10"
          >
            <ChevronLeft />
            <span className="ml-2">Back to HomePage</span>
          </Button>
          <div className="flex justify-center ">
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-center h-full p-4 ">
              <img
                src="/assets/images/coming soon.png"
                alt="coming-soon"
                className="w-96 h-80 object-contain"
              />
              <Heading type={2}>
                Get ready for the ultimate word game experience with Wordoken!
              </Heading>
              <SubHeading>
                Challenge your friends, become a word champion, and enjoy
                pulse-pounding action! Fun for experts and players of any level.
                If you like The New York Times Spelling Bee, you&apos;ll love
                Wordoken. Enjoy full access without any subscription. Don&apos;t
                miss out - sign up now for exclusive updates!
              </SubHeading>
              <div className="flex flex-row gap-2 mt-10">
                <TextField>
                  <TextField.Input
                    required
                    type="text"
                    className="uppercase font-bold text-lg  focus-visible:ring-customColor"
                    placeholder="Enter a email"
                  />
                </TextField>
                <Button className="bg-customColor hover:bg-customColor text-black font-bold text-lg ">
                  Notify Me !
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ComingSoon;

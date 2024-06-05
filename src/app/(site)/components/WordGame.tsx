'use client';
import React, { useEffect, useState } from 'react';
import TextField from '../../../core/ui/TextField';
import Button from '../../../core/ui/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/core/ui/accordion';
import { ChevronRight } from 'lucide-react';
import { data } from './data';
import AdBanner from 'components/AdBanner';

const WordGame = () => {
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [wordDokenList, setWordDokenList] = useState(
    data[0].abcdefil.wordokenList,
  );
  const [words, setWords] = useState({
    rareWord: [],
    commonWord: [],
  });

  useEffect(() => {
    const rareWords: string[] = [];
    const commonWords: string[] = [];

    Object.keys(data[0].abcdefil.wordDict).forEach((word) => {
      if (data[0].abcdefil.wordDict[word] > 0.0) {
        rareWords.push(word);
      } else {
        commonWords.push(word);
      }
    });

    setWords({ rareWord: rareWords, commonWord: commonWords });
  }, []);

  const handleChange = (event: any) => {
    setUserInput(event.target.value.toUpperCase());
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="mt-10 flex flex-col align-center justify-center">
      <HeroTitle>
        <span
          className={
            'bg-gradient-to-br bg-clip-text text-transparent' +
            ' from-primary-500 to-primary-900 leading-[1.2]'
          }
        >
          Wordoken
        </span>
      </HeroTitle>
      <div className="mt-10 text-center flex flex-row align-center justify-center space-x-4"></div>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-row align-center justify-center space-x-3 md:space-x-8"
      >
        <TextField>
          <TextField.Input
            required
            type="text"
            placeholder="Enter a word"
            minLength={10}
            maxLength={10}
            onChange={handleChange}
            value={userInput}
          />
        </TextField>
        <Button variant={'default'} type="submit" className="font-bold text-lg">
          Submit
        </Button>
      </form>
      {message && <div className="text-center mt-4">{message}</div>}
      <Accordion type="single" collapsible className="w-full mt-10">
        <AccordionItem value="item-1" className="border-b">
          <AccordionTrigger className="text-medium text-base md:text-xl text-left ">
            Show Wordoken Hint
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            Critical assessment of a process or activity or of their result.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b">
          <AccordionTrigger className="text-medium text-base md:text-xl text-left ">
            Show Wordoken
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg ">
            <div className="text-center flex flex-row flex-wrap space-x-2 md:space-x-4">
              {wordDokenList.map((item, index) => (
                <div key={index} className="p-1 border-2 rounded-lg mt-2">
                  {item}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-medium text-base md:text-xl text-left justify-start ">
            Show Words
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            <div className="pl-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b">
                  <AccordionTrigger className="text-medium text-base md:text-xl text-left ">
                    Show Rare Words
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg">
                    <div className="text-center flex flex-row flex-wrap space-x-2 md:space-x-4">
                      {words?.rareWord?.map((item, index) => (
                        <div
                          key={index}
                          className="p-1 border-2 rounded-lg mt-2"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b">
                  <AccordionTrigger className="text-medium text-base md:text-xl text-left ">
                    Show Common Words
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg">
                    <div className="text-center flex flex-row flex-wrap space-x-2 md:space-x-4">
                      {words?.commonWord?.map((item, index) => (
                        <div
                          key={index}
                          className="p-1 border-2 rounded-lg mt-2"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        variant="link"
        href="/coming-soon"
        className="bg-white font-bold text-lg"
      >
        <span className="mr-2">Coming Soon</span>
        <ChevronRight />
      </Button>
      <div>
        <div className="bg-black mb-5">
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="4730621222"
          />
        </div>

       
      </div>
    </div>
  );
};

export default WordGame;

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'text-center text-2xl text-gray-600 dark:text-white md:text-4xl' +
        ' flex flex-col font-heading font-medium  2xl:text-[5.2rem]'
      }
    >
      {children}
    </h1>
  );
}

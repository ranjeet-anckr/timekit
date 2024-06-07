'use client';
import React, { useEffect, useState, ReactNode } from 'react';
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
import { useForm } from 'react-hook-form';
import getSupabaseBrowserClient from '~/core/supabase/browser-client';
import { getWordData } from '~/lib/word/database/queries';

type WordList = string[];

interface Words {
  rareWord: WordList;
  commonWord: WordList;
}

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
}

const WordGame = () => {
  const [loading, setLoading] = useState(false);
  const [wordDokenList, setWordDokenList] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [words, setWords] = useState<Words>({ rareWord: [], commonWord: [] });
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      word: '',
    },
  });
  const errors = formState.errors;
  const wordControl = register('word', {
    required: 'This field is required',
    minLength: {
      value: 6,
      message: 'Word must be at least 6 characters',
    },
    maxLength: {
      value: 8,
      message: 'Word must be no more than 8 characters',
    },
  });

  const getData = async (word: string) => {
    setLoading(true);
    const client = getSupabaseBrowserClient();

    const response = await getWordData(client, word);
    if (response && response.length > 0) {
      setMessage('');
      const wordData = response[0];
      if (wordData.wordokenlist) {
        setWordDokenList(wordData.wordokenlist);
      }
      const rareWords: string[] = [];
      const commonWords: string[] = [];
      if (wordData.worddict) {
        Object.keys(wordData.worddict).forEach((key: string) => {
          if (wordData.worddict[key] > 0.0) {
            rareWords.push(key);
          } else {
            commonWords.push(key);
          }
        });

        setWords({ rareWord: rareWords, commonWord: commonWords });
      }
    } else {
      setMessage('There is no matching word.');
      setWords({ rareWord: [], commonWord: [] });
    }

    setLoading(false);
  };

  const onSubmit = (data: { word: string }) => {
    getData(data.word.trim().toLowerCase());
  };

  return (
    <div className="mt-10 flex flex-col align-center justify-center">
      <HeroTitle>
        <span className="bg-gradient-to-br bg-clip-text text-transparent from-primary-500 to-primary-900 leading-[1.2]">
          Wordoken
        </span>
      </HeroTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-row align-center justify-center space-x-3 md:space-x-8"
        noValidate
      >
        <TextField>
          <TextField.Input
            required
            type="text"
            className="uppercase font-bold text-lg"
            placeholder="Enter a word"
            maxLength={8}
            {...wordControl}
          />
          <TextField.Hint>
            Text should be a minimum of 6 characters and a maximum of 8
            characters.{' '}
          </TextField.Hint>
          <TextField.Error error={errors.word?.message} />
        </TextField>

        <Button
          variant="default"
          type="submit"
          className="font-bold text-lg"
          disabled={Object.keys(errors).length > 0 || loading}
        >
          {loading ? 'Checking...' : 'Submit'}
        </Button>
      </form>
      <div className="flex flex-row align-center justify-center mt-5">
        {message && (
          <p className="text-center text-lg font-bold text-red-500 mb-10">
            {message}
          </p>
        )}
      </div>
      {words.rareWord.length > 0 && words.commonWord.length > 0 && (
        <Accordion type="single" collapsible className="w-full mt-10">
          <AccordionItems words={words} wordDokenList={wordDokenList} />
        </Accordion>
      )}

      <Button
        variant="link"
        href="/coming-soon"
        className="bg-white font-bold text-lg"
      >
        <span className="mr-2">Coming Soon</span>
        <ChevronRight />
      </Button>
      <div className="bg-black mb-5">
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="4730621222"
        />
      </div>
    </div>
  );
};

export default WordGame;

interface HeroTitleProps {
  children: ReactNode;
}

function HeroTitle({ children }: HeroTitleProps) {
  return (
    <h1 className="text-center text-2xl text-gray-600 dark:text-white md:text-4xl flex flex-col font-heading font-medium 2xl:text-[5.2rem]">
      {children}
    </h1>
  );
}

interface AccordionItemsProps {
  words: Words;
  wordDokenList: string[];
}

function AccordionItems({ words, wordDokenList }: AccordionItemsProps) {
  return (
    <>
      <AccordionItem value="item-1" className="border-b">
        <AccordionTrigger className="text-medium text-base md:text-xl text-left">
          Show Wordoken Hint
        </AccordionTrigger>
        <AccordionContent className="text-base md:text-lg">
          Critical assessment of a process or activity or of their result.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b">
        <AccordionTrigger className="text-medium text-base md:text-xl text-left">
          Show Wordoken
        </AccordionTrigger>
        <AccordionContent className="text-base md:text-lg">
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
        <AccordionTrigger className="text-medium text-base md:text-xl text-left justify-start">
          Show Words
        </AccordionTrigger>
        <AccordionContent className="text-base md:text-lg">
          <div className="pl-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="text-medium text-base md:text-xl text-left">
                  Show Rare Words
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg">
                  <div className="text-center flex flex-row flex-wrap space-x-2 md:space-x-4">
                    {words.rareWord.map((item, index) => (
                      <div key={index} className="p-1 border-2 rounded-lg mt-2">
                        {item}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="text-medium text-base md:text-xl text-left">
                  Show Common Words
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg">
                  <div className="text-center flex flex-row flex-wrap space-x-2 md:space-x-4">
                    {words.commonWord.map((item, index) => (
                      <div key={index} className="p-1 border-2 rounded-lg mt-2">
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
    </>
  );
}

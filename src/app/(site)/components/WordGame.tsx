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
import AdBanner from 'components/AdBanner';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Label from '~/core/ui/Label';
import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';
import Container from '~/core/ui/Container';
import { getWordData } from '~/lib/word/database/queries';
import getSupabaseBrowserClient from '~/core/supabase/browser-client';
import If from '~/core/ui/If';
import LoadingOverlay from '~/core/ui/LoadingOverlay';

type WordList = string[];

interface Words {
  length: any;
  rareWord: WordList;
  commonWord: WordList;
}

const WordGame = () => {
  const [text, setText] = useState('');
  const [activeChars, setActiveChars] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [wordDokenList, setWordDokenList] = useState<string[]>([]);
  const [charColors, setCharColors] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [words, setWords] = useState<Words>({
    rareWord: [],
    commonWord: [],
    length: undefined,
  });
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      word: '',
    },
  });

  const getData = async (word: string, requiredLetter?: string[]) => {
    setLoading(true);
    setCharColors([]);
    const client = getSupabaseBrowserClient();
    const response = await getWordData(client, word);
    if (response && response.length > 0) {
      setMessage('Word(s) found! 😊');
      setCharColors(requiredLetter || []);
      const wordData = response[0];
      if (wordData.wordokenlist) {
        setWordDokenList(wordData.wordokenlist);
      }

      let rareWords: string[] = [];
      let commonWords: string[] = [];
      if (wordData.worddict) {
        Object.keys(wordData.worddict).forEach((key: string) => {
          if (wordData.worddict[key] > 0.0) {
            rareWords.push(key);
          } else {
            commonWords.push(key);
          }
        });

        // Filter rareWords and commonWords based on requiredLetter
        if (requiredLetter && requiredLetter.length > 0) {
          rareWords = rareWords.filter((word) =>
            requiredLetter.every((char: string) => word.includes(char)),
          );
          commonWords = commonWords.filter((word) =>
            requiredLetter.every((char: string) => word.includes(char)),
          );
        }

        setWords({
          rareWord: rareWords,
          commonWord: commonWords,
          length: undefined,
        });
      }
    } else {
      setMessage('There is no matching word(s). 😟');
      setWords({
        rareWord: [],
        commonWord: [],
        length: undefined,
      });
      setWordDokenList([]);
    }

    setLoading(false);
  };

  // useEffect(() => {
  //   if (activeChars.length > 0) {
  //     setWordDokenList((prevList) =>
  //       prevList.filter((item) =>
  //         activeChars.some((char) =>
  //           item.toLowerCase().includes(char.toLowerCase()),
  //         ),
  //       ),
  //     );

  //     setWords((prevWords) => ({
  //       rareWord: prevWords.rareWord.filter((word) =>
  //         activeChars.some((char) =>
  //           word.toLowerCase().includes(char.toLowerCase()),
  //         ),
  //       ),
  //       commonWord: prevWords.commonWord.filter((word) =>
  //         activeChars.some((char) =>
  //           word.toLowerCase().includes(char.toLowerCase()),
  //         ),
  //       ),
  //       length: undefined,
  //     }));
  //   }
  // }, [activeChars]);

  const handleCharClick = (char: string) => {
    const isMaxLength = text.length === 8;
    const maxChars = isMaxLength ? 2 : 1;
    let updatedActiveChars = [];

    if (activeChars.includes(char)) {
      // Remove char if it's already in activeChars
      updatedActiveChars = activeChars.filter((c) => c !== char);
    } else if (activeChars.length < maxChars) {
      // Add char if we haven't reached maxChars limit
      updatedActiveChars = [...activeChars, char];
    } else {
      // Handle the case where maxChars is reached and text.length is not 8
      if (!isMaxLength) {
        updatedActiveChars = [char];
      } else {
        // If text length is 8 and maxChars is reached, do nothing
        return;
      }
    }

    setActiveChars(updatedActiveChars);

    // Consolidate getData calls
    if (
      (isMaxLength && updatedActiveChars.length === 2) ||
      (!isMaxLength && updatedActiveChars.length === 1)
    ) {
      getData(text.trim().toLowerCase(), updatedActiveChars);
      setCharColors(updatedActiveChars);
    }
  };

  const errors = formState.errors;
  const wordControl = register('word', {
    required: 'This field is required',
    minLength: {
      value: 6,
      message: 'Word must be at least 6 letters',
    },
    maxLength: {
      value: 8,
      message: 'Word must be no more than 8 letters',
    },
  });

  const findCapitalLetters = (inputWord: string) => {
    return inputWord.match(/[A-Z]/g) || [];
  };

  const onSubmit = ({ word }: { word: string }) => {
    setMessage('');
    const capitalLetters = findCapitalLetters(word);
    const lowerCaseWord = word.trim().toLowerCase();

    if (word.length === 8 && capitalLetters.length === 2) {
      const sortedLetters = capitalLetters.sort().join('').toLowerCase();
      getData(lowerCaseWord, sortedLetters.split(''));
      setActiveChars(capitalLetters.map((letter) => letter.toLowerCase()));
    } else if (capitalLetters.length === 1) {
      const letter = capitalLetters[0].toLowerCase();
      getData(lowerCaseWord, [letter]);
      setActiveChars([letter]);
    } else {
      setActiveChars([]);
      setWords({
        rareWord: [],
        commonWord: [],
        length: undefined,
      });
      setWordDokenList([]);
      getData(lowerCaseWord);
    }

    setText(word);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      ['c', 'v', 'a', 'z', 'y'].includes(event.key.toLowerCase())
    ) {
      return;
    }
    if (
      !/^[A-Za-z]+$/.test(event.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
        event.key,
      )
    ) {
      event.preventDefault();
    }
  };

  const uniqueChars = Array.from(new Set(text.toLowerCase().split('')));
  return (
    <div className="p-2 md:p-0 mt-10 flex flex-col align-center justify-center">
      <div className={'flex w-full flex-1 flex-col items-center space-y-2'}>
        <HeroTitle>
          <div className="flex flex-col">
            <span className="bg-gradient-to-br bg-clip-text text-transparent from-primary-500 to-primary-900 leading-[1.2]">
              Wordoken Solver
            </span>
          </div>
        </HeroTitle>
        <Pill>
          <span>
            Get answers to
            <Link
              href="https://wordoken.vercel.app"
              target="_blank"
              className="px-1 text-primary hover:underline"
            >
              Wordoken word game
            </Link>
            puzzles! Our solver helps you find words quickly and get gentle
            hints. Also works for New York Times Spelling Bee.
          </span>
        </Pill>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col items-center justify-center"
        noValidate
      >
        <div className="flex flex-row space-x-8 items-start">
          <TextField>
            <TextField.Input
              required
              type="text"
              className="font-bold text-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring w-full"
              placeholder="Enter Puzzle Letters"
              onKeyDown={handleOnKeyDown}
              maxLength={8}
              {...wordControl}
            />
          </TextField>
          <If condition={loading}>
            <LoadingOverlay>
              <span>Loading. Please Wait..........</span>
            </LoadingOverlay>
          </If>
          <Button
            variant="default"
            type="submit"
            className="font-bold text-lg"
            disabled={Object.keys(errors).length > 0}
          >
            Submit
          </Button>
        </div>
        <div className=" flex flex-col text-left mt-3 justify-center ">
          <TextField.Error
            error={errors.word?.message}
            className="-mt-1 ml-2"
          />
          <TextField.Hint className="mt-1 ml-3">
            <ul className="list-disc ml-6">
              <li>
                Text should be a minimum of 6 letters and a maximum of 8
                letters.
              </li>
            </ul>
          </TextField.Hint>
          <TextField.Hint className="mt-1 ml-3">
            <ul className="list-disc ml-6">
              <li>Capitalize required letter(s) for better results.</li>
            </ul>
          </TextField.Hint>
        </div>
      </form>

      {text && (
        <div>
          <Label className="flex flex-row items-center justify-center space-x-2 mt-5">
            {text.length === 8
              ? 'Select both required letters.'
              : 'Select required letter.'}
          </Label>

          <div className="flex flex-row items-center justify-center space-x-2 mt-5 flex-wrap">
            {uniqueChars.map((char, index) => (
              <div key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={`rounded-full border border-gray-300 w-auto px-4 py-2 m-1 uppercase font-bold cursor-pointer ${
                        activeChars.includes(char)
                          ? 'bg-primary text-white'
                          : 'bg-white'
                      }`}
                      onClick={() => handleCharClick(char)}
                    >
                      {char}
                    </div>
                  </TooltipTrigger>
                  {!activeChars.includes(char) && (
                    <TooltipContent className="font-bold text-center bg-primary">
                      {`Make ${char.toUpperCase()} a required letter`}
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-row align-center justify-center mt-5">
        {message && (
          <p
            className={`text-center text-lg mb-10 ${
              wordDokenList.length ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <Container>
        <Accordion type="single" collapsible className="w-full mt-10">
          <AccordionItems
            words={words}
            wordDokenList={wordDokenList}
            activeChars={charColors}
          />
        </Accordion>
      </Container>

      <Button variant="link" className="bg-white font-bold text-lg">
        <Link
          href="https://wordoken.vercel.app"
          target="_blank"
          className="flex flex-row"
        >
          <span className="mr-2">Coming Soon</span>
          <ChevronRight />
        </Link>
      </Button>

      {/* <div className="bg-black mb-5 w-full h-48 md:h-64">
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="4730621222"
        />
      </div> */}
    </div>
  );
};

export default WordGame;

interface HeroTitleProps {
  children: React.ReactNode;
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
  activeChars: string[];
}

function AccordionItems({
  words,
  wordDokenList,
  activeChars,
}: AccordionItemsProps) {
  return (
    <>
      <AccordionItem value="item-1" className="border-b w-full">
        <AccordionTrigger className="text-medium text-base md:text-xl text-left w-full">
          Show Wordoken Hint
        </AccordionTrigger>
        <AccordionContent className="text-base md:text-lg w-full">
          Critical assessment of a process or activity or of their result.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b w-full">
        <AccordionTrigger className="text-medium text-base md:text-xl text-left w-full">
          Show Wordoken
        </AccordionTrigger>
        <AccordionContent className="text-base md:text-lg w-full">
          <div>
            {wordDokenList.length ? (
              <div className="text-center flex flex-row flex-wrap space-x-2 md:space-x-4 w-full">
                {wordDokenList.map((item, index) => (
                  <div key={index} className="p-1 border-2 rounded-lg mt-2">
                    {item.split('').map((char, idx) => (
                      <span
                        key={idx}
                        className={
                          activeChars.includes(char)
                            ? 'text-primary-500 underline'
                            : ''
                        }
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="italic">There is no matching word(s).</div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="w-[60vw]">
        <AccordionTrigger className="text-medium text-base md:text-xl text-left justify-start w-full">
          Show Words
        </AccordionTrigger>
        <AccordionContent className="text-base md:text-lg w-full">
          <div className="pl-4 w-full">
            <Accordion type="single" collapsible className="w-auto">
              <AccordionItem value="item-2" className="border-b w-full">
                <AccordionTrigger className="text-medium text-base md:text-xl text-left w-full">
                  Show Common Words
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg w-full">
                  <div>
                    <div>
                      {words.commonWord.length ? (
                        <div className="text-center flex flex-row flex-wrap space-x-2 md:space-x-4 w-full">
                          {words.commonWord.map((item, index) => (
                            <div
                              key={index}
                              className="p-1 border-2 rounded-lg mt-2"
                            >
                              {item.split('').map((char, idx) => (
                                <span
                                  key={idx}
                                  className={
                                    activeChars.includes(char)
                                      ? 'text-primary-500 underline '
                                      : ''
                                  }
                                >
                                  {char}
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="italic">
                          There is no matching word(s).
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1" className="border-b w-full">
                <AccordionTrigger className="text-medium text-base md:text-xl text-left w-full">
                  Show Rare Words
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg w-full">
                  {words.rareWord.length ? (
                    <div className="text-center flex flex-row flex-wrap space-x-2 md:space-x-4 w-full">
                      {' '}
                      {words.rareWord.map((item, index) => (
                        <div
                          key={index}
                          className="p-1 border-2 rounded-lg mt-2"
                        >
                          {item.split('').map((char, idx) => (
                            <span
                              key={idx}
                              className={
                                activeChars.includes(char)
                                  ? 'text-primary-500 underline'
                                  : ''
                              }
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="italic">There is no matching word(s).</div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        'inline-flex w-auto  md:w-1/2 items-center space-x-2' +
        ' rounded-full bg-gradient-to-br dark:from-gray-200 dark:via-gray-400' +
        ' dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm' +
        ' font-normal text-gray-500 dark:text-transparent shadow' +
        ' dark:shadow-dark-700'
      }
    >
      <span>{props.children}</span>
    </h2>
  );
}

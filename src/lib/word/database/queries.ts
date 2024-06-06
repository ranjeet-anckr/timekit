import type { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/database.types';
import { DICTIONARY } from '~/lib/db-tables';

export async function getWordData(
  client: SupabaseClient<Database>,
  word: string,
) {
  const sortedWord = word.split('').sort().join('');

  const result = await client
    .from(DICTIONARY)
    .select(
      `
    *
    `,
    )
    .eq('sortedwordname', sortedWord);

  return result.data;
}

import type { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/database.types';
import { DICTIONARY } from '~/lib/db-tables';

export async function getWordData(
  client: SupabaseClient<Database>,
  word: string,
  requiredLetter?: string,
) {
  const sortedWord = word.split('').sort().join('');

  let query = client
    .from(DICTIONARY)
    .select('*')
    .eq('sortedwordname', sortedWord);

  if (requiredLetter) {
    query = query.eq('requiredletter', requiredLetter);
  }

  const result = await query;
  return result.data;
}

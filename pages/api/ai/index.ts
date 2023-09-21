import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { createJsonTranslator, createLanguageModel } from 'typechat';

import movieJson from '@/json/movies.json';
import { FilterResponse } from '@/types/filters';

const model = createLanguageModel(process.env);
const typesDirectory = path.resolve(process.cwd(), 'types');

const schema = fs.readFileSync(path.join(typesDirectory, 'filters.ts'), 'utf-8');
const translator = createJsonTranslator<FilterResponse>(model, schema, 'FilterResponse');
const allGenres = Array.from(new Set(movieJson.flatMap((movie) => movie.genres)));

interface ApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;
  const response = await translator.translate(prompt);
  if (response.success) {
    // In case the prompt is parsed but no filters are returned, set error to true
    if (!response.data.filters) {
      response.data.error = true;
    }
    // if response.data.filters.genres includes a genre that is not in allGenres, set error to true
    if (response.data && response.data.filters && response.data.filters.genres) {
      response.data.error = response.data.filters.genres.some((genre) => !allGenres.includes(genre));
    }
    return res.status(200).json(response.data);
  } else {
    return res.status(500).json('Having problems connecting to the AI');
  }
}

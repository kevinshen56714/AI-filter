import type { NextApiRequest, NextApiResponse } from 'next';

import movieJson from '@/json/movies.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { startYear, endYear, genres } = req.query;
  const parsedGenres = (genres as string)?.split(',');
  let movies = movieJson;

  if (startYear) {
    movies = movies.filter((movie) => movie.year >= Number(startYear));
  }
  if (endYear) {
    movies = movies.filter((movie) => movie.year <= Number(endYear));
  }
  if (parsedGenres) {
    // Filter movies that have all the genres matched
    movies = movies.filter((movie) => {
      return parsedGenres.every((genre) => movie.genres.includes(genre));
    });
  }

  return res.status(200).json(movies);
}

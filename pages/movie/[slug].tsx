import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';

import { Badge } from '@/components/Badge';
import { Spinner } from '@/components/Spinner';
import movieJson from '@/json/movies.json';
import { Movie } from '@/types/movie';
import { ArrowLeftIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

interface MoviePageParams extends ParsedUrlQuery {
  slug: string;
}

export default function MoviePage({ movie }: { movie: Movie }) {
  const router = useRouter();
  const { title, year, genres, description, thumbnail, thumbnail_width, thumbnail_height } = movie;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <main className="mx-auto min-h-screen max-w-4xl py-8 px-2 sm:px-6 lg:px-20">
      <div className="relative mb-2">
        <button type="button" className="absolute inset-y-0 left-5" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-4xl font-bold text-center">{title}</h1>
      </div>
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="flex gap-1 items-center">
          <CalendarIcon className="h-5 w-5" />
          <span>{year}</span>
        </div>
        <div className="flex gap-1 items-center">
          <TagIcon className="h-5 w-5" />
          <div className="flex items-center">
            {genres.map((genre, i) => (
              <Badge key={i} value={genre} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {isLoading && (
          <div className="absolute">
            <Spinner />
          </div>
        )}
        <Image
          height={thumbnail_height}
          width={thumbnail_width}
          src={thumbnail}
          alt={title}
          onLoadingComplete={() => setIsLoading(false)}
        />
        <div className="max-w-3xl">
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on movie slugs
  const paths = movieJson.map((movie) => ({
    params: { slug: movie.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as MoviePageParams;
  const movie = movieJson.find((movie) => movie.slug === slug);

  // Pass collection data to the page via props
  return { props: { movie } };
};

// HomeScreen.jsx
import React, { useState } from 'react';
import NavBar from '../../components/NavBar.jsx';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import useGetTrendingContent from '../../hooks/useGetTrendingContent.jsx';
import {
  MOVIE_CATEGORIES,
  TV_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
} from '../../utils/constant.js';
import { useContentStore } from '../../store/content.js';
import MovieSlider from '../../components/MovieSlider.jsx';

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  const [imgLoading, setImgLoading] = useState(true);

  if (!trendingContent)
    return (
      <div className='h-screen text-white relative bg-black'>
        <NavBar />
        {/* shimmer effect */}
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      </div>
    );

  return (
    <>
      <div className='relative h-screen text-white bg-black'>
        <NavBar />

        {imgLoading && (
          <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
        )}

        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt='Hero'
          className='absolute top-0 w-full h-full object-cover -z-50'
          onLoad={() => setImgLoading(false)}
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-40' />

        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16'>
          <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />

          <div className='max-w-2xl'>
            <h1 className='mt-10 text-6xl font-bold'>
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className='mt-5 text-left'>
              {trendingContent?.release_date?.split('-')[0] ||
                trendingContent?.first_air_date?.split('-')[0]}{' '}
              | {trendingContent?.adult ? '18+' : 'PG-13'}
            </p>
            <p className='mt-10 text-left'>
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + ' ...'
                : trendingContent?.overview}
            </p>
          </div>

          <div className='flex mt-8'>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded flex items-center mr-4'
            >
              <Play className='w-6 h-6 mr-2' />
              Play
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className='bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded flex items-center'
            >
              <Info className='w-6 h-6 mr-2' />
              More Info
            </Link>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-10 bg-black py-10'>
        {contentType === 'movie'
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;

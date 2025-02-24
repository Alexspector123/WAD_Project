import React, { useEffect, useState, useRef } from 'react';
import { useContentStore } from '../store/content'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constant';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);

    const slideRef = useRef(null);

    const formattedCategoryName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const formattedContentType = contentType === 'movie' ? 'Movies' : 'TV Shows';

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/version1/${contentType}/${category}`)
            setContent(res.data.content);
        }

        getContent();
    }, [contentType, category]);

    const scrollLeft = () => {
        if(slideRef.current) {
            slideRef.current.scrollBy({left: -sliderRef.current.offsetWidth, behavior: 'smooth'});
        }
    };
    const scrollRight = () => {
        slideRef.current.scrollBy({left: sliderRef.current.offsetWidth, behavior: 'smooth'});
    };

    return (
        <div className='bg-[black] text-[white] relative px-[5px] motion-reduce: px-[20px]' onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}>
            <h2 className='mb-[2] text-[2x1] font-bold'>
                { formattedCategoryName } { formattedContentType }
            </h2>

            <div className='flex space-x-[40px] overflow-x-scroll scrollbar-hide' ref={sliderRef}>
                {content.map((item) => (
                    <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
                        <div className='rounded-lg overflow-hidden'> 
                            <img src={SMALL_IMG_BASE_URL + item.backdrop_path} alt='Movie image' 
                                className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                            />
                        </div>
                        <p className='mt-[2px] text-center text-[white]'>
                            {item.title || item.name}
                        </p>
                    </Link>
                ))}
            </div>

            {showArrows && (
                <>
                    <button className='absolute top-[190px] -translate-y-[1/2] left-[5] motion-reduce:left-[24] flex items-center justify-center size-[12] rounded-full bg-[black] bg-opacity-[50] hover:bg-opacity-[75] text-[white] z-[10]'
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button className='absolute top-[190px] -translate-y-[1/2] right-[5] motion-reduce:right-[24] flex items-center justify-center size-[12] rounded-full bg-[black] bg-opacity-[50] hover:bg-opacity-[75] text-[white] z-[10]'
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
  );
};

export default MovieSlider;
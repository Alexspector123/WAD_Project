import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useContentStore } from './store/content';
import NavBar from './components/NavBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from './utils/constant.js';
import { formatReleaseDate } from './utils/dateFunction.js';
import WatchPageSkeleton from './components/skeletons/WatchPageSkeleton.jsx';

const WatchPage = () => {
    const { id } = useParams();
    const [trailers, setTrailers] = useState([]);
    const [currentTrailersIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [similarContent, setSimilarContent] = useState([]);
    const [content, setContent] = useState({});
    const { contentType } = useContentStore();
    const slideRef = useRef(null);

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/version1/${contentType}/${id}/trailers`);
                setTrailers(res.data.trailers);
            } catch (error) {
                if(error.message.includes('404')) {
                    setTrailers([]);
                }
            }
        };

        getTrailers();
    }, [contentType, id]);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`/api/version1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.similar);
            } catch (error) {
                if(error.message.includes('404')) {
                    setSimilarContent([]);
                }
            }
        };

        getSimilarContent();
    }, [contentType, id]);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axios.get(`/api/version1/${contentType}/${id}/details`);
                setContent(res.data.content) ;
            } catch (error) {
                if(error.message.includes('404')) {
                    setContent(null);
                }
            } finally {
                setLoading(false);
            }
        };

        getContentDetails();
    }, [contentType, id]);

    const handleNext = () => {
        if(currentTrailersIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailersIdx + 1);
    };

    const handlePrev = () => {
        if(currentTrailersIdx > 0) setCurrentTrailerIdx(currentTrailersIdx - 1);
    };

    const scrollLeft = () => {
        if(slideRef.current) {
            slideRef.current.scrollBy({left: -slideRef.current.offsetWidth, behavior: 'smooth'});
        }
    };

    const scrollRight = () => {
        slideRef.current.scrollBy({left: slideRef.current.offsetWidth, behavior: 'smooth'});
    };

    if(loading) 
        return (
            <div className='min-h-screen bg-[black] p-[10]'>
                <WatchPageSkeleton />
            </div>
        );
        if(!content) {
            return (
                <div className='bg-[black] text-[white] h-screen'>
                    <div className='max-w-[6x1] mx-auto'>
                        <NavBar/>
                        <div className='text-center mx-auto px-[4] py-[8] h-full mt-[40]'>
                            <h2 className='text-[2x1] size-max:text-[5x1] font-bold text-balance'>Content not found</h2>
                        </div>
                    </div>
                </div>
            );
        }

    return (
        <div className='bg-[black] min-h-screen text-[white]'>
            <div className='mx-auto container px-[4] py-[8] h-full'>
                <NavBar/>
                {trailers.length > 0 && (<div className='flex justify-between items-center mb-[4]'>
                    <button className={`
                    bg-[gray]/70 hover:bg-[gray] text-[white] py-[2] px-[4] rounded ${currentTrailersIdx === 0 ? 'opacity-50 cursor-not-allowed' : ""}}
                    `}
                    disabled={currentTrailersIdx === 0}
                    onClick={handlePrev}
                    >
                        <ChevronLeft size={24}/>
                    </button>

                    <button className={`
                    bg-[gray]/70 hover:bg-[gray] text-[white] py-[2] px-[4] rounded ${currentTrailersIdx === (trailers.length - 1) ? 'opacity-50 cursor-not-allowed' : ""}}
                    `}
                    disabled={currentTrailersIdx === trailers.length - 1}
                    onClick={handleNext}
                    >
                        <ChevronRight size={24}/>
                    </button>
                </div>
            )}

            <div className='aspect-video mb-[8] p-[2] size-min:px-[10] motion-reduce:px-[32]'>
                {trailers.length > 0 && (
                    <ReactPlayer 
                    controls={true}
                    width={"100%"}
                    height={"70vh"}
                    className="mx-auto overflow-hidden rounded-lg"
                    url={`https://www.youtube.com/watch?v=${trailers[currentTrailersIdx].key}`}
                    />
                )}

                {trailers.length === 0 && (
                    <h2 className='text-[x1] text-center mt-[5]'>
                        No trailers available for {" "}
                        <span className='font-bold text-[red]'>{content?.title || content?.name}</span> 
                    </h2>
                )}
            </div>

            {/* Movie details */}
            <div className='flex flex-col motion-reduce:flex-row items-center justify-between gap-[20] max-w-[6x1] mx-auto'>
                <div className='mb-[4] motion-reduce:mb-[0]'>
                    <h2 className='text-[5x1] font-bold text-balance'>
                        {content?.title || content?.name}
                    </h2>
                    <p className='mt-[2] text-lg'>
                        {formatReleaseDate(content?.release_date || content?.first_air_date)} | {" "}
                        {content?.adult ? (<span className='text-[red]'>18+</span>) : (<span className='text-[green]'>PG-13</span>)}{" "}
                    </p>
                    <p className='mt-[4] text-lg'>{content?.overview}</p>
                </div>
                <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path} alt='Poster image' className='max-h-[600px] rounded-md'/>
            </div>

            {/* Similar movies */}
            {similarContent.length > 0 && (
                <div className='mt-[12] max-w-[5x1] mx-auto relative'>
                    <h3 className='text-[3x1] font-bold mb-[4]'>
                        Similar Movies/ Tv Shows
                    </h3>

                    <div className='flex overflow-x-scroll scroll-hide gap-[4] pb-[4] group' ref={slideRef}>
                        {similarContent.map((content) => {
                            if(content?.poster_path === null) return null;
                            return (
                                <Link key={content.id} to={`/watch/${content.id}`}
                                className='w-[52] flex-none'>
                                    <img src={SMALL_IMG_BASE_URL + content?.poster_path} alt='Poster path' className='w-full h-auto rounded-md'/>
                                    <h4 className='mt-[2] text-lg font-semibold'>{content?.title || content?.name}</h4>
                                </Link>
                            );
                        })}

                        <ChevronRight className='absolute top-[1/2] -translate-y-[1/2] right-[2] w-[8] h-[8] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-[red] text-[white] rounded-full'
                        onClick={scrollRight} />
                        <ChevronLeft className='absolute top-[1/2] -translate-y-[1/2] left-[2] w-[8] h-[8] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-[red] text-[white] rounded-full'
                        onClick={scrollLeft} />
                    </div>
                </div>
            )}
            </div>
        </div>
    )
};

export default WatchPage;
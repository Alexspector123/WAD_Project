import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovies(req, res) {
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({success: true, content: randomMovie});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export async function getMovieTrailers(req, res) {
    const movieId = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`);
        res.json({success: true, trailers: data.results});
    } catch (error) {
        if(error.message.includes('404')) {
            res.status(404).send(null);
        }

        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export async function getMovieDetails(req, res) {
    const movieId = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`);
        res.status(200).json({success: true, content: data});
    } catch (error) {
        if(error.message.includes('404')) {
            res.status(404).send(null);
        }

        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export async function getSimilarMovies(req, res) {
    const movieId = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`);
        res.status(200).json({success: true, similar: data.results});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export async function getMovieByCatgory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}
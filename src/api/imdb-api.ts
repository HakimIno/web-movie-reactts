import axios, { AxiosResponse } from "axios";

import { MediaType } from "../types";
import { Film, Genre } from "../interfaces";
import { formatResult } from "../utils";

const axiosClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})


axiosClient.interceptors.request.use((config) => {
    return {
        ...config,

        params: {
            ...config.params,
            api_key: "f71816bba0bed4aed8c51bb986bd1c69",
        },
    }
})

export const getTrendings = async (mediaType: MediaType): Promise<Film[]> => {
    try {
        const { data } = await axiosClient.get<
            any,
            AxiosResponse<{
                results: unknown[]
            }>
        >(`/trending/${mediaType}/week`)

        return data.results.map((val) => formatResult(val, mediaType))
    } catch (error) {
        console.error(error)
    }

    return []
}

export const getInTheaters = async (): Promise<Film[]> => {
    try {
        const { data } = await axiosClient.get<
            any,
            AxiosResponse<{
                results: unknown[]
            }>
        >(`/movie/now_playing`)

        return data.results.map((val) => formatResult(val, 'movie'))
    } catch (error) {
        console.error(error)
    }

    return []
}

export const getPopulars = async (
    mediaType: MediaType,
    page = 1
): Promise<Film[]> => {
    try {
        const { data } = await axiosClient.get<
            any,
            AxiosResponse<{
                results: unknown[]
            }>
        >(`/${mediaType}/popular`, {
            params: {
                page,
            },
        })

        return data.results.map((val) => formatResult(val, mediaType))
    } catch (error) {
        console.error(error)
    }

    return []
}

export const getTopRated = async (
    mediaType: MediaType,
    page = 1
): Promise<{
    films: Film[],
    totalPages: number
}> => {
    try {
        const { data } = await axiosClient.get<
            any,
            AxiosResponse<{
                results: unknown[],
                total_pages: number
            }>
        >(`/${mediaType}/top_rated`, {
            params: {
                page,
            },
        })

        return {
            films: data.results.map((val) => formatResult(val, mediaType)),
            totalPages: data.total_pages,
        }
    } catch (error) {
        console.error(error)
    }

    return {
        films: [],
        totalPages: 0,
    }
}


export const search = async (
    query: string,
    page = 1
): Promise<{
    totalPages: number
    totalResults: number
    films: Film[]
}> => {
    try {
        const { data } = await axiosClient.get<
            any,
            AxiosResponse<{
                total_pages: number,
                total_results: number
                results: unknown[]
            }>
        >(`/search/multi`, {
            params: {
                query,
                page,
            },
        })

        return {
            totalPages: data.total_pages,
            totalResults: data.total_results,
            films: data.results.map((val) => formatResult(val)),
        }
    } catch (error) {
        console.error(error)
    }

    return {
        totalPages: 0,
        totalResults: 0,
        films: [],
    }
}

export const getGenres = async (mediaType: MediaType): Promise<Genre[]> => {
    try {
        const { data } = await axiosClient.get<
            any,
            AxiosResponse<{
                genres: unknown[]
            }>
        >(`/genre/${mediaType}/list`)

        return data.genres as Genre[]
    } catch (error) {
        console.error(error)
    }

    return []
}

export const getDetail = async (
    mediaType: MediaType,
    id: number
): Promise<null | Film> => {
    try {
        const { data } = await axiosClient.get(`/${mediaType}/${id}`)

        return formatResult(data, mediaType)
    } catch (error) {
        console.error(error)
    }

    return null
}
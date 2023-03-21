import { ReactNode } from "react";
import { MediaType } from "./types";

export interface CustomComponentProps {
    children?: ReactNode;
    className?: string
}

interface Seasons {
    id: number
}

export interface Film {
    id: number;
    title: string;
    mediaType: MediaType;
    description: string;
    posterPath: string;
    coverPath: string;
    genreIds: number[];
    seasons: Seasons[]
}

export interface Cast {
    id: number;
    name: string;
    characterName: string;
}

export interface Trailer {
    id: number;
    key: string;
   
}
import React from "react"

export type Children = {
    children: React.ReactNode
}

export interface SearchData{
    data: (object | undefined) [],
    isloading: boolean,
    iserror: boolean,
    issucess: boolean,
    message:  (string | null),
    value:( string | null)
}

export interface SearchType {
    id: number,
    title: string,
    icon: React.ReactElement
}

export interface Src {
    original: string,
    large2x: string,
    large: string,
    medium: string,
    small: string,
    portrait: string,
    landscape: string,
    tiny: string
}

export interface ImageData{
    id: number,
    width: number,
    height: number,
    url: string,
    photographer: string,
    photographer_url: string,
    photographer_id: number,
    avg_color: string,
    src: Src,
    liked: boolean,
    alt: string
}

export interface ImageReponse{
    total_results: number,
    page: number,
    per_page: number,
    photos: ImageData[],
    next_page: string
}

export type SearchTypesList = SearchType[];
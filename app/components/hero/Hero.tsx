"use client";
import React, { useEffect, useState } from "react";
import "./Hero.css";
import Image from "next/image";
import { SearchType, SearchTypesList } from "@/app/types";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiVideo } from "@react-icons/all-files/fi/FiVideo";
import Container from "@/app/utils/Container";
import { getTrendings } from "@/app/lib/getTrendings";
import { useDispatch } from "react-redux";

import { searchImages } from "@/app/redux/features/searchSlice";

const Hero = () => {
  const searchTypes: SearchTypesList = [
    {
      id: 0,
      title: "images",
      icon: <FiImage />,
    },
    {
      id: 1,
      title: "videos",
      icon: <FiVideo />,
    },
  ];
  const [searchType, setSearchType] = useState<string>("images");
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(searchImages({searchValue, searchType}))
  }, [searchType])

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    dispatch(searchImages({searchValue, searchType}))
  }

  useEffect(() => {
    dispatch(searchImages({searchValue, searchType}))
}, [])


  return (
    <Container>
      <section className="hero">
        <Image
          className="hero__image"
          src="https://images.pexels.com/photos/18597677/pexels-photo-18597677.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400&dpr=1"
          width={2000}
          height={500}
          alt="Hero banner"
        />
        <div className="hero__content">
          <h2>
            The best free stock photos, royalty free images & videos shared by
            creators.
          </h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="hero__search">
              <div className="search__type">
                <span>{searchType}</span>
                <div className="search-type-wrapper"></div>
                <ul className="search__type-menu">
                  {searchTypes.map((searchTypeItem: SearchType) => (
                    <li
                      onClick={() => setSearchType(searchTypeItem.title)}
                      key={searchTypeItem.id}
                    >
                      {" "}
                      {searchTypeItem.icon} {searchTypeItem.title}
                    </li>
                  ))}
                </ul>
              </div>
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="hero__input"
                placeholder="Search free photos"
              />
              <FiSearch />
            </div>
          </form>
        </div>
      </section>
    </Container>
  );
};

export default Hero;

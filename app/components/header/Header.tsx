"use client";
import { useDispatch } from 'react-redux';
import Nav from "../nav/Nav";
import Hero from "../hero/Hero";

const Header = () => {
    const dispatch = useDispatch();

  return (
    <div>
          <Nav/>
        <Hero/>
    </div>
  )
}

export default Header
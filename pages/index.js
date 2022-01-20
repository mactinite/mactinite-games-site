import { useEffect, useState, useRef } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Head from 'next/head';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card } from "../components/Card/Card";
import SanityBlockContent from "@sanity/block-content-to-react";
import CartridgeSystem from "../components/CartridgeSystem";
const sanityClient = require('@sanity/client');

export async function getStaticProps(context) {
  const client = sanityClient({
    projectId: 'ef83jjfc',
    dataset: 'production',
    apiVersion: '2019-01-29', // use current UTC date - see "specifying API version"!
    useCdn: true, // `false` if you want to ensure fresh data
  })
  //Query for all games so we can list them in the carousel
  const query = `*[_type == "game"]{..., "thumbnail": thumbnail.asset -> url  }`;
  const games = await client.fetch(query);
  return {
    props: { games: games }, // will be passed to the page component as props
  }
}

const Home = ({ games = [] }) => {


  return (
    <>
      <Head>
        <title>Mactinite Games</title>
        <meta name='description' content="Mactinite Games is a solo indie game developer based in Seattle, US." />
      </Head>

      <div className="container mx-auto" style={{height: "900px"}}>
        <h1 className="text-left">Projects</h1>
        <CartridgeSystem games={games} />
      </div >


    </>
  )
};

export default Home;

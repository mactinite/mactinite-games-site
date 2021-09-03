import { useEffect, useState, useRef } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Head from 'next/head';



const Home = () => {
  return (
    <>
      <Head>
        <title>Mactinite Games - Gunship Coming Soon!</title>
        <meta name='description' content="Mactinite Games is a solo indie game developer based in Seattle, US." />
      </Head>
      <div className="feature space-bg">
        <div className="container mx-auto text-center" >
          <h1>COMING SOON</h1>
          <figure>
            <img src="/GunshipLogo_Transparent.png" alt="Gunship: Zero G combat" style={{ height: "100%", maxWidth: "100%", marginBottom: "50px" }} />
          </figure>
          <h2 className="font-bold">ZERO-G COMBAT &amp; MANUEVERING CHALLENGES</h2>
        </div >
      </div>

      <div className="feature">
        <div className="asteroid-ground"></div>
        <div className="background-dark">
          <div className="container mx-auto text-center pt-8">
            <p className="text-lg pb-8">Gunship is an intense action adventure game with a unique blend of physics based movement and top-down shooter mechanics.</p>
            <a href="https://mactinite.itch.io/gunship" className="button ">Try out the demo on itch.io</a>
            <h2 className="text-2xl py-8">Fly</h2>
            <p>
              Avoid lasers, dodge missiles but be careful not to crash!
            </p>
            <h2 className="text-2xl py-8">Fight</h2>
            <p>
              With a large assortment of Weapons and a wide array of "CPU Chips" you can tweak the combat to your style.
            </p>
            <h2 className="text-2xl py-8">Explore</h2>
            <p>
              Set in a massive abandoned alien space station, explore and find secrets that will aid you in your mission, and uncover the truth of The Station.
            </p>
            <h2 className="text-2xl py-8">Ready to fly?</h2>
            <a href="https://mactinite.itch.io/gunship" className="button">Try out the demo on itch.io</a>
            <br />
            <br />
          </div >
        </div>
      </div>
    </>
  )
};

export default Home;

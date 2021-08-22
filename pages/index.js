import { useEffect, useState, useRef } from "react";
import { HeroHeader } from '../components/HeroHeader';
const Home = () => {


  return (
    <>
      <HeroHeader scrollAction={150}>
        <img src="/mactinite_games.png" alt="Mactinite Games" style={{ height: "100%" }} />
      </HeroHeader>
      <div className="feature space-bg">
        <div className="container center" >
        <h1>COMING SOON</h1>
          <img src="/GunshipLogo_Transparent.png" alt="Gunship: Zero G combat" style={{ height: "100%", maxWidth: "100%", marginBottom: "100px" }} />
        </div >

      </div>


      <div className="feature">
        <div className="background-dark">
          <div className="container center">
            <br />
            <br />
            <p>Gunship is an intense action adventure game with a unique blend of physics based movement and top-down shooter mechanics.</p>
            <br/>
            <br />
            <br/>
            <a href="https://mactinite.itch.io/gunship" className="button">Try out the demo today!</a>
            <h1>Fly</h1>
            <p>
              Avoid lasers, dodge missiles but be careful not to crash!
            </p>
            <h1>Fight</h1>
            <p>
              With a large assortment of Weapons and a wide array of "CPU Chips" you can tweak the combat to your style.
            </p>
            <h1>Explore</h1>
            <p>
              Set in a massive abandoned alien space station, explore and find secrets that will aid you in your mission, and uncover the truth of The Station.
            </p>
            <br />
            <br />
            <br />
          </div >
        </div>
        <footer>
          <div className="content">
            <p>Blah Blah</p>
          </div>
        </footer>
      </div>
    </>
  )
};

export default Home;

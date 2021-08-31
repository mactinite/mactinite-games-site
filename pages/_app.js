import '../styles/reset.css';
import '../styles/main.css';
import { HeroHeader } from '../components/HeroHeader';
import Link from 'next/link';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  const now = new Date(Date.now());
  const year = now.getFullYear();
  return (
    <div className="flex-wrapper">
      <HeroHeader maxHeight={200} minHeight={40}>
        {(scrollValue) => {
          return (
            <>
              <figure className="logo" >
                <Link href="/">
                  <img src="/mactinite_games.png" alt="Mactinite Games" height="100px" />
                </Link>
              </figure>

              <nav className="header-nav" style={{ fontSize: lerp(18, 12, scrollValue) + "px" }}>
                <ol>
                  <li><Link href="/about"><a>About</a></Link></li>
                  <li><Link href="/blog"><a>Blog</a></Link></li>
                  <li><Link href="/games"><a>Games</a></Link></li>
                </ol>
              </nav>
            </>
          )
        }}

      </HeroHeader>
      <Component {...pageProps} />
      <footer>
        <div className="content">
          <p className="copy">&copy; MACTINITE GAMES LLC. {year}</p>
        </div>
      </footer>
    </div >
  );
}


const lerp = (a, b, t) => {
  Math.clamp
  return a + (b - a) * t;
}
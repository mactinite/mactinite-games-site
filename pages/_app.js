import '../styles/main.css';
import { HeroHeader } from '../components/HeroHeader';
import Link from 'next/link';
import 'highlight.js/styles/monokai.css';
import Image from 'next/image';
import logo from '../public/mactinite_games.png';
import NavButton from '../components/NavButton';
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  const now = new Date(Date.now());
  const year = now.getFullYear();
  return (
    <div className="flex-wrapper">
      <HeroHeader maxHeight={200} minHeight={60}>
        {(scrollValue) => {
          return (
            <nav className="flex flex-row max-h-full h-full space-x-8">
              <div className="flex flex-row max-h-full h-full">
                <Link href="/" >
                  <img src="/mactinite_games.png" alt="Mactinite Games Logo" className="my-auto max-h-full" layout='fixed' />
                </Link>
              </div>
              <div className="flex space-x-4 my-auto">
                <NavButton href="/about">About</NavButton>
                <NavButton href="/blog">Blog</NavButton>
                <NavButton href="/games">Games</NavButton>
              </div>
            </nav>
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
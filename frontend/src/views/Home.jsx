import "../App.css";
import Header from "../components/Header.jsx";
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const boatCount = 999;
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-white font-sans text-black">
        <Header/>
      <main>
        {/* Hero */}
        <section className="flex h-[528px] flex-col items-center justify-center gap-[62px] px-4 text-center max-md:h-auto max-md:gap-10 max-md:py-20">
          <h2 className="text-[clamp(28px,4vw,52px)] font-normal tracking-[0.01em]">
            Unajmite jedno od {boatCount} plovila danas!
          </h2>

          <button
            onClick={() => navigate('/map')}
            className="h-[67px] w-[168px] cursor-pointer rounded-[18px] border-[3px] border-gold bg-surface text-xl text-black transition-colors hover:bg-[#e2e2e2] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-aqua"
          >
            Otvori kartu
          </button>
        </section>

        {/* Boat cards (placeholders) */}
        <section
          aria-label="Plovila"
          className="mx-auto grid max-w-[1064px] grid-cols-1 gap-5 px-4 md:grid-cols-3 md:gap-[59px]"
        >
          {[0, 1, 2].map((i) => (
            <article
              key={i}
              className="h-40 rounded-[20px] bg-surface md:h-[130px] md:rounded-b-none"
            />
          ))}
        </section>
      </main>
    </div>
  );
}

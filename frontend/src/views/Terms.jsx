import Header from "../components/Header";
import Footer from "../components/Footer";

function Terms() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-800">
        <Header/>
        <title>Uvjeti korištenja | Charterly</title>

      <main className="mx-auto w-full max-w-3xl grow px-4 py-10">
        <h1 className="mb-6 border-b border-gray-200 pb-4 font-title text-3xl text-navy">Uvjeti korištenja - Charterly</h1>

        <section className="flex flex-col gap-2 leading-relaxed">
        <h3 className="mt-6 font-title text-lg text-navy">Prihvaćanje uvjeta</h3>
        <p className="text-gray-700">Korištenjem stranice charterly.site prihvaćate ove uvjete.</p>

        <h3 className="mt-6 font-title text-lg text-navy">Račun</h3>
        <p className="text-gray-700">Prijava se vrši putem Google računa. Odgovorni ste za sigurnost
        svog Google računa i za sve radnje izvršene pod vašim računom.</p>

        <h3 className="mt-6 font-title text-lg text-navy">Rezervacije</h3>
        <p className="text-gray-700">Rezervacije koje napravite putem stranice obvezuju vas prema
        uvjetima pojedine usluge.</p>

        <h3 className="mt-6 font-title text-lg text-navy">Zabranjena upotreba</h3>
        <p className="text-gray-700">Zabranjeno je zlouporabljivati stranicu, pokušavati neovlašten
        pristup te unositi lažne ili tuđe podatke.</p>

        <h3 className="mt-6 font-title text-lg text-navy">Odgovornost</h3>
        <p className="text-gray-700">Stranica se pruža "kakva jest". Ne odgovaramo za štetu nastalu
        prekidom rada ili pogreškama u radu stranice u mjeri dopuštenoj zakonom.</p>

        <h3 className="mt-6 font-title text-lg text-navy">Prekid računa</h3>
        <p className="text-gray-700">Zadržavamo pravo da onemogućimo račun koji krši ove uvjete.</p>

        <h3 className="mt-6 font-title text-lg text-navy">Izmjene</h3>
        <p className="text-gray-700">Uvjete možemo mijenjati. Objavom na ovoj stranici izmjene stupaju na snagu.</p>
        </section>
      </main>

        <Footer/>
    </div>
  );
}

export default Terms;

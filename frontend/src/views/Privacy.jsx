import Header from "../components/Header";
import Footer from "../components/Footer";

function Privacy() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-800">
        <Header/>
        <title>Pravila privatnosti | Charterly</title>

      <main className="mx-auto w-full max-w-3xl grow px-4 py-10">
        <h1 className="mb-6 border-b border-gray-200 pb-4 font-title text-3xl text-navy">Politika privatnosti - Charterly</h1>

        <section className="flex flex-col gap-2 leading-relaxed">
            <h3 className="mt-6 font-title text-lg text-navy">Koje podatke prikupljamo</h3>
            <p className="text-gray-700">Pri prijavi putem Googlea primamo vaše ime, prezime, adresu e-pošte
            i jedinstveni Google identifikator (sub). Ne primamo vašu lozinku.</p>

            <h3 className="mt-6 font-title text-lg text-navy">Zašto ih koristimo</h3>
            <p className="text-gray-700">Podatke koristimo isključivo za izradu i prepoznavanje vašeg računa
            te za upravljanje vašim rezervacijama.</p>

            <h3 className="mt-6 font-title text-lg text-navy">Kolačići</h3>
            <p className="text-gray-700">Koristimo jedan kolačić (ACCESS_TOKEN) za održavanje prijave.
            Kolačić je potreban za rad stranice.</p>

            <h3 className="mt-6 font-title text-lg text-navy">Dijeljenje podataka</h3>
            <p className="text-gray-700">Vaše podatke ne prodajemo niti dijelimo s trećim stranama.</p>

            <h3 className="mt-6 font-title text-lg text-navy">Pohrana i brisanje</h3>
            <p className="text-gray-700">Podatke čuvamo dok imate račun.</p>
        </section>
      </main>

        <Footer/>
    </div>
  );
}

export default Privacy;

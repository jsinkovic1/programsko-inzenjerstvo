import Header from "../components/Header";

function Privacy() {
  return ( 
    <div>
        <Header/>
      <h1>Politika privatnosti - Charter</h1>
        <p>
            <h3>Koje podatke prikupljamo</h3>
            <p>Pri prijavi putem Googlea primamo vaše ime, prezime, adresu e-pošte
            i jedinstveni Google identifikator (sub). Ne primamo vašu lozinku.</p>

            <h3>Zašto ih koristimo</h3>
            <p>Podatke koristimo isključivo za izradu i prepoznavanje vašeg računa
            te za upravljanje vašim rezervacijama.</p>

            <h3>Kolačići</h3>
            <p>Koristimo jedan kolačić (ACCESS_TOKEN) za održavanje prijave.
            Kolačić je potreban za rad stranice.</p>

            <h3>Dijeljenje podataka</h3>
            <p>Vaše podatke ne prodajemo niti dijelimo s trećim stranama.</p>

            <h3>Pohrana i brisanje</h3>
            <p>Podatke čuvamo dok imate račun.</p>
        </p>
    </div>
  );
}

export default Privacy;

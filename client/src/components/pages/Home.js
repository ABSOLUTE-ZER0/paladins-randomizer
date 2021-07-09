import React, { useEffect } from "react";

import Header from "../layout/Header";
import ChampionTable from "../layout/ChampionTable";

const Home = () => {
  useEffect(() => {
    const scroll = document.querySelector(".scroll");

    window.addEventListener("scroll", () => {
      scroll.classList.toggle("active", window.scrollY > 200);
    });

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    scroll.addEventListener("click", () => {
      scrollToTop();
    });
  }, []);

  return (
    <div>
      <Header page='home' />

      <div className='container'>
        <section id='welcome' className='home__welcome'>
          <h1>
            Welcome to Paladins Randomizer{" "}
            <p>
              Generate a full randomized champion along with a random TALENT AND
              CARDS! All in a single click!
            </p>
          </h1>

          <button className={"home__welcome-button"}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <p>Get Started</p>
          </button>
        </section>
        <section id='guide' className='home__guide'>
          <h1>GUIDE</h1>
          <p>
            Everything is fully automated and simple, but its better to write
            the guide anyways. So here you go
          </p>
          <p>
            Click on the generate button to get your random champion along with
            the talent and set of cards and respective points allocated to that
            card!
          </p>
          <p>
            Repeates is removed by default. You can add them manually if you
            like.
          </p>
          <p>
            If you want to remove any champion from the list select the champion
            from the Champions List and click on "Remove"
          </p>
          <p>
            Simillarly is you want to add any champion to the list, select that
            respective champion from the Ignore List and click on "Add"
          </p>
          <p>Thats it, have fun!</p>
        </section>
        <section id='champions'>
          <ChampionTable />
        </section>
        <div className='scroll'></div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

import { getChampions, randomize } from "../../actions/homeActions";

const ChampionTable = ({ getChampions, randomize, home }) => {
  const [champ, setChamp] = useState(null);
  const [ignore, setIgnore] = useState([]);
  const [random, setRandom] = useState(null);

  const clickRandomize = async () => {
    if (ignore.length >= home.champions.length) {
      return;
    } else {
      let temp = [];
      ignore.forEach((element) => {
        temp.push(element.id);
      });
      let res = await randomize(temp);
      setRandom(res);
      removeChampion(res.champion);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getChampions();
      setChamp(JSON.parse(localStorage.getItem("championList")));
      setIgnore(JSON.parse(localStorage.getItem("ignoreList")));
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeChampion = (champion) => {
    localStorage.setItem("ignoreList", JSON.stringify([...ignore, champion]));
    setIgnore([...ignore, champion]);

    let test = champ.filter((item) => !champion.id.includes(item.id));

    localStorage.setItem("championList", JSON.stringify([...test]));
    setChamp([...test]);
  };

  const addChampion = (champion) => {
    localStorage.setItem("championList", JSON.stringify([...champ, champion]));
    setChamp([...champ, champion]);

    let test = ignore.filter((item) => !champion.id.includes(item.id));

    localStorage.setItem("ignoreList", JSON.stringify([...test]));
    setIgnore([...test]);
  };

  
  const reset = () => {
    localStorage.removeItem("championList");
    setChamp([]);
    localStorage.removeItem("ignoreList");
    setIgnore([]);

    window.location.reload();
  };

  return (
    <div className='championTable-maindiv'>
      <h1>CHAMPIONS</h1>
      <div className='championTable'>
      <button onClick={reset} className="btn btn-danger championTable__resetbtn">Reset</button>
        <Table striped bordered hover responsive>
          <td className='title' colSpan='4'>
            Champion List
          </td>
          <tbody>
            {champ &&
              champ.map((champion, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{champion.name}</td>
                  <td>{champion.role}</td>
                  <td>
                    <button
                      style={{ width: "100%" }}
                      className='btn btn-danger'
                      onClick={() => removeChampion(champion)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Table striped bordered hover responsive>
          <td colSpan='4' className='title'>
            Ignore List
          </td>
          <tbody>
            {ignore &&
              ignore.map((champion, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{champion.name}</td>
                  <td>{champion.role}</td>
                  <td>
                    <button
                      style={{ width: "100%" }}
                      className='btn btn-success'
                      onClick={() => addChampion(champion)}>
                      Add
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <div id='randomizer' className='randomizer'>
        <h1>RANDOMIZER</h1>
        <button onClick={clickRandomize} className={"randomizer-button"}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <p>Randomize</p>
        </button>

        {random && (
          <div className='randomizer__result'>
            <div>
              <div className='randomizer__result-champ'>
                <h2 className='titleStyle3'>Champion</h2>
                <div>
                  <h3>{random.champion.name}</h3>
                  <img src={random.champion.img} alt='champ-img'></img>
                  <h4>{random.champion.title}</h4>
                </div>
              </div>
              <div className='randomizer__result-talent'>
                <h2 className='titleStyle3'>Talent</h2>
                <div>
                  <h3>{random.talent.name}</h3>
                  <img src={random.talent.img} alt='talent-img'></img>
                  <h4>{random.talent.desc}</h4>
                </div>
              </div>
            </div>
            <div className='randomizer__result-cards'>
              <h2 className='titleStyle3'>Cards</h2>

              <div>
                {random.cards.map((card, index) => (
                  <div key={index}>
                    <h3>{card.card.name}</h3>
                    <p>({card.count} points)</p>
                    <img src={card.card.img} alt='talent-img'></img>
                    <h4>{card.card.desc}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps, { getChampions, randomize })(
  ChampionTable
);

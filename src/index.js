import React, { useEffect, useMemo } from "react";
import { render } from "react-dom";
import User from './components/user';
import { useState } from "react";
import { fetchGame, endGame } from "./services/api";

import "./index.scss";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [match, setMatch] = useState({});
  const [winner, setWinner] = useState(null);
  const [currentDice, setCurrentDice] = useState(0);
  const [playingPlayerIndex, setPlayingPlayerIndex] = useState(0);
  const rollDice = () => setCurrentDice(Math.floor(Math.random() * 6) + 1);
  const initGame = () => {
    setWinner(null);
    setLoading(true);

    fetchGame()
      .then((response) => {
        setPlayers(response.players);
        setMatch({
          id: response.matchId,
          scoreToWin: response.scoreToWin,
        })
      })
      .finally(() => setLoading(false));
  }
  const startNewGame = () => {
    endGame(match.id, winner.id).then(initGame());
  }

  // When the current dice changes
  useEffect(() => {
    // update the score of the current player
    const playersWithScores = players.map((player, index) => {
      if (index === playingPlayerIndex) {
        const scores =
          player.scores ? player.scores.concat([currentDice]) : [currentDice];
        
        if (scores.reduce((x, y) => x + y) >= match.scoreToWin) {
          setWinner(player);
        }

        return {
          ...player, 
          scores,
        };
      }

      return player;
    })
    setPlayers(playersWithScores);

    // update the playing player index
    if (playingPlayerIndex < players.length - 1) {
      setPlayingPlayerIndex(playingPlayerIndex + 1);
    } else {
      setPlayingPlayerIndex(0);
    }
  }, [currentDice]);

  useEffect(() => {
    initGame();
  }, []);

  return (
    <>
      <header>
        <h1>Game: {match.id}</h1>
        <h2>Score to win: {match.scoreToWin}</h2>
      </header>
      {winner ? <section className="winner-badge">
        <h2> 🚀 Congratulations, {winner.name} is the Winner! 🚀</h2>
      </section> : null}
      <section className="wrapper">
        {loading ? 
        <section className="loading">
          <h2>Loading...</h2>
        </section> : players.map((player, index) => (
          <User
            key={player.id}
            name={player.name}
            image={player.imageUrl}
            scores={player.scores}
            hasNextMoveFunc={playingPlayerIndex === index ? rollDice : null}
            isWinner={winner && winner.id === player.id}
          />
        ))}
      </section>
      <footer>
        Last Rolled Dice: {currentDice}
      </footer>
      {winner ? <button className='new-game-button' onClick={startNewGame}>🔁 NEW GAME</button> : null}
    </>
  )
};

render(<App />, document.getElementById("app"));

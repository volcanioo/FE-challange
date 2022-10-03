import React, { useEffect, useMemo } from "react";
import { render } from "react-dom";
import User from './components/user';
import { useState } from "react";
import axios from 'axios';

import "./index.scss";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [matchId, setMatchId] = useState(null);
  const [scoreToWin, setScoreToWin] = useState(0);
  const [currentDice, setCurrentDice] = useState(0);
  const [playingPlayerIndex, setPlayingPlayerIndex] = useState(0);
  const rollDice = () => setCurrentDice(Math.floor(Math.random() * 6) + 1);
  const initGame = () => {
    setWinner(null);
    setPlayingPlayerIndex(0);

    axios.get("http://localhost:8000/api/game")
      .then(function (response) {
        setPlayers(response.data.players);
        setMatchId(response.data.matchId);
        setScoreToWin(response.data.scoreToWin);
      })
      .catch(function (error) {
        console.err(error);
      });
  }
  const startNewGame = () => {
    axios.post("http://localhost:8000/api/game", {
      matchId,
      winnerId: playingPlayerIndex,
    }).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.error(err);
    });

    initGame();
  }

  // When the current dice changes
  useEffect(() => {
    // update the score of the current player
    const playersWithScores = players.map((player, index) => {
      if (index === playingPlayerIndex) {
        const scores =
          player.scores ? player.scores.concat([currentDice]) : [currentDice];
        
        if (scores.reduce((x, y) => x + y) >= scoreToWin) {
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
        <h1>Game: {matchId}</h1>
        <h2>Score to win: {scoreToWin}</h2>
      </header>
      {winner ? <section className="winner-badge">
        <h2> 🚀 Congratulations, {winner.name} is the Winner! 🚀</h2>
      </section> : null}
      <section className="wrapper">
        {players.map((player, index) => (
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

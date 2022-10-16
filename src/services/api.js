import axios from "axios";

export function fetchGame() {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:8000/api/game')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function endGame(matchId, winnerId) {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:8000/api/game', {
        matchId,
        winnerId,
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { adi, can, coin, dante, key, robin } from "../assets/index";

const BOARD_SIZE = 10;
const TILE_SIZE = 50; // Size of each tile in pixels
const IMAGE_SIZE = TILE_SIZE; // Size of each image in pixels

const positionsAreEqual = (pos1, pos2) =>
  pos1.x === pos2.x && pos1.y === pos2.y;

const generateRandomPosition = (occupiedPositions = []) => {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (
    occupiedPositions.some((occupied) => positionsAreEqual(occupied, position))
  );
  return position;
};

const initialGameState = () => {
  const pacmanPosition = generateRandomPosition(); // Pacman's initial position

  const mines = [];
  for (let i = 0; i < 6; i++) {
    const newMinePosition = generateRandomPosition([pacmanPosition, ...mines]);
    mines.push(newMinePosition);
  }

  const availablePositions = [];
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      const position = { x, y };
      if (
        !positionsAreEqual(position, pacmanPosition) &&
        !mines.some((mine) => positionsAreEqual(mine, position))
      ) {
        availablePositions.push(position); // Available places for coins
      }
    }
  }

  const coins = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const [coinPosition] = availablePositions.splice(randomIndex, 1);
    coins.push(coinPosition);
  }

  return {
    pacman: pacmanPosition,
    coins,
    mines: mines.map((mine, index) => ({
      ...mine,
      type: index % 3, // 3 different mine images
      image: index % 3 == 0 ? dante : index % 3 == 1 ? adi : robin,
    })),
  };
};

function PacCanGame() {
  const [gameState, setGameState] = useState(initialGameState);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false); // Track if the game is won
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

  const movePacman = () => {
    if (direction.x === 0 && direction.y === 0) return;

    setGameState((prevState) => {
      let newX = (prevState.pacman.x + direction.x + BOARD_SIZE) % BOARD_SIZE;
      let newY = (prevState.pacman.y + direction.y + BOARD_SIZE) % BOARD_SIZE;

      if (newX === 0 && direction.x === 1) setShouldAnimate(false);
      else if (newX === BOARD_SIZE - 1 && direction.x === -1)
        setShouldAnimate(false);
      else if (newY === 0 && direction.y === 1) setShouldAnimate(false);
      else if (newY === BOARD_SIZE - 1 && direction.y === -1)
        setShouldAnimate(false);
      else setShouldAnimate(true);

      if (prevState.mines.some((mine) => mine.x === newX && mine.y === newY)) {
        setGameOver(true);
        return prevState;
      }

      const remainingCoins = prevState.coins.filter(
        (coin) => !(coin.x === newX && coin.y === newY)
      );

      if (remainingCoins.length === 0) {
        setGameWon(true);
      }

      return {
        ...prevState,
        pacman: { x: newX, y: newY },
        coins: remainingCoins,
      };
    });
  };

  useEffect(() => {
    if (!gameOver && !gameWon) {
      const interval = setInterval(movePacman, 250);
      return () => clearInterval(interval);
    }
  }, [direction, gameOver, gameWon]);

  const handleKeyPress = (e) => {
    const newDirection = { x: 0, y: 0 };
    switch (e.key) {
      case "ArrowUp":
        newDirection.x = 0;
        newDirection.y = -1;
        break;
      case "ArrowDown":
        newDirection.x = 0;
        newDirection.y = 1;
        break;
      case "ArrowLeft":
        newDirection.x = -1;
        newDirection.y = 0;
        break;
      case "ArrowRight":
        newDirection.x = 1;
        newDirection.y = 0;
        break;
      default:
        return;
    }

    if (newDirection.x === direction.x && newDirection.y === direction.y) {
      return;
    }
    setDirection(newDirection);
  };

  useEffect(() => {
    if (gameStarted) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [direction, gameStarted]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        zoom: { xs: 0.75, md: 1 },
      }}
    >
      {!gameStarted && (
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "#000",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" sx={{ color: "#fff" }}>
            Welcome to PacCan
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <img src={can} style={{ width: "45px", height: "45px" }} />
            <img src={coin} style={{ width: "45px", height: "45px" }} />
          </Box>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Eat all the momos
          </Typography>
          <Button
            variant="contained"
            onClick={() => setGameStarted(true)}
            sx={{ marginTop: "20px" }}
          >
            Start Game
          </Button>
        </Box>
      )}

      {gameStarted && (
        <Box
          sx={{
            position: "relative",
            width: BOARD_SIZE * TILE_SIZE,
            height: BOARD_SIZE * TILE_SIZE,
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "lightgrey",
            boxSizing: "border-box",
          }}
        >
          {/* Pacman */}
          <Box
            sx={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: gameState.pacman.y * IMAGE_SIZE,
              left: gameState.pacman.x * IMAGE_SIZE,
              transition: shouldAnimate
                ? "top 0.25s linear, left 0.25s linear"
                : "none",
              boxSizing: "border-box",
            }}
          >
            <img src={can} style={{ width: "45px", height: "45px" }} />
          </Box>

          {/* Render Coins */}
          {gameState.coins.map((coinVal, index) => (
            <Box
              key={index}
              sx={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: coinVal.y * IMAGE_SIZE,
                left: coinVal.x * IMAGE_SIZE,
              }}
            >
              <img src={coin} style={{ width: "45px", height: "45px" }} />
            </Box>
          ))}

          {/* Render Mines */}
          {gameState.mines.map((mine, index) => (
            <Box
              key={index}
              sx={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: mine.y * IMAGE_SIZE,
                left: mine.x * IMAGE_SIZE,
              }}
            >
              <img src={mine.image} style={{ width: "45px", height: "45px" }} />
            </Box>
          ))}

          {gameOver && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                zIndex: 10,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setGameState(initialGameState);
                  setGameOver(false);
                  setGameWon(false);
                  setDirection({ x: 0, y: 0 });
                }}
              >
                Game Over! Restart
              </Button>
            </Box>
          )}

          {gameWon && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  background: "#000",
                  color: "#fff",
                  borderRadius: "5px",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                You ate all the momos 🥟 <br />
                Congrats you got a key. <br />
                <img
                  src={key}
                  style={{
                    width: "45px",
                    height: "45px",
                    padding: "10px",
                    margin: "auto",
                  }}
                />
                Contact Manager for the entrance.
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default PacCanGame;

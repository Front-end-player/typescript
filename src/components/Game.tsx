import React, {useCallback, useEffect, useState} from 'react';
import BoardComp from "./BoardComp/BoardComp";
import {ChessType, Difficulty, GameStatus} from "./types";

interface GameProps{
  difficulty: Difficulty
}

interface GameInfo {
  cheeses: ChessType[],
  gameStatus: GameStatus,
  nextChess: ChessType.red | ChessType.black,
  isGameOver: boolean
}

function Game(props: GameProps) {
  const {difficulty} = props;
  const [gameInfo,setGameInfo] = useState<GameInfo>({
    cheeses: [],
    gameStatus: GameStatus.gaming,
    nextChess: ChessType.red,
    isGameOver: false,
  })
  /**
   * 初始化数据
   * */
  useEffect(()=>{
    const cheeses:ChessType[] = [];
    for (let i = 0; i < difficulty**2; i++) {
      cheeses.push(ChessType.none)
    }
    setGameInfo(state=> ({
      ...state,
      cheeses
    }))
  }, [difficulty])

  const handleGameStatus = (state: GameInfo, index: number): { gameStatus:GameStatus, isGameOver: boolean }=>{
    let gameStatus: GameStatus = state.gameStatus;
    let isGameOver: boolean = state.isGameOver
    const count = difficulty-1
    const horMin = Math.floor(index / difficulty) * difficulty;
    const horMax = Math.floor(index / difficulty) * difficulty + count;
    // 是否有一方胜利 横排的
    const isWin = [];
    for (let i = 0; i <= count; i++) {
      isWin.push(state.cheeses[horMin] === state.cheeses[horMin + i])
    }
    if(!isWin.includes(false)) {
      isGameOver = true;
      if (state.cheeses[index] === ChessType.red) {
        gameStatus = GameStatus.redWin
      }
      if (state.cheeses[index] === ChessType.black) {
        gameStatus = GameStatus.blackWin
      }
    }

    return {gameStatus, isGameOver};
  }

  const handleChessClick = useCallback((index: number)=>{
    console.log(gameInfo)
      setGameInfo(state=>{
        console.log(state)
        if (state.isGameOver) return state;
        let cheeses = [...state.cheeses];
        let nextChess: ChessType.red | ChessType.black;
        cheeses[index] = state.nextChess;

        if (state.nextChess === ChessType.red) {
          nextChess = ChessType.black
        }else {
          nextChess = ChessType.red
        }

        let gameStatus = handleGameStatus({
          ...state,
          cheeses,
          nextChess
        }, index);
        console.log(gameStatus)
        return {
          ...gameStatus,
          cheeses,
          nextChess,
        };
      })
  }, [gameInfo.isGameOver, handleGameStatus])

  return (
    <div>
      <h1>{gameInfo.gameStatus}</h1>
      <BoardComp
        cheeses={gameInfo.cheeses}
        chessSize={50}
        difficulty={difficulty}
        onClick={handleChessClick}
      />
    </div>
  );
}

export default Game;

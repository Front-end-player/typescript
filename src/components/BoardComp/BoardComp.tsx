import React, {useCallback} from 'react';
import styled from "styled-components/macro";
import {ChessComp} from "../ChessComp/Chess";
import {ChessType, Difficulty} from "../types";

const BoardWrapper = styled.div`
  border: 1px solid #0070f3;
  //box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`

export interface BoardProps {
  chessSize?: number
  difficulty: Difficulty
  cheeses: ChessType[],
  onClick?: (index: number)=> void
}

export const BoardComp: React.FC<BoardProps> = (props)=> {
  const chessSize = props.chessSize!;

  const {difficulty, cheeses, onClick} = props;
  console.log( difficulty)
  const handleClick = useCallback((index: number)=>{
    if (onClick) {
      onClick(index)
    }
  }, [])
  return (
    <BoardWrapper style={{width: difficulty * chessSize }}>
      {cheeses.map((it, i)=> <ChessComp chessSize={chessSize} type={it} key={i} onClick={()=>{
        handleClick(i)
      }} />)}
    </BoardWrapper>
  );
}
BoardComp.defaultProps ={
  chessSize: 50
}

export default BoardComp;

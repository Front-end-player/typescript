import React, {useCallback} from 'react';
import styled, {css} from "styled-components/macro";
import {ChessProps, ChessType} from "../types";

const ChessWrapper = styled.div`
  border: 1px solid #0070f3;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Chess = styled.div.attrs(props=>({
  'data-type': -1,
  ...props
}))`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-sizing: border-box;
  ${props=> {
      switch(props['data-type']) {
        case ChessType.red:
          return css`
            background: radial-gradient(#fff 5%, #f00);
          `;
        case ChessType.black:
          return css`
            background: radial-gradient(#fff 5%, #000);
          `;
        case ChessType.none:
          return css`
            background: unset;
          `
      }
    }}
`



export const ChessComp:React.FC<ChessProps> = (props)=> {
  const {onClick, type} = props;
  const chessSize = props.chessSize!;
  const handleChessClick = useCallback(()=>{
    if (type === ChessType.none && onClick) {
      onClick()
    }
  }, [])
  return (
    <ChessWrapper onClick={handleChessClick} style={{width: chessSize, height: chessSize}}>
      <Chess data-type={type} style={{
        width: chessSize - 10,
        height: chessSize - 10
      }} />
    </ChessWrapper>

  );
}

ChessComp.defaultProps = {
  chessSize: 50
}

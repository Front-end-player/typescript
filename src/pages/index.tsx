import type {NextPage} from 'next'
import Game from "../components/Game";
import {Difficulty} from "../components/types";


const Home: NextPage = () => {
  return (
    <div>
      <Game difficulty={Difficulty.medium} />
    </div>
  )
}

export default Home

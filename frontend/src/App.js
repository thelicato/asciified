/* CONTEXT */
import { FontsProvider } from './context/fonts';
/* PARTIALS */
import { Header, Footer} from './partials';
/* CONTENT */
import Main from './Main';
/* GITHUB CORNER */
import GithubCorner from 'react-github-corner';

const App = () => {
  return (
    <>
      <FontsProvider>
        <Header/>
        <Main />
        <Footer/>
        <GithubCorner href="https://github.com/thelicato/asciified" />
      </FontsProvider>
    </>
  )
}

export default App;
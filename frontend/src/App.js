/* CONTEXT */
import { FontsProvider } from './context/fonts';
/* PARTIALS */
import { Header, Footer} from './partials';
/* CONTENT */
import Main from './Main';

const App = () => {
  return (
    <>
      <FontsProvider>
        <Header/>
        <Main />
        <Footer/>
      </FontsProvider>
    </>
  )
}

export default App;
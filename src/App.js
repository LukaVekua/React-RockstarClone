import { createBrowserRouter, RouterProvider, UNSAFE_DataRouterContext } from 'react-router-dom'
import Root from './components/root/Root';
import Home from './routes/Home';
import Newswire from './routes/Newswire';
import SpecificNewswire from './components/newswire/SpecificNewswire';
import Games from './routes/Games';
import SpecificGame from './components/games/SpecificGame';
import SocialClub from './components/socialClub/SocialClub';
import Contribution from './components/contribution/Contribution';
import UnfinishedAlert from './components/UI fedback/UnfinishedAlert';

const router = createBrowserRouter([
  { errorElement: <UnfinishedAlert /> },
  {
    path: '/', element: <Root />, children: [
      { index: true, element: <Home /> },
      { path: '/newswire', element: <Newswire />, },
      { path: '/newswire/:newswireId', element: <SpecificNewswire /> },
      { path: '/games', element: <Games /> },
      { path: '/games/:gameId', element: <SpecificGame /> },
      { path: '/socialclub', element: <SocialClub /> },
      { path: '/contribution', element: <Contribution /> }
    ]
  },
  { path: '/reddeadredemption', element: <h1>RDR2</h1> },
])



function App() {
  return <RouterProvider router={router} />
}

export default App;

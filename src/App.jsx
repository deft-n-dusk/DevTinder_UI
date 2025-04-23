import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import Body from "./Components/Body"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Components/Feed"


function App() {
  

  return (
    <>
    <Provider store={appStore}>
     <BrowserRouter basename= "/">
        <Routes>
          <Route path="/" element={<Body/>}>
              <Route path="/" element= {<Feed/>}/>
              <Route path="/login" element= {<Login/>}/>
              <Route path="/profile/view" element= {<Profile/>}/>
          </Route>
        </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App

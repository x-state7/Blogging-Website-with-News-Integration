import React from "react"
import News from "./Components/News";
import Blogs from "./Components/Blogs";
const App = () => {
  return (
    <div className="container">
      <div className="news-blogs-app">
        {/* <News /> */}
        <Blogs> </Blogs>
      </div>
    </div>
  )
}
export default App;
import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css"
import noImg from '../assets/images/image1.jpg'

import axios from 'axios'

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=6cae913e7f221ff1978a630aa6a7aa36`

      const response = await axios.get(url);
      const fetchedNews = response.data.articles

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg
        }
      })
      setHeadline(fetchedNews[0])
      setNews(fetchedNews.slice(1, 7));

      console.log(fetchedNews)
    }
    fetchNews()
  }, [])

  return (
    <div className="news">

      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form>
            <input type="text" placeholder='"Search News..."'></input>
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>

      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={noImg} alt="User Image"></img>
            <p>Jack Blogs</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">

              <a href="#" className="nav-link">General</a>
              <a href="#" className="nav-link">World</a>
              <a href="#" className="nav-link">Business</a>
              <a href="#" className="nav-link">Technology</a>
              <a href="#" className="nav-link">Entertainment</a>
              <a href="#" className="nav-link">Sports</a>
              <a href="#" className="nav-link">Science</a>
              <a href="#" className="nav-link">Health</a>
              <a href="#" className="nav-link">Nation</a>
              <a href="#" className="nav-link">
                Bookmarks<i className="fa-regular fa-bookmark"></i></a>
            </div>
          </nav>
        </div>

        {/* news section */}
        <div className="news-section">
          {headline && (
            <div className="headline">
              <img src={headline.image || noImg} alt={headline.title}></img>
              <h2 className="headline-title">
                {headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item">
                <img src={article.image || noImg} alt={article.title}></img>
                <h3>{article.title}</h3>
                <i className="fa-regular fa-bookmark bookmark"></i>
              </div>
            ))}

          </div>
        </div>

        {/* my blogs */}
        <div className="my-blogs">My Blogs</div>

        {/* weahter Calender*/}
        <div className="weather-calendar">
          <Weather></Weather>
          <Calendar></Calendar>
        </div>

      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  )
}
export default News
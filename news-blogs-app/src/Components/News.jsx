import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css"
import noImg from '../assets/images/image1.jpg'
import blogImg1 from '../assets/images/3.jpg'

import axios from 'axios'
import NewsModal from "./NewsModal";
import Bookmarks from "./Bookmarks";

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation"
]

const News = ({ onShowBlogs }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchquery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedArticle, setselectedArticle] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [showBookmarksModal, setShowBookmarksModal] = useState(false)


  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=6cae913e7f221ff1978a630aa6a7aa36`

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=6cae913e7f221ff1978a630aa6a7aa36`
      }
      const response = await axios.get(url);
      const fetchedNews = response.data.articles

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg
        }
      })
      setHeadline(fetchedNews[0])
      setNews(fetchedNews.slice(1, 7));

      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
      setBookmarks(savedBookmarks);

      console.log(fetchedNews)
    }
    fetchNews()
  }, [selectedCategory, searchQuery])

  const handleCategoryLink = (e, category) => {
    e.preventDefault()
    setSelectedCategory(category)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchquery(searchInput)
    setSearchInput('')
  }
  const handleArticleClick = (article) => {
    setselectedArticle(article)
    setShowModal(true);
    console.log(article)
  }

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title === article.title)
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title) // Remove if already bookmarked
        : [...prevBookmarks, article]; // Add if not bookmarked

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))

      return updatedBookmarks;
    });
  };


  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input

              type="text"
              placeholder='"Search News..."'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}>
            </input>

            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>

      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={noImg} alt="User Image"></img>
            <p>Jack Blogs</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  onClick={(e) => handleCategoryLink(e, category)}
                  className="nav-link">{category} </a>
              ))}
              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmarksModal(true)}>Bookmarks
                <i className="fa-solid fa-bookmark"></i>
              </a>

            </div>
          </nav>
        </div>

        {/* news section */}
        <div className="news-section">
          {headline && (
            <div
              className="headline"
              onClick={() => handleArticleClick(headline)}>
              <img
                src={headline.image || noImg}
                alt={headline.title}>
              </img>

              <h2
                className="headline-title">
                {headline.title}
                <i
                  className={`${bookmarks.some((bookmark) =>
                    bookmark.title === headline.title)
                    ? "fa-solid"
                    : "fa-regular"}
                  fa-bookmark bookmark`}
                  onClick={(e) => {
                    // this will trigger only bookmark functanialty not any other
                    e.stopPropagation()
                    handleBookmarkClick(headline)
                  }}>

                </i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div
                key={index}
                className="news-grid-item"
                onClick={() => handleArticleClick(article)}>
                <img
                  src={article.image || noImg}
                  alt={article.title}></img>
                <h3>{article.title}</h3>
                {/* newsgrid book mark */}
                <i
                  className={`${bookmarks.some((bookmark) =>
                    bookmark.title === article.title)
                    ? "fa-solid"
                    : "fa-regular"}
                  fa-bookmark bookmark`}
                  onClick={(e) => {
                    // this will trigger only bookmark functanialty not any other
                    e.stopPropagation()
                    handleBookmarkClick(article)
                  }}>

                </i>
              </div>
            ))}
          </div>
        </div>

        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}>
        </NewsModal>

        <Bookmarks
          show={showBookmarksModal}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarksModal(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        ></Bookmarks>

        {/* my blogs */}
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">

            <div className="blog-post">
              <img src={blogImg1} alt="Post Image"></img>
              <h3>Lorem ipsum dolor sit.</h3>
              {/* editing deleting buttons */}
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>

            <div className="blog-post">
              <img src={blogImg1} alt="Post Image"></img>
              <h3>Lorem ipsum dolor sit.</h3>
              {/* editing deleting buttons */}
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>

            <div className="blog-post">
              <img src={blogImg1} alt="Post Image"></img>
              <h3>Lorem ipsum dolor sit.</h3>
              {/* editing deleting buttons */}
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>

            <div className="blog-post">
              <img src={blogImg1} alt="Post Image"></img>
              <h3>Lorem ipsum dolor sit.</h3>
              {/* editing deleting buttons */}
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* weahter Calender*/}
        <div className="weather-calendar">
          <Weather></Weather>
          <Calendar></Calendar>
        </div>

      </div>
      <footer className="news-footer">
        <p>
          <span>News & Blogs App</span>
        </p>
        <p>&copy;All Rights Reserved</p>
      </footer>
    </div>
  )
}
export default News
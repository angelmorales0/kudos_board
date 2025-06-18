import React, { useState } from 'react';
import './Header.css';
const Header = () => {
  const [searchBarContent, setsearchBarContent] = useState('');



  return (
    <header className="header">
      <div className="header-top">

        <div className="logo">
            <h1>🎉 Kudos Board</h1>
        </div>

        <div className="header-center">
          <form className="search-form" >
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search"
                value={searchBarContent}
                onChange={e=>setsearchBarContent(e.target.value)}
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </div>
          </form>
        </div>


      </div>
    </header>
  );
};

export default Header;

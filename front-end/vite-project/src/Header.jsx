import React, { useState } from "react";
import "./Header.css";
const Header = ({ createBoard, setSearch }) => {
  const [searchBarContent, setsearchBarContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    imageUrl: "",
    owner: "",
  });

  const search = (e) => {
    e.preventDefault();
    setSearch({ searchContent: searchBarContent });
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setsearchBarContent("");
    setSearch({ searchContent: "" });
  };

  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.category.trim()) {
      createBoard(
        formData.title,
        formData.imageUrl,
        formData.category,
        formData.owner
      );
      leaveModal();
    }
  };

  const isFormValid = formData.title.trim() && formData.category.trim();

  const leaveModal = () => {
    setFormData({
      title: "",
      category: "",
      imageUrl: "",
      owner: "",
    });
    setShowModal(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="logo">
            <h1>🎉 Kudos Board</h1>
          </div>

          <div className="header-center">
            <form className="search-form">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchBarContent}
                  onChange={(e) => setsearchBarContent(e.target.value)}
                />
                <button
                  onClick={search}
                  type="submit"
                  className="search-button"
                >
                  🔍
                </button>
                <button
                  onClick={clearSearch}
                  type="button"
                  className="clear-button"
                >
                  clear
                </button>
              </div>
            </form>
          </div>

          <div className="header-right">
            <button
              className="create-board-btn"
              onClick={() => setShowModal(true)}
            >
              Create Board
            </button>
          </div>
        </div>
      </header>

      {showModal && (
        <div className="modal-overlay" onClick={leaveModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Board</h2>
            </div>

            <form className="modal-form" onSubmit={submitForm}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={updateFormData}
                  placeholder="Enter board title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={updateFormData}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="CELEBRATION">CELEBRATION</option>
                  <option value="THANK_YOU">THANK YOU</option>
                  <option value="INSPIRATION">INSPIRATION</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={updateFormData}
                  placeholder="Enter Image URL"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="owner">Owner:</label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={updateFormData}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={leaveModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={!isFormValid}
                >
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    // Функция для получения данных с API
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Фильтрация постов на основе поиска
    const result = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(result);
  }, [searchTerm, posts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <h1>Posts</h1>
      <div>
        <input
          type="text"
          placeholder="Поиск по title и body..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => setSearchTerm(searchTerm)}>Найти</button>
      </div>
      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <p>Нет постов для отображения</p>
        )}
      </div>
    </div>
  );
}

export default App;

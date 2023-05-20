import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [postId, setPostId] = useState('');
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPostId(e.target.value);
  };

  const handleSearch = () => {
    if (postId < 1 || postId > 100) {
      setError('Please enter a valid post ID between 1 and 100.');
      setPost(null);
      setComments(null);
      return;
    }

    setError(null);

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
        return axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        setError('Error occurred while fetching data.');
        setPost(null);
        setComments(null);
      });
  };

  return (
    <div className="App">
      <h1>Post Search</h1>
      <div>
        <input
          type="number"
          min="1"
          max="100"
          value={postId}
          onChange={handleInputChange}
          placeholder="Enter post ID (1-100)"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )}
      {comments && (
        <div className="comments">
          <h3>Comments:</h3>
          {comments.map((comment) => (
            <div key={comment.id}>
              <h4>{comment.name}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

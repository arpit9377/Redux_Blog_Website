
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from './redux/action';

function App() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  

  const [newPost, setNewPost] = useState({
    title: ''
  });

  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });  //[key]:value
  };

  const handleCreatePost = () => {
    dispatch(createBlogPost(newPost));
    setNewPost({ title: '' });
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setEditPost(postToEdit);
  };

  const handleUpdatePost = () => {
    if (editPost) {
      dispatch(updateBlogPost(editPost.id, editPost));
      setEditPost(null);
    }
  };

  const handleDeletePost = (postId) => {
    dispatch(deleteBlogPost(postId));
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Enter title"
        />
        <button onClick={handleCreatePost} className="btn btn-primary mt-2">
          Create Post
        </button>
      </div>
      <h1>Blog Posts</h1>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {editPost?.id === post.id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                  className="form-control mb-2"
                />
                <button onClick={handleUpdatePost} className="btn btn-success">
                  Update
                </button>
              </div>
            ) : (
              <div>
                <strong>{post.title}</strong>
                <div className="mt-2">
                  <button onClick={() => handleEditPost(post.id)} className="btn btn-warning me-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeletePost(post.id)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

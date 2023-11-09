// /src/redux/actions.jsx
export const FETCH_BLOG_POSTS = 'FETCH_BLOG_POSTS';
export const CREATE_BLOG_POST = 'CREATE_BLOG_POST';
export const UPDATE_BLOG_POST = 'UPDATE_BLOG_POST';
export const DELETE_BLOG_POST = 'DELETE_BLOG_POST';

export const fetchBlogPosts = () => {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((posts) => {
        dispatch({
          type: FETCH_BLOG_POSTS,
          payload: posts,
        });
      })
      .catch((error) => {
        console.log('Error fetching posts:', error);
      });
  };
};

export const createBlogPost = (newPost) => {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', // Corrected from METHOD:POST
      body: JSON.stringify(newPost), // Corrected from json.stringify
      headers: {
        'Content-Type': 'application/json', // Corrected from 'Content_type'
      },
    })
      .then((res) => res.json())
      .then((createdPost) => {
        dispatch({
          type: CREATE_BLOG_POST,
          payload: createdPost,
        });
      })
      .catch((error) => {
        console.log('Error creating post:', error);
      });
  };
};

export const updateBlogPost = (postId, updatedPost) => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPost),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        dispatch({
          type: UPDATE_BLOG_POST,
          payload: updatedPost,
        });
      })
      .catch((error) => {
        console.error('Error updating blog post:', error);
      });
  };
};

export const deleteBlogPost = (postId) => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatch({
          type: DELETE_BLOG_POST,
          payload: postId,
        });
      })
      .catch((error) => {
        console.error('Error deleting blog post:', error);
      });
  };
};

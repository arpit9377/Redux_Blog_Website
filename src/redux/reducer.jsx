
import { FETCH_BLOG_POSTS, CREATE_BLOG_POST, UPDATE_BLOG_POST, DELETE_BLOG_POST } from './action';

const initialState = {
  posts: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOG_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case CREATE_BLOG_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case UPDATE_BLOG_POST:
      const updatedPost = action.payload; 
      const updatedPosts = state.posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      return {
        ...state,
        posts: updatedPosts,
      };
    case DELETE_BLOG_POST:
      const deletedPostId = action.payload; 
      const filteredPosts = state.posts.filter((post) => post.id !== deletedPostId);
      return {
        ...state,
        posts: filteredPosts,
      };
    default:
      return state;
  }
};

export default blogReducer;

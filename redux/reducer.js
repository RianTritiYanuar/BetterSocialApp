import actionTypes from './constant';

const initialState = {
  posts: [
    {
      id: 1,
      author: 'Usup Suparma',
      date: 'Mar 27, 2023',
      post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum acdictum.',
      image_url: 'https://picsum.photos/200',
      upVotes: 0,
      downVotes: 0,
      comments: [
        {
          author: 'Ujang Supra',
          comment: 'Mantaappp!',
        },
        {
          author: 'Mamat',
          comment: 'Anjaayy!',
        },
      ],
    },
    {
      id: 2,
      author: 'Udin Sedunia',
      date: 'Mar 27, 2023',
      post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci Nulla luctus in ipsum ac dictum. Integer et nunc ut tellus tinci, consectetur adipiscing elit. Nulla luctus in ipsum acdictum.',
      image_url: 'https://picsum.photos/200',
      upVotes: 0,
      downVotes: 0,
      comments: [
        {
          author: 'Ujang Supra',
          comment: 'Mantaappp!',
        },
      ],
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_UP_VOTES:
      const upVotePostIndex = state.posts.findIndex(
        post => post.id === action.value,
      );
      const updatedUpVotes = state.posts.map((item, index) =>
        index === upVotePostIndex ? {...item, upVotes: item.upVotes + 1} : item,
      );
      return {
        ...state,
        posts: updatedUpVotes,
      };
    case actionTypes.SET_DOWN_VOTES:
      const downVotePostIndex = state.posts.findIndex(
        post => post.id === action.value,
      );
      const updatedDownVotes = state.posts.map((item, index) =>
        index === downVotePostIndex
          ? {...item, downVotes: item.downVotes + 1}
          : item,
      );
      return {
        ...state,
        posts: updatedDownVotes,
      };
    case actionTypes.ADD_COMMENT:
      const {post_id, comment} = action.value;
      const updatedPosts = state.posts.map(post => {
        if (post.id === post_id) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts,
      };
    default:
      return state;
  }
};

export default reducer;

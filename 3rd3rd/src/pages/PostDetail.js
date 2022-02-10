import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import Permit from "../shared/Permit";

import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

import { Button } from "../elements";

import { history } from "../redux/configureStore";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((store) => store.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(id));
  }, []);

  const deletePost = () => {
    window.alert("삭제가 완료되었습니다.")
    dispatch(postActions.deletePostFB(id));
  }

  return (
    <React.Fragment>
      {post && (
        <>
          <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
          {post.user_info.user_id === user_info?.uid ? (
            <Button _onClick={deletePost}>삭제하기</Button>
          ) : null}
        </>     
      )}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} />
      </React.Fragment>
  );
};

export default PostDetail;

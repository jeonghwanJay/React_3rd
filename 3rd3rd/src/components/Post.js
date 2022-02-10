import React from "react";
import { Grid, Image, Text, Button } from "../elements";

import {history} from "../redux/configureStore";
import { useDispatch,useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";
import LikeButton from "./LikeButton";

 const Post = (props) => {
  
  const dispatch = useDispatch();
  const list = useSelector((state) => state.like.list);
  
  const {
    user_info,
    image_url,
    contents,
    like_cnt,
    insert_dt,
    id,
    layout,
    comment_cnt,
  } = props;

  React.useEffect(() => {
    dispatch(likeActions.getLikeFB(id));
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <Button width="auto" margin="4px" padding="4px" _onClick={(event) => {
                event.stopPropagation()
                history.push(`/write/${props.id}`);                
              }}>
                수정
              </Button>
            )}
          </Grid>
        </Grid>
        </Grid>

        {layout === "right" && (
        <Grid>
          <Grid
            is_flex
            _onClick={() => {
              history.push(`/post/${id}`);
            }}
          >
            <Text margin="10px" width="80%" center size="15px">
              {contents}
            </Text>
            <Image half shape="big_square" src={image_url} />
          </Grid>
          <Grid is_flex padding="5px">
            <Grid is_flex padding="5px" width="150px">
              <Text >좋아요 {like_cnt}개</Text>
              <Text>댓글 {comment_cnt}개</Text>
            </Grid>
            <LikeButton post_id={id}></LikeButton>
          </Grid>
        </Grid>
      )}
      {layout === "left" && (
        <Grid>
          <Grid
            is_flex
            _onClick={() => {
              history.push(`/post/${id}`);
            }}
          >
            <Image half shape="big_square" src={image_url} />
            <Text margin="10px" width="80%" center>
              {contents}
            </Text>
          </Grid>
          <Grid is_flex padding="5px">
            <Grid is_flex padding="5px" width="150px">
              <Text>좋아요 {like_cnt}개</Text>
              <Text>댓글 {comment_cnt}개</Text>
            </Grid>
            <LikeButton post_id={id}></LikeButton>
          </Grid>
        </Grid>
      )}
      {layout === "bottom" && (
        <Grid>
          <Grid
            _onClick={() => {
              history.push(`/post/${id}`);
            }}
          >
            <Text margin="10px">{contents}</Text>
            <Image shape="rectangle" src={image_url} />
          </Grid>
          <Grid is_flex padding="5px">
            <Grid is_flex padding="5px" width="150px">
              <Text>좋아요 {like_cnt}개</Text>
              <Text>댓글 {comment_cnt}개</Text>
            </Grid>
            <LikeButton post_id={id}></LikeButton>
          </Grid>
        </Grid>
      )}
   </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "Jay",
    user_profile: "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202111/07/762ce144-d666-4790-8609-c78416910e88.jpg",
  },
  image_url: "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202111/07/762ce144-d666-4790-8609-c78416910e88.jpg",
  contents: "귀요미 ㅎㅎ",
  comment_cnt: 10,
  like_cnt: 0,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;

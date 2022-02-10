import React, {useState} from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
  const [layout, setLayout] = useState(_post ? _post.layout : "bottom");
  const [input, setInput] = useState(_post ? _post.contents : "");


  const { history } = props;

  const [contents, setContents] = useState(_post ? _post.contents : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const addPost = () => {
    dispatch(postActions.addPostFB(input, layout));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, {contents: input, layout}));
  }

  const is_checked = (e) => {
    setLayout(e.target.value);
    // if (e.target.checked) {
    //   setLayout(e.target.value);
    // }
    
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          잠시만요!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓰실수 있어요!😉 </Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
        <Text size="25px" bold margin="25px 0px">
          세개의 레이아웃중 한가지를 선택해주세요!
        </Text>
      </Grid>

      <Grid padding="16px">
        <input
          type="radio"
          name="layout"
          value="right"
          id="right"
          onClick={is_checked}
        />
        <label htmlFor="right">
          <strong
            style={
              layout === "right" ? { color: "lightgreen", margin: "10px" } : null
            }
          >
            오른쪽에 이미지, 왼쪽에 게시물 내용
          </strong>
        </label>
      </Grid>
      <Grid is_flex>
        <Text width="80%" margin="10px" center>
          {input}
        </Text>
        <Image
          half
          shape="big_square"
          src={
            preview
              ? preview
              : "http://via.placeholder.com/400x300"
          }
        />
      </Grid>
      <Grid padding="16px">
        <input
          type="radio"
          name="layout"
          value="left"
          id="left"
          onClick={is_checked}
        />
        <label htmlFor="left">
          <strong
            style={
              layout === "left" ? { color: "lightgreen", margin: "10px" } : null
            }
          >
            왼쪽에 이미지, 오른쪽에 게시물 내용
          </strong>
        </label>
      </Grid>
      <Grid is_flex>
        <Image
          half
          shape="big_square"
          src={
            preview
              ? preview
              : "http://via.placeholder.com/400x300"
          }
        />
        <Text width="80%" margin="10px" center>
          {input}
        </Text>
      </Grid>
      <Grid padding="16px">
        <input
          type="radio"
          name="layout"
          value="bottom"
          id="bottom"
          onClick={is_checked}
          style={{ color: "lightgreen" }}
        />
        <label htmlFor="bottom">
          {" "}
          <strong
            style={
              layout === "bottom" ? { color: "lightgreen", margin: "10px" } : null
            }
          >
            하단에 이미지, 상단에 게시물 내용
          </strong>
        </label>
      </Grid>
      <Grid>
        <Text margin="10px">{input}</Text>
        <Image
          shape="big_square"
          src={
            preview
              ? preview
              : "http://via.placeholder.com/400x300"
          }
        />
      </Grid>

      <Grid padding="16px">
        <Input
          textarea
          value={input}
          onChange={is_checked}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
          _onChange={(e) => {
            setInput(e.target.value);   
          }}
          
        />
      {is_edit ? (
          <Button
            _onClick={editPost}
            _disabled={!preview || input === "" ? true : false}
          >
            게시글 수정
          </Button>
        ) : (
          <Button
            _onClick={addPost}
            _disabled={!preview || input === "" ? true : false}
          >
            게시글 작성
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;

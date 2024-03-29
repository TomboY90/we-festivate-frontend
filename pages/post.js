import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";
import CommentList from "../components/Comments/CommentList";
import CommentWrite from "../components/Comments/CommentWrite";
import { Box } from "./index";
import Map from "../components/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { _URL } from "../config/constants";
const BG_IMG = "https://en.trippose.com/img/bg/bokeh-514948_1920.jpg";

class Post extends React.Component {
  state = {
    post: {},
    isJoin: false
  };

  componentDidMount = async () => {
    const user_pk = sessionStorage.getItem("user_pk");

    let login_state = 0;
    if (user_pk) {
      login_state = 1;
    }

    const postId = this.props.url.query.id;

    const json = {
      user_pk,
      login_state
    };

    try {
      const res = await fetch(`${_URL}/event/detail/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      });

      if (res.status >= 400) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      if (data.rsvp_result) {
        this.setState({
          isJoin: true
        });
      }

      this.setState({
        post: data
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleJoin = async () => {
    const user_pk = sessionStorage.getItem("user_pk");
    const postId = this.props.url.query.id;

    const json = {
      user_pk
    };

    const res = await fetch(`${_URL}/event/detail/${postId}/rsvp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    });

    if (res.status >= 400) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    if (!data.rsvp_result) {
      if (data.rsvp_message === "rsvp_canceled") {
        alert("참여 신청이 취소되었습니다.");
        window.location.reload();
      } else {
        alert("참여 가능 인원이 다 찼습니다.");
        return;
      }
    } else {
      alert("참여 신청 완료");
      window.location.reload();
    }
  };

  render() {
    const { post } = this.state;

    const max = post.max_rsvp >= 999999 ? "제한없음" : post.max_rsvp;

    return (
      <>
        {post.title && (
          <Layout>
            <PostBox image={BG_IMG} />
            <DetailBox>
              <PostWrap>
                <PostHeader>
                  <ImageBox url={post.photo_url} />
                  <TitleBox>
                    <TitleHead>
                      <h2 style={{ fontSize: 30, margin: 0 }}>{post.title}</h2>
                      <p style={{ color: "gray", fontSize: 20, marginTop: 5 }}>
                        at {post.building} &nbsp; {post.place}
                      </p>
                      <br />
                      <p style={{ fontWeight: "bold", marginBottom: 20 }}>일시</p>
                      <p style={{ margin: "0 0 5px 0" }}>{post.date}</p>
                      <p style={{ margin: 0 }}>
                        {post.start_time} ~ {post.end_time}
                      </p>
                    </TitleHead>
                  </TitleBox>
                </PostHeader>

                <InfoBox>
                  <InfoSpan>
                    <FontAwesomeIcon icon={faUsers} />
                    &nbsp;&nbsp; {post.current_rsvp}명 /&nbsp; {max}
                  </InfoSpan>
                  <JoinBtn className="rsvp" onClick={this.handleJoin} disabled={!sessionStorage.getItem("user_pk")}>
                    {this.state.isJoin ? "신청취소" : "RSVP"}
                  </JoinBtn>
                  <ShareBtn className="share">SNS에 공유</ShareBtn>
                </InfoBox>
                <InfoInner>{post.main_text}</InfoInner>
                <Map lat={post.latitude} lng={post.longitude} />
                <br />
                <br />
                <h2>Comments({post.event_comment.length})</h2>

                {post.event_comment.length > 0 ? (
                  <CommentList list={post.event_comment} />
                ) : (
                  <div style={{ width: "90%", height: 150 }}>
                    <hr />
                  </div>
                )}

                <h2 style={{ marginBottom: 10 }}>Comment</h2>
                <CommentWrite postId={this.props.url.query.id} />
              </PostWrap>
            </DetailBox>
          </Layout>
        )}
      </>
    );
  }
}

const PostBox = styled(Box)`
  height: 350px;

  background: url(${props => props.image}) no-repeat;
  background-position: bottom;
  background-size: cover;
`;

const DetailBox = styled.div`
  width: 80%;
  margin: -12% auto 15px;
  position: relative;
  box-sizing: border-box;
  background-color: white;
  border-radius: 25px;

  @media only screen and (max-width: 1150px) {
    margin: -40% auto 15px;
  }
`;

const PostWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 0 0 40px;
`;

const PostHeader = styled.div`
  width: 95%;
  height: 400px;
  border-bottom: 1px solid gray;

  :after {
    clear: both;
    display: block;
    content: "";
  }

  @media only screen and (max-width: 1416px) {
    padding-bottom: 690px;
  }
`;

const ImageBox = styled.div`
  max-width: 635px;
  width: 100%;
  height: 380px;
  display: inline-block;
  float: left;
  background: url(${props => props.url}) no-repeat center;
  background-size: cover;
`;

const TitleBox = styled.div`
  width: 35%;
  max-width: 450px;
  min-width: 350px;
  height: 350px;
  display: inline-block;
  margin-left: 40px;

  @media only screen and (max-width: 1200px) {
    height: auto;
    width: auto;
    margin-left: unset;
  }
`;

const TitleHead = styled.div`
  width: 90%;
  padding: 25px;

  @media only screen and (max-width: 1150px) {
    width: 100%;
  }
`;

const InfoBox = styled.div`
  width: 95%;
  height: 70px;
  margin: 20px 0;
  border-bottom: 1px solid gray;

  ::after {
    display: block;
    content: "";
    clear: both;
  }

  @media only screen and (max-width: 1060px) {
    height: auto;
  }
`;

const InfoSpan = styled.div`
  display: inline-block;
  padding: 15;

  @media only screen and (max-width: 1060px) {
    display: block;
    margin: 10px;

    .rsvp {
      margin-right: 15px;
    }
  }
`;

const InfoInner = styled.div`
  width: 65%;
  white-space: pre-wrap;

  @media only screen and (max-width: 1150px) {
    width: auto;
  }
`;

const JoinBtn = styled.button`
  width: 150px;
  height: 51px;
  border: 1px solid green;
  border-radius: 10px;
  background-color: green;
  color: white;
  font-size: 17px;
  outline: none;

  float: right;
`;

const ShareBtn = styled(JoinBtn)`
  background-color: yellow;
  color: black;
  border: 1px solid yellow;
  margin-right: 10px;
`;

export default Post;

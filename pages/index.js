import styled from 'styled-components';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import { SearchInput } from '../components/Input'
import { SearchButton } from '../components/Button'
import PostList from '../components/PostList';
import PostLabelBar from '../components/PostLabelBar';
import {listOne, listTwo} from '../static/DummyList';


class Index extends React.Component {

  state = {
    recommandPostList: [],
    latestPostList: []
  }

  // async componentDidMount() {
  //   try {
  //     const res = await fetch('http://10.58.2.168:8000/event/priority'); // 추천 리스트 9개
  //     const res2 = await fetch('http://10.58.2.168:8000/event/newest');  // 최신 리스트 9개

  //     if(res.status >= 400 || res2.status >= 400) {
  //       throw new Error('Failed to fetch data');
  //     }

  //     const list = await res.json();
  //     const list2 = await res2.json();

  //     this.setState({
  //       recommandPostList: list,
  //       latestPostList: list2
  //     });

  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  render() {

    // const { recommandPostList, latestPostList } = this.state;

    return (
      <Layout style={{ margin: 0, padding: 0 }}>
        <Box>
        <video muted autoPlay loop style={{ width: `100%` }}>
          <source src="../static/wework.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* 동영상 안에 있는 검색창 */}
          <div style={{ width: '65%', margin: '0 auto' }}>
            <SearchWrap>
            <img src='../static/Logo_W.png' alt='logo' style={{ paddingBottom: 10 }}/>
              <SearchBox>
                <div style={{ display: 'inline-block', width: '75%'}}>
                  <SearchInput />
                </div>
                <div style={{ display: 'inline-block', width: '17%' }}>
                  <SearchButton />
                </div>
              </SearchBox>
            </SearchWrap>
          </div>
        </Box>
        
        <PostLabelBar 
          title="추천 이벤트"
          subtitle="바로 참여 가능한 이벤트를 한눈에 보실 수 있습니다"
        />
        <div style={{ width: '75%', margin: '0 auto' }}>
          <PostList list = {listOne} />
        </div>

        <PostLabelBar
          title="전체 이벤트" 
          subtitle="등록된 이벤트 전체를 한눈에 보실 수 있습니다"
          color="white"
          bgc="#e95349"
        />
        <div style={{ width: '75%', margin: '0 auto' }}>
          <PostList list = {listTwo} />
        </div>

      </Layout>
    );
  }
}

const Box = styled.div`
  max-height: 650px;
  overflow: hidden;
  position: relative;
`

const SearchWrap = styled.div`
  position: absolute;
  bottom: 23%;
  width: 70%;
  max-width: 1200px;
  min-width: 500px;
  
  margin: 0 auto;
`

const SearchBox = styled.div`
  min-width: 500px;
  padding: 20px 0;
  position: relative;
  border-top: 4px solid #59c45a;
  background-color: rgba(255, 255, 255, 0.6);
  :before {
    position: absolute;
    top: -36%;
    left: 6%;
    content: '';
    border: 17px solid transparent;
    border-bottom-color: #59c45a;
  }

  @media only screen and (max-width: 720px) {
    padding: 0;
    :before {
      top: -56%;
    }
  }
`

export { Box }
export default Index;
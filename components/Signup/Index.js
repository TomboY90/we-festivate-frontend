import styled from 'styled-components';
import { UserInput } from '../Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature, faAddressCard, faUserEdit, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { SubmitButton } from '../Button'
import { LoginText, LoginWrap, LoginBtnbox } from '../Login';

const Signup = (props) => {
  return (
    <Rightbox>
      <LoginText>
        <p>WeFestivate 회원가입</p>
      </LoginText>
      <LoginWrap>
      <FontAwesomeIcon icon={faUserEdit} size="2x" style={{ position: "absolute", top: '10%', left: 3 }}/>
      <UserInput
        type='text'
        value={props.id}
        name='id'
        placeholder='Enter your id'
        onChange={props.handleInput}
      />
      <FontAwesomeIcon icon={faLock} size="2x" style={{ position: "absolute", top: '30%', left: 3 }} />
      <UserInput
        type='password'
        name='pw'
        placeholder='Enter your password'
        onChange={props.handleInput}
      />
      <FontAwesomeIcon icon={faEnvelope} size="2x" style={{ position: "absolute", top: '49%', left: 3 }}/>
      <UserInput
        type='email'
        value={props.email}
        name='email'
        placeholder='Enter your email'
        onChange={props.handleInput}
      />
      <FontAwesomeIcon icon={faSignature} size="2x" style={{ position: "absolute", top: '67%', left: 3 }}/>
      <UserInput
        type='text'
        value={props.name}
        name='name'
        placeholder='Enter your name'
        onChange={props.handleInput}
      />
      <FontAwesomeIcon icon={faAddressCard} size="2x" style={{ position: "absolute", top: '85%', left: 3 }}/>
      <UserInput
        type='text'
        value={props.profile}
        name='profile'
        placeholder='Enter your profile'
        onChange={props.handleInput}
      />
      </LoginWrap>

      <LoginBtnbox>
        <SubmitButton />
      </LoginBtnbox>

    </Rightbox>
  )
}

const Rightbox = styled.div`
  float: right;
  width: 50%;
  height: 100%;

  box-sizing: border-box;
  padding: 20px;
  margin: 0 auto;
`


export default Signup;
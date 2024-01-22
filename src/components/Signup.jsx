import axios from "axios";
import { useState } from "react";
import React from "react";

function Signup() {

    const [name, setName] = React.useState(""); 
    const [password, setPassword] = React.useState("");
    const [phone, setPhone] = React.useState("");


    const [nameMessage, setNameMessage] = React.useState("");
    const [passwordMessage, setPasswordMessage] = React.useState("");
    const [phoneMessage, setPhoneMessage] = React.useState("");

    
    const [isname, setIsName] = React.useState(false);
    const [isPassword, setIsPassword] = React.useState(false);
    const [isPhone, setIsPhone] = React.useState(false);
  
    const [signupSuccess, setSignupSuccess] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      await CreateMember(name, password, phone);
      setSignupSuccess(true);

    }
    const CreateMember = async (name, password, callnum) => {
      try {
          if (!name.trim() && !password.trim() && !callnum.trim()) {
              // 입력 값이 공백인 경우 요청을 보내지 않음
              return;
          }

          const response = await axios.post(
            'https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/signup',
            {  username: name, password, callnum },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(response.data); // 서버 응답을 콘솔에 출력
          

    // 서버 응답에 따른 처리 추가
    if (response.data.resultCode === 'S-1') {
      // 회원가입 성공
      setSignupSuccess(true);
    } else {
      // 회원가입 실패
      alert(`회원가입 실패: ${response.data.msg}`);
    }
  } catch (error) {
    // Handle error if needed
    console.error('Error performing actions:', error);
    alert('서버 에러가 발생했습니다.');
  }
};

    const onChangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);
        if (currentName.length < 1 || currentName.length > 10) {
          setNameMessage("이름은 1글자 이상 10글자 이하로 입력해주세요!");
          setIsName(false);
        } else {
          setNameMessage(`반가워요 ${currentName}님`);
          setIsName(true);
        }
      };

      const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        const passwordRegExp =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPassword)) {
          setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!")
          setIsPassword(false);
        } else {    
          setPasswordMessage("안전합니다.");
          setIsPassword(true);
        }
      };
      const onChangePhone = (getNumber) => {
        const currentPhone = getNumber;
        setPhone(currentPhone);
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
     
        if (!phoneRegExp.test(currentPhone)) {
          setPhoneMessage("올바른 형식이 아닙니다!");
          setIsPhone(false);
        } else {
          setPhoneMessage("사용 가능한 번호입니다:-)");
          setIsPhone(true);
        }
      };

      const addHyphen = (e) => {
        const currentNumber = e.target.value;
        setPhone(currentNumber);
        if (currentNumber.length == 3 || currentNumber.length == 8) {
          setPhone(currentNumber + "-");
          onChangePhone(currentNumber + "-");
        } else {
          onChangePhone(currentNumber);
        }
      };
     

    return (
        <>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-el">
                <label htmlFor="name">이름</label> <br />
                <input id="name" name="name" value={name} onChange={onChangeName} />
                <p className="message"> {nameMessage} </p>
            </div>

            <div className="form-el">
                <label htmlFor="password">비밀번호</label> <br />
                <input id="password" name="password" value={password} onChange={onChangePassword}  />
                <p className="message"> {passwordMessage} </p>
            </div>

            <div className="form-el">
                <label htmlFor="phone">전화번호</label> <br />
                <input id="phone" name="phone" value={phone} onChange={addHyphen} />
                <p className="message"> {phoneMessage} </p>
            </div>
            <button type="submit">가입</button>
            {signupSuccess && <p>회원가입이 완료되었습니다!</p>}
        </form>
        </>
     );
}

export default Signup;
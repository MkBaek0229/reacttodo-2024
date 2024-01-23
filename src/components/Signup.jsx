import axios from "axios";
import { useState } from "react";
import React from "react";

// Signup 컴포넌트 정의
function Signup() {
  
    // 사용자 입력 값에 대한 상태 변수들
    const [name, setName] = React.useState(""); 
    const [password, setPassword] = React.useState("");
    const [phone, setPhone] = React.useState("");

    // 사용자 입력 유효성과 관련된 메시지를 위한 상태 변수들
    const [nameMessage, setNameMessage] = React.useState("");
    const [passwordMessage, setPasswordMessage] = React.useState("");
    const [phoneMessage, setPhoneMessage] = React.useState("");

    // 유효성 검사 상태를 추적하는 상태 변수들
    const [isName, setIsName] = React.useState(false);
    const [isPassword, setIsPassword] = React.useState(false);
    const [isPhone, setIsPhone] = React.useState(false);
  
    // 회원가입 성공 여부를 나타내는 상태 변수
    const [signupSuccess, setSignupSuccess] = React.useState(false);

    // 폼 제출을 처리하는 함수
    const handleSubmit = async (e) => {
      e.preventDefault();
      // CreateMember 함수를 호출하여 사용자 데이터를 서버에 전송
      await CreateMember(name, password, phone);
      // 회원가입 성공 상태를 true로 설정
      setSignupSuccess(true);
    }

    // 사용자 데이터를 서버에 전송하는 함수
    const CreateMember = async (name, password, callnum) => {
      try {
          // 입력 필드 중 하나라도 비어 있는지 확인
          if (!name.trim() && !password.trim() && !callnum.trim()) {
              // 하나라도 비어 있으면 요청을 보내지 않음
              return;
          }

          // 사용자 데이터를 포함한 POST 요청을 서버에 보냄
          const response = await axios.post(
            'https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/signup',
            {  username: name, password, callnum },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          // 서버 응답을 콘솔에 출력
          console.log(response.data);

          // 서버 응답을 기반으로 성공 또는 실패에 따라 처리
          if (response.data.resultCode === 'S-1') {
            // 회원가입 성공 시 회원가입 성공 상태를 true로 설정
            setSignupSuccess(true);
          } else {
            // 회원가입 실패 시 알림 메시지 표시
            alert(`회원가입 실패: ${response.data.msg}`);
          }
      } catch (error) {
        // 에러가 발생한 경우 처리
        console.error('작업 수행 중 오류 발생:', error);
        alert('서버 에러가 발생했습니다.');
      }
    };

    // 'name' 입력 필드 변경을 처리하는 함수
    const onChangeName = (e) => {
        const currentName = e.target.value;
        // 현재 입력 값으로 'name' 상태를 업데이트
        setName(currentName);
        // 입력 길이를 검증하고 피드백 제공
        if (currentName.length < 1 || currentName.length > 10) {
          setNameMessage("이름은 1글자 이상 10글자 이하로 입력해주세요!");
          setIsName(false);
        } else {
          setNameMessage(`반가워요 ${currentName}님`);
          setIsName(true);
        }
      };

      // 'password' 입력 필드 변경을 처리하는 함수
      const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        // 현재 입력 값으로 'password' 상태를 업데이트
        setPassword(currentPassword);
        // 비밀번호 유효성을 검증하는 정규 표현식
        const passwordRegExp =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        // 정규 표현식을 사용하여 비밀번호 유효성을 검증
        if (!passwordRegExp.test(currentPassword)) {
          setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!")
          setIsPassword(false);
        } else {    
          setPasswordMessage("안전합니다.");
          setIsPassword(true);
        }
      };

      // 'phone' 입력 필드 변경을 처리하는 함수
      const onChangePhone = (getNumber) => {
        const currentPhone = getNumber;
        // 현재 입력 값으로 'phone' 상태를 업데이트
        setPhone(currentPhone);
        // 전화번호 유효성을 검증하는 정규 표현식
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
     
        // 정규 표현식을 사용하여 전화번호 유효성을 검증
        if (!phoneRegExp.test(currentPhone)) {
          setPhoneMessage("올바른 형식이 아닙니다!");
          setIsPhone(false);
        } else {
          setPhoneMessage("사용 가능한 번호입니다:-)");
          setIsPhone(true);
        }
      };

      // 'phone' 입력 필드에 하이픈을 추가하는 함수
      const addHyphen = (e) => {
        const currentNumber = e.target.value;
        // 현재 입력 값으로 'phone' 상태를 업데이트
        setPhone(currentNumber);
        // 적절한 위치에 하이픈을 추가하고 'phone' 상태를 업데이트
        if (currentNumber.length === 3 || currentNumber.length === 8) {
          setPhone(currentNumber + "-");
          onChangePhone(currentNumber + "-");
        } else {
          onChangePhone(currentNumber);
        }
      };
     

    // Signup 컴포넌트를 렌더링하는 JSX
    return (
        <>
        <h2>회원가입</h2>
        {/* 사용자 회원가입을 위한 폼, 입력 필드 및 유효성 메시지 */}
        <form onSubmit={handleSubmit}>
            <div className="form-el">
                <label htmlFor="name">이름</label> <br />
                {/* 'name'을 위한 입력 필드와 값 및 변경 이벤트 핸들러 */}
                <input id="name" name="name" value={name} onChange={onChangeName} />
                {/* 'name'의 유효성 메시지 */}
                <p className="message"> {nameMessage} </p>
            </div>

            <div className="form-el">
                <label htmlFor="password">비밀번호</label> <br />
                {/* 'password'를 위한 입력 필드와 값 및 변경 이벤트 핸들러 */}
                <input id="password" name="password" value={password} onChange={onChangePassword}  />
                {/* 'password'의 유효성 메시지 */}
                <p className="message"> {passwordMessage} </p>
            </div>

            <div className="form-el">
                <label htmlFor="phone">전화번호</label> <br />
                {/* 'phone'을 위한 입력 필드와 값 및 변경 이벤트 핸들러 */}
                <input id="phone" name="phone" value={phone} onChange={addHyphen} />
                {/* 'phone'의 유효성 메시지 */}
                <p className="message"> {phoneMessage} </p>
            </div>
            {/* 폼 제출을 위한 버튼 */}
            <button type="submit">가입</button>
            {/* 회원가입이 성공하면 성공 메시지를 표시함 */}
            {signupSuccess && <p>회원가입이 완료되었습니다!</p>}
        </form>
        </>
     );
}

export default Signup;

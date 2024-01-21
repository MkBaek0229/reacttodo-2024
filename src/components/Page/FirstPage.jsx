import React, { useState } from "react";
import Signup from "../Signup";
import Login from "../Login";


function FirstPage() {
  const [visible, setvisible] = useState(false);


  const toggleVisibility = () => {
    setvisible(!visible);
  };


  return (
    <div>
      <h2>메인 페이지</h2>
      <button onClick={toggleVisibility}>
        {visible ? "숨기기" : "회원가입/로그인"}
      </button>
      <hr />
      {visible && <Signup />}
      {visible && <Login />}

    </div>
  );
}

export default FirstPage;

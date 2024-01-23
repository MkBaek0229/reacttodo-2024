// TodoTemplate.js

import React from "react";

// 할 일 앱의 전반적인 레이아웃을 구성하는 컴포넌트
function TodoTemplate({ children, username }) {
    return (
        <> 
            {/* 사용자 이름과 함께 TODO 앱의 제목을 표시 */}
            <h1>{username}'s TODO-APP</h1>
            {/* 자식 컴포넌트를 렌더링하는 부분 */}
            <div>{children}</div> 
        </>
    );
}

export default TodoTemplate;
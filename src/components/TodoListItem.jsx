// TodoListItem.js

import axios from 'axios';

// 할 일 항목을 표시하고 관리하는 컴포넌트
function TodoListItem({ username, todo, setTodos }) {
    const { id, contents, completed } = todo;

    // 할 일 항목 삭제 처리 함수
    const onDelete = async () => {
        try {
            await axios.delete(`https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos/${id}`);
            
            // 삭제 후 업데이트된 데이터를 서버에서 가져오는 GET 요청
            const response = await axios.get(`https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos`);
           
            // setTodos를 호출하여 할 일 목록 상태를 업데이트
            setTodos(response.data.data);
    
        } catch (error) {
            // 필요한 경우 에러 처리
            console.error('데이터 삭제 오류:', error);
        }
    };

    // 할 일 항목 완료 여부 토글 처리 함수
    const onToggle = async () => {
        try {
            await axios.patch(
                `https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos/${id}`,
                { completed: !completed },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // 완료 여부 토글 후 업데이트된 데이터를 서버에서 가져오는 GET 요청
            const response = await axios.get(`https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos`);
            setTodos(response.data.data);
        } catch (error) {
            // 필요한 경우 에러 처리
            console.error('데이터 토글 오류:', error);
        }
    };

    // 할 일 항목 렌더링
    return (
        <div style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
            <span> <strong>할일</strong> : {contents} </span>
            <button onClick={() => onDelete(id)}>삭제</button>
        </div>
    );
}
export default TodoListItem;

import axios from 'axios';

function TodoListItem({ username, todo, setTodos }) {
    const { id, contents, completed } = todo;

    const onDelete = async () => {
        try {
            // 삭제 요청
            await axios.delete(`https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos/${id}`);
    
            // 업데이트된 데이터를 서버에서 가져오는 GET 요청
            const response = await axios.get(`https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos`);
            setTodos(response.data.data);
    
        } catch (error) {
            // 필요한 경우 에러 처리
            console.error('데이터 삭제 오류:', error);
        }
    };

    const onToggle = async () => {
        try {
            // PATCH request
            await axios.patch(
                `https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos/${id}`,
                { completed: !completed },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // GET request to fetch updated data
            const response = await axios.get(`https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos`);
            setTodos(response.data.data);
        } catch (error) {
            // Handle error if needed
            console.error('Error toggling data:', error);
        }
    };

    return (
        <div style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
            <span> <strong>할일</strong> : {contents} </span>
            <button onClick={() => onDelete(id)}>삭제</button>
        </div>
    );
}

export default TodoListItem;

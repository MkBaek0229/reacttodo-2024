import { useState } from "react";
import axios from 'axios';

function TodoWrite({ setTodos }) {
    const [text, setText] = useState("");

    const onInsert = async (text) => {
        try {
            if (!text.trim()) {
                // 입력 값이 공백인 경우 요청을 보내지 않음
                return;
            }

            // POST request to insert data
            await axios.post(
                'https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/kim/todos',
                { contents: text },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // GET request to fetch updated data
            const response = await axios.get('https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/kim/todos');
            setTodos(response.data.data);
        } catch (error) {
            // Handle error if needed
            console.error('Error performing actions:', error);
        }
    };

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        onInsert(text);
        setText('');
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="할 일을 입력하세요."
                    type="text"
                    value={text}
                    onChange={onChange}
                />
                <button type="submit">저장</button>
            </form>
        </div>
    );
}

export default TodoWrite;

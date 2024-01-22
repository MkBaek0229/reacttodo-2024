function TodoTemplate({children , username}) {
    return (
        <> 
             <h1>{username}'s TODO-APP</h1>
            <div>{children}</div> 
        </>
    );
}

export default TodoTemplate;
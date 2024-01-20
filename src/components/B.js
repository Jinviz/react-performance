import React, { useCallback } from 'react'

//React.memo() is used to create a new component that will only re-render when the props change. second argument is the function that will be called when the component is re-rendered. 즉, 렌더링된 컴포넌트를 메모이제이션 해놓고, props가 변경되지 않는다면 다시 렌더링 하지 않음
const Message = React.memo(({ message }) => {
    return <p>{message}</p>;
})

const ListItem = React.memo(({ post }) => {
    return (
        <li key={post.id}>
            <p>{post.title}</p>
        </li>
    )
})

//부모 컴포넌트로부터 함수를 props로 넘겨 받는 상황.
//부모 컴포넌트(B)가 리렌더링될 때마다 testFunction()도 다시 생성되고, React.memo()에 얕은 비교를 통해 testFunction() props가 달라짐으로 List 컴포넌트도 리렌더링 되는 문제가 있다
//이러한 문제를 useCallback()로 해결
//useCallback()은 메모이제이션된 함수를 반환하는 함수. React.memo()는 컴포넌트 useCallback()은 함수
const List = React.memo(({ posts, testFunction }) => {
    console.log('List component is Rendering');
    return (
        <ul>
            {posts.map(post => ( 
                <ListItem key={post.id} post={post} />
            ))}
        </ul>
    )
})

const B = ({ message, posts }) => {
    console.log('B component is Rendering');
    const testFunction = useCallback(() => { }, []);
    return (
        <div>
            <h1>B Component</h1>
            <Message message={message} />
            <List posts={posts} testFunction={testFunction} />
        </div>
    )
}

export default B


// useCallback()에 대한 설명
//React 컴포넌트 함수 안에 함수가 선언이 되어 있다면 이 함수는 해당 컴포넌트가 랜더링될 때 마다 새로운 함수가 생성됩니다.
// const add = () => x + y;
// 하지만 useCallback()을 사용하면, 해당 컴포넌트가 랜더링되더라도 그 함수가 의존하는 값들이 바뀌지 않는 한 기존 함수를 계속해서 반환합니다. 즉, x 또는 y 값이 바뀌면 새로운 함수가 생성되어 add 변수에 할당되고, x와 y 값이 동일하다면 다음 랜더링 때 이 함수를 재사용합니다.
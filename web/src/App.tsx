import { useEffect, useState } from 'react';
// @ts-ignore
import { Post } from '@hackersquare/shared';

export const App = () => {
  const [posts, setPosts] = useState<Post []>();

  useEffect(() => {
    fetch("http://localhost:8000/posts")
        .then(res => res.json())
        .then(res => setPosts(res.posts))
  }, [])
  return (
      (posts?.length || 0) > 0 ? <div>{JSON.stringify(posts)}</div> : <div>No Posts</div>
  );
}


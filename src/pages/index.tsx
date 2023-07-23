import { GetStaticProps } from 'next';
import HomePage from '../containers/HomePage';
import { getPosts } from '../data/posts/get-posts';
import { PostData } from '../domain/posts/post';

export type HomeProps = {
  posts: PostData[];
};

export default function Home({ posts }: HomeProps) {
  return <HomePage posts={posts} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: { posts },
    // revalidate: 5,
  };
};

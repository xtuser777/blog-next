import Error from 'next/error';
import { GetStaticPaths, GetStaticProps } from 'next';
import { countPosts } from '../data/posts/count-posts';
import { getPosts } from '../data/posts/get-posts';
import { getPost } from '../data/posts/get-post';
import { PostData } from '../domain/posts/post';
import { Post } from '../containers/Post';
import { useRouter } from 'next/dist/client/router';

export type DynamicPostProps = {
  post: PostData;
};

const DynamicPost = ({ post }: DynamicPostProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Pàgina carregando, aguarde...</div>;
  }
  if (!post) {
    return <Error statusCode={404} />;
  }
  return <Post post={post} />;
};

export default DynamicPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPosts = await countPosts();
  const posts = await getPosts(`_limit=${numberOfPosts}`);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.attributes.slug,
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getPost(ctx.params.slug);

  return {
    props: { post: posts[0] },
    revalidate: 5,
  };
};

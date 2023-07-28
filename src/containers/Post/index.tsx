import Head from 'next/head';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { MainContainer } from '../../components/MainContainer';
import { PostContainer } from '../../components/PostContainer';
import { PostCover } from '../../components/PostCover';
import { PostDetails } from '../../components/PostDetails';
import { PostData } from '../../domain/posts/post';
import { SITE_NAME } from '../../config/app-config';
import { removeHtml } from '../../utils/remove-html';

export type PostProps = {
  post: PostData;
};

export const Post = ({ post }: PostProps) => {
  return (
    <>
      <Head>
        <title>
          {post.attributes.title} - {SITE_NAME}
        </title>
        <meta
          name="description"
          content={removeHtml(post.attributes.content).slice(0, 150)}
        />
      </Head>
      <Header />

      <MainContainer>
        <Heading>{post.attributes.title}</Heading>
        <PostCover
          coverUrl={post.attributes.cover.formats.large.url}
          alt={post.attributes.title}
        />
        <PostDetails
          author={post.attributes.author.name}
          category={post.attributes.category.name}
          date={post.attributes.created_at}
        />
        <PostContainer content={post.attributes.content} />
      </MainContainer>

      <Footer />
    </>
  );
};

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { MainContainer } from '../../components/MainContainer';
import { PostContainer } from '../../components/PostContainer';
import { PostCover } from '../../components/PostCover';
import { PostDetails } from '../../components/PostDetails';
import { PostData } from '../../domain/posts/post';

export type PostProps = {
  post: PostData;
};

export const Post = ({ post }: PostProps) => {
  return (
    <>
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

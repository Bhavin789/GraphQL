import Layout from "../components/Layout";
import Link from "next/Link";

const PostLink = ({ title }) => {
  return (
    <li>
      <Link href={`/post?title=${title}`}>
        <a>{title}</a>
      </Link>
    </li>
  );
};
const Home = () => {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink title="Hello Next.js">Hello Next.js</PostLink>
        <PostLink title="Learn Next.js is awesome" />
        <PostLink title="Deploy apps with Zeit" />
      </ul>
    </Layout>
  );
};

export default Home;

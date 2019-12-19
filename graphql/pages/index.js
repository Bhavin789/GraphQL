import Layout from "../components/Layout";
import Link from "next/Link";
import fetch from "isomorphic-unfetch";

const PostLink = ({ title }) => {
  return (
    <li>
      <Link href={`/post?title=${title}`}>
        <a>{title}</a>
      </Link>
    </li>
  );
};
const Home = ({ shows }) => {
  return (
    <Layout>
      <h1>Batman Shows</h1>
      <ul>
        {shows.map(show => (
          <PostLink title={show.name} />
        ))}
      </ul>
      <ul>
        <PostLink title="Hello Next.js">Hello Next.js</PostLink>
        <PostLink title="Learn Next.js is awesome" />
        <PostLink title="Deploy apps with Zeit" />
      </ul>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  return {
    shows: data.map(data => data.show)
  };
};

export default Home;

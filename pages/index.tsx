import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import BlogItem from "../components/blog-item";
import Header from "../components/header";
import { sanityClient, urlFor } from "../sanity";

import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home: NextPage<Props> = ({ posts }) => {
  console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read and connect
          </h1>
          <h2 className="">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="Medium Logo"
        />
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 ">
        {posts.map((post) => (
          <BlogItem post={post} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
      _id,
      title,
      slug,
      author -> {
        name,
        image,
        _id
      },
      description,
      mainImage
    }
  `;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Home;

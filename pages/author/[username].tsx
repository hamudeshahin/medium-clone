import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import PortableText from "react-portable-text";
import BlogItem from "../../components/blog-item";
import Header from "../../components/header";
import { sanityClient, urlFor } from "../../sanity";
import { Author } from "../../typings";

interface Props {
  author: Author;
}

const AuthorPage: FC<Props> = ({ author }) => {
  console.log("author");
  console.log(author);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-10">
        <div className="grid grid-cols-10">
          <div className="col-span-10 sm:col-span-3 sm:h-auto h-40 w-40 mx-auto">
            <img
              className="w-full rounded-full object-cover"
              src={urlFor(author.image).url()}
              alt={`Medium clone - ${author.name}`}
            />
          </div>
          <div className="col-span-10 sm:col-span-7">
            <h1 className="font-bold text-4xl text-yellow-500">
              {author.name}
            </h1>
            <h4 className="mb-5">
              Joined <span className="font-bold">Medium clone</span> at{" "}
              {new Date(author._createdAt).toLocaleString()}
            </h4>
            <div>
              <h3 className="font-bold">Bio</h3>
              <PortableText
                className=""
                content={author.bio}
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                serializers={{
                  h1: (props: any) => {
                    return (
                      <h1 className="text-2xl font-bold my-5" {...props} />
                    );
                  },
                  h2: (props: any) => {
                    return (
                      <h1 className="text-2xl font-bold my-5" {...props} />
                    );
                  },
                  li: ({ children }: any) => {
                    return <li className="ml-4 list-disc">{children}</li>;
                  },
                  a: ({ href, children }: any) => {
                    return (
                      <a href={href} className="text-blue-500 hover:underline">
                        {children}
                      </a>
                    );
                  },
                  blockquote: ({ children }: any) => {
                    return (
                      <div className="p-5 bg-yellow-400 bg-opacity-40 overflow-x-auto rounded-md">
                        {children}
                      </div>
                    );
                  },
                }}
              />
            </div>
          </div>
          <div className="col-span-10 mt-10">
            <h2 className="text-2xl">
              <span className="font-bold">{author.name}</span>'s Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 ">
              {author.posts?.map((post) => (
                <BlogItem post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
    *[_type == "author" ]{
        _id,
        slug,
    }
    `;
  // fetch query from sanity
  const authors = await sanityClient.fetch(query);
  const paths = authors?.map((author: Author) => ({
    params: {
      username: author.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
        *[_type == "author" && slug.current == "hamude-shahin"][0]{
            _id,
            name,
            image,
            description,
            slug,
            bio,
            _createdAt,
            "posts": *[_type == "post" && author._ref in *[_type=="author" && name == name ]._id ]{
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
        }
    `;

  // fetch the user
  const author = await sanityClient.fetch(query, {
    username: params?.username,
  });

  if (!author)
    return {
      notFound: true,
    };

  return {
    props: {
      author,
    },
    revalidate: 60, // will regenerate the pages after 60 seconds ..
  };
};

export default AuthorPage;

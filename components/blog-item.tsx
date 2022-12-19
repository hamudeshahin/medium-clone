import Link from "next/link";
import { FC } from "react";
import { urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  post: Post;
}

const BlogItem: FC<Props> = ({ post }) => {
  return (
    <Link key={post._id} href={`/post/${post.slug.current}`}>
      <div className="group border rounded-lg drop-shadow-lg cursor-pointer overflow-hidden">
        <img
          className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={urlFor(post.mainImage).url()}
          alt={`Medium ${post.title} By ${post.author.name}`}
        />
        <div className="flex justify-between p-5 bg-white">
          <div>
            <p className="text-lg font-bold">{post.title}</p>
            <p className="text-xs">
              {post.description} by {post.author.name}
            </p>
          </div>
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt={`${post.author.name} on Medium`}
          />
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;

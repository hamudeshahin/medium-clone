/// posts
export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: Author;
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
  comments: Comment[];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _type: string;
    _ref: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

export interface Author {
  _createdAt: string;
  name: string;
  bio: object[];
  _id: string;
  slug: {
    current: string;
  };
  image: string;
  posts?: [Post];
}

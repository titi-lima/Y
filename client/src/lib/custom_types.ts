
export type UserType = {
    id: string,
    nickName: string,
    name: string,
    description: string,
    dateBirth: Date
};

export type PostType = {
    id: string,
    authorId: string,
    date: Date,
    text: string,
    midiaLink?: string,
    likes: number
};

export type CommentType = {
    id: string,
    postId: string,
    authorId: string,
    date: Date,
    text: string
};
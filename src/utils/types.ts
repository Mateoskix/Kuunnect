export type PostProps = {
    id: string;
    title: string;
    content: string;
    image?: string;
    created_at: string;
    updated_at?: string;
    user_id: string;
}

export type CommentProps = {
    id: string;
    content: string;
    created_at: string;
    updated_at?: string;
    user_id: string;
    post_id: string;
    onCommentDeleted?: () => void;
}
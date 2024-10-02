import { Post } from "@/entities/post/model/types";
import Link from "next/link";

type Props = {
	post: Post;
};

export function PostCard({ post }: Props) {
	return <Link href={`/post/${post.id}`}>{post.title}</Link>;
}

import { Post, PostCard } from "@/entities/post";

type Props = {
	posts: Post[];
};

export function PostList({ posts }: Props) {
	return (
		<ul>
			{posts.map((post) => (
				<li key={post.id}>
					<PostCard post={post} />
				</li>
			))}
		</ul>
	);
}

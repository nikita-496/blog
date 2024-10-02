import { Post } from "@/entities/post";

type Props = {
	postDetails: Post;
};

export function PostDetails({ postDetails }: Props) {
	const { title, body, reactions, views, userId: author, tags } = postDetails;
	return (
		<>
			<h2>{title}</h2>
			<span>{reactions.likes}&nbsp;</span>
			<span>{reactions.dislikes}&nbsp;</span>
			<span>{views}&nbsp;</span>
			<span>{author}&nbsp;</span>
			<hr />
			<p>{body}</p>
			<hr />
			{tags.map((tag) => (
				<span key={tag}>{tag}&nbsp;</span>
			))}
		</>
	);
}

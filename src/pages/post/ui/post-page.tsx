import { Post } from "@/entities/post";
import { useFetch } from "@/shared/api";
import { PostDetails } from "@/widgest/post-details/ui/post-details";
import { useRouter } from "next/router";

export function PostPage({}) {
	const router = useRouter();
	const { data: details, error } = useFetch<Post>(
		`https://dummyjson.com/posts/${router.query.slug}`
	);
	return <>{details && <PostDetails postDetails={details} />}</>;
}

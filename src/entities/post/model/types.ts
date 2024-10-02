export type Post = {
	id: number;
	title: string;
	body: string;
	tags: string[];
	reactions: Reactions;
	views: number;
	userId: number;
};

export type Posts = {
	posts: Post[];
};

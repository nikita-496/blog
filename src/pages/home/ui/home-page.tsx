import { Posts } from "@/entities/post";
import { useFetch } from "@/shared/api";
import { PostList } from "@/widgest/post-list";
import { useEffect } from "react";

export function HomePage() {
	const { data, error } = useFetch<Posts>("https://dummyjson.com/posts");
	useEffect(() => {
		//@ts-ignore
		const VKID = window.VKIDSDK;
		VKID.Config.set({
			app: process.env.NEXT_PUBLIC_VK_APP_ID,
			redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
			state: "dj29fnsadjsd82",
			codeVerifier: "FGH767Gd65",
			scope: "email",
			mode: VKID.ConfigAuthMode.InNewTab,
		});
		const oneTap = new VKID.OneTap();
		const container = document.getElementById("VkIdSdkOneTap");
		if (container) {
			oneTap.render({ container }).on(VKID.WidgetEvents.ERROR, console.error);
		}
		const params = new URLSearchParams(window.location.search);
		let code = params.get("code");
		let device_id = params.get("device_id");
		const exchangeCode = async () => {
			try {
				const result = await VKID.Auth.exchangeCode(code, device_id);
				console.log("result", result);
			} catch (error) {
				console.log("Error");
				console.error(error);
			}
		};
		if (code && device_id) {
			console.log(code.split(""), device_id.split(""));
			exchangeCode();
		}
	}, []);

	return (
		<div
			className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
		>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<h1>Блог</h1>
				{data && !error && <PostList posts={data.posts} />}
				<div id="VkIdSdkOneTap"></div>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
		</div>
	);
}

import { Posts } from "@/entities/post";
import { useFetch } from "@/shared/api";
import { PostList } from "@/widgest/post-list";
import { useEffect } from "react";
import * as VKID from "@vkid/sdk";

export function HomePage() {
	const { data, error } = useFetch<Posts>("https://dummyjson.com/posts");
	useEffect(() => {
		VKID.Config.init({
			app: Number(process.env.NEXT_PUBLIC_VK_APP_ID),
			redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL
				? process.env.NEXT_PUBLIC_REDIRECT_URL
				: "",
			state: "dj29fnsadjsd82",
			codeVerifier: "FGH767Gd65",
			scope: "email phone",
		});
		const oneTap = new VKID.OneTap();
		const container = document.getElementById("VkIdSdkOneTap");
		if (container) {
			oneTap.render({ container }).on(VKID.WidgetEvents.ERROR, console.error);
		}
		const params = new URLSearchParams(window.location.search);
		let code = params.get("code");
		let deviceId = params.get("device_id");
		const exchangeCode = async () => {
			try {
				const result = await VKID.Auth.exchangeCode(
					code ? code : "",
					deviceId ? deviceId : ""
				);
				console.log("result", result);
			} catch (error) {
				console.log("Error");
				console.error(error);
			}
		};
		if (code && deviceId) {
			exchangeCode();
		}
	}, []);

	const login = async () => {
		try {
			const result = await VKID.Auth.login();
			console.log(result);
		} catch (error) {
			console.log("error");
		}
	};

	return (
		<div
			className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
		>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<h1>Блог</h1>
				{data && !error && <PostList posts={data.posts} />}
				<div id="VkIdSdkOneTap"></div>
				<button onClick={login}>Login</button>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
		</div>
	);
}

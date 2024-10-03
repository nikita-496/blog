import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<script src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"></script>
			</Head>
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

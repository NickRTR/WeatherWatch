export function selectTextOnFocus(node) {
	function handleFocus() {
		node && typeof node.select === "function" && node.select();
	}
	node.addEventListener("focus", handleFocus);
	return {
		destroy() {
			node.removeEventListener("focus", handleFocus);
		}
	};
}

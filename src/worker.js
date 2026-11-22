export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      const mobileHint = request.headers.get("Sec-CH-UA-Mobile");
      const mobile = mobileHint === null
        ? /Mobile|iPhone|iPod|Windows Phone/i.test(request.headers.get("User-Agent") || "")
        : mobileHint === "?1";
      url.pathname = mobile ? "/mobile.html" : "/index.html";
      const asset = await env.ASSETS.fetch(new Request(url, request));
      const response = new Response(asset.body, asset);
      response.headers.append("Vary", "Sec-CH-UA-Mobile, User-Agent");
      response.headers.set("Cache-Control", "private, no-cache");
      return response;
    }
    else if (["/mobile", "/about"].includes(url.pathname)) url.pathname += ".html";
    else return env.ASSETS.fetch(request);
    return env.ASSETS.fetch(new Request(url, request));
  }
};

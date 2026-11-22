export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") url.pathname = "/index.html";
    else if (["/mobile", "/about"].includes(url.pathname)) url.pathname += ".html";
    else return env.ASSETS.fetch(request);
    return env.ASSETS.fetch(new Request(url, request));
  }
};

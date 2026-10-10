module.exports = {
  async redirects() {
    return [
      { source: "/articles/VIP/WGa8Mm2t", destination: "/article/WGa8Mm2t", permanent: true },
      { source: "/articles/VIP/Kcr8I81t", destination: "/article/Kcr8I81t", permanent: true },
      ...["/register", "/account/:path*", "/articles/:path*", "/guide/:path*", "/perk/:path*", "/website"].map(source => ({source, destination: `https://www.wise-invest.org${source}`, permanent: false})),
    ];
  }
};

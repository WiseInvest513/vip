module.exports = {
  async redirects() {
    return ["/register", "/account/:path*", "/articles/:path*", "/guide/:path*", "/perk/:path*", "/point/:path*", "/website"].map(source => ({source, destination: `https://www.wise-invest.org${source}`, permanent: false}));
  }
};

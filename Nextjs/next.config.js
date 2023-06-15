module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/dashboard/:path*': { page: '/dashboard' },
    }
  },
}

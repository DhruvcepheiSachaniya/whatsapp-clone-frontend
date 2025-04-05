import webpack from "webpack";

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
      global: "window",
    }),
  ],
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
};

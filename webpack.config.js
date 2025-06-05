const path = require('path');

module.exports = {
    entry: './src/index.tsx', // or wherever your entry point is
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    devServer: {
        static: './dist',
        hot: true,
    },
};

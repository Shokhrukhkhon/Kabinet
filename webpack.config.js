module.exports = {
    entry: './src/app.tsx',
    output: {
        path: __dirname + '/public',
        filename: "build/app.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.scss$/,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' },
                  { loader: 'sass-loader' }
                ]
            }
        ]
    }
}
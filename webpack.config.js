const path = require('path');
const fs = require('fs');

const tsFiles = fs.readdirSync(path.join(__dirname, 'ts',)).map(x=> path.join(__dirname, 'ts',x))

console.log(tsFiles)

module.exports = {
    entry: tsFiles,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'js','dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
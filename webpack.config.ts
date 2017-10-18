import * as webpack from 'webpack';
import * as path from 'path';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

const extractSass = new ExtractTextPlugin({
    filename: "./css/main.css"
});

let configure: webpack.Configuration;

configure = {
    entry: './main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader',
                    publicPath: ".."
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader?name=/img/[name].[ext]'                      
                    }
                ]
            },
            {
                test: /\.(otf)$/,
                use: [
                    {
                        loader: 'file-loader?name=/fonts/[name].[ext]'                      
                    }
                ]
            }
        ]
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
    watch: false,
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }

}

export default configure;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Mode = process.env.ENV === "production" ? "production" : "development";
module.exports = {
    mode: Mode,
    entry: './src/index.tsx',
    output: {
        publicPath: '/'
    },

    module: {
        // коллекция правил как обрабатывать модули
        rules: [{ // load js files
            test: /\.js$/, // выбираем расширения которые хотим обработать лоадером
            exclude: /node_modules/, // не обрабатывать лоадером файлы из node modules
            use: [ // указываем какой лоадер мы будем использовать
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    }
                },
            ]
        },
            { // load typesript files
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                }
            },
            { // load css files
                test: /\.css$/, // выбираем расширения которые хотим обработать лоадером
                exclude: /node_modules/, // не обрабатывать лоадером файлы из node modules
                use: [Mode === 'production' ? // указываем какой лоадер мы будем использовать 
                    {
                        loader: MiniCssExtractPlugin.loader
                    } :
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }, // первым сработает последний лоадер
                ]
            },
            { // load sass/scss files
                test: /\.scss$/, // выбираем расширения которые хотим обработать лоадером
                exclude: /node_modules/, // не обрабатывать лоадером файлы из node modules
                use: [Mode === 'production' ? // указываем какой лоадер мы будем использовать
                    {
                        loader: MiniCssExtractPlugin.loader
                    } :
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    } // первым сработает последний лоадер
                ]
            },
            { // load images
                test: /\.(png|jpg|jpeg|gif|ico)$/, // выбираем расширения которые хотим обработать лоадером
                use: [ // указываем какой лоадер мы будем использовать
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images', // положить все изображения в папку images
                            name: '[name]-[sha1:hash:7].[ext]' // динамически создаем имя hash из 7 символов
                        }
                    }
                ]
            },
            { // load fonts
                test: /\.(ttf|otf|eot|woff|woff2)$/, // выбираем расширения которые хотим обработать лоадером
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts', // положить все шрифты в папку fonts
                        name: '[name].[ext]' // название шрифта и его расширение
                    }
                }]
            }
        ]
    },

    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main-[hash:8].css'
        })
    ],

    devServer: {
        open: true,
        historyApiFallback: true
    }
};
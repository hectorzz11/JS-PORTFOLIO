const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename:'assets/images/[hash][ext][query]'
  },
  mode:'development',
  watch:true,
  resolve: {
    extensions: ['.js'],
    alias:{
      //arroba para identificarse como alias
      //path para saber donde estamos
      '@utils':path.resolve(__dirname,'src/utils'),
      '@templates':path.resolve(__dirname,'src/templates'),
      '@styles':path.resolve(__dirname,'src/styles'),
      '@images':path.resolve(__dirname,'src/assets/images'),

    }
  },
  //se tiene un modulo objeto, internamente utiliza rules para establecer un arreglo
  module:{
    rules:[
      {
        //que tipo de extensiones se van a usar
        //cualquier archivo que empiece con m o js
        //expresiones regulares
        //no utilizar node_modules
        test:/\.m?js$/,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader'
        }
      },
      {
        test:/\.css|.styl$/i,
        use:[MiniCssExtractPlugin.loader,
        'css-loader',
        'stylus-loader'      
      ],
      },
      {
        test:/\.png/,
        type:'asset/resource'
      },
      {
        test:/\.(woff|woff2)$/,
        use:{
          loader: 'url-loader',
          options: {
            limit:10000,
            mimeType:"application/font-woff",
            name:"[name].[contenthash].[ext]",
            outputPath:"./assets/fonts/",
            publicPath:"../assets/fonts/",
            esmModule:false,
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      //hace insercción de los elementos
    inject:true,
    //se usa el template
      template:'./public/index.html',
      //lo pondra en la carpeta distribution con el nombre
      filename:'./index.html'
    }),
    new MiniCssExtractPlugin({
      //mover a los assets
      filename:'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      //de donde a donde se va a mover a dist
      patterns:[{
        //aqui se mueve
          from:path.resolve(__dirname,"src","assets/images"),
        //aa
        to:"assets/images"
      }
    ]
    }),
    new Dotenv(),
  ],
  
}
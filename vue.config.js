module.exports = {
    devServer: {
        proxy: 'https://localhost:3333',
        ws: true,
        changeOrigin: true,
    }
}
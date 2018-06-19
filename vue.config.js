module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api/graphql': {
                target: 'https://courses-frontend.simbirsoft1.com/api/graphql',
                changeOrigin: true
            }
        }
    }
};
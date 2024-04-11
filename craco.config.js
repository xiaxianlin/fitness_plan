const path = require('path');
module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@struct': path.resolve(__dirname, 'src/struct'),
            '@services': path.resolve(__dirname, 'src/services'),
        },
    },
};

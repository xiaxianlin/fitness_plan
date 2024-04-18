const path = require('path');
const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@struct': path.resolve(__dirname, 'src/struct'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@models': path.resolve(__dirname, 'src/models'),
        },
    },
};

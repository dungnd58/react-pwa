const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    if(process.env.NODE_ENV === 'production') {
        //We will import the workbox-webpack-plugin and map over all the plugins 
        //till we get to the GenerateSW plugin, 
        //which we will then replace with InjectManifest plugin from Workbox.
        config.plugins = config.plugins.map(plugin => {
            if(plugin.constructor.name === 'GenerateSW') {
                return new WorkboxWebpackPlugin.InjectManifest({
                    swSrc: './src/my-serviceworker.js',
                    swDest: 'service-worker.js'
                });
            }
            return plugin;
        })
    }
    return config;
}
import config from '../config/config.json';
import _ from 'lodash';

const getConfigFile = (env : string) => {
    try{
        const config = require(`../config/config_${env.toLowerCase()}.json`);
        return config;
    }catch(e){
    }

    return null;
};

export const getConfig = () => {
    const env = process.env.REACT_APP_ENV || 'local';
    const environmentConfig = getConfigFile(env);

    return _.merge(config, environmentConfig ||{});
}
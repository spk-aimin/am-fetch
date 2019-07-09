'use strict';
import utils from './utils'
import bind from './helpers/bind'
import RequestFactory from './core/RequestFactory'
import mergeConfig from './core/mergeConfig'
import defaults from './defaults'

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new RequestFactory(defaultConfig);
  var instance = bind(RequestFactory.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, RequestFactory.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var amfetch = createInstance(defaults);

// Factory for creating new instances
amfetch.create = function create(instanceConfig) {
  return createInstance(mergeConfig(amfetch.defaults, instanceConfig));
};

// Expose all/spread
amfetch.all = function all(promises) {
  return Promise.all(promises);
}
export default amfetch
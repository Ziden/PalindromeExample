
module.exports = {

  HTTP_CODES: {
    BAD_REQUEST: 400,
    OK: 200,
  },

  /**
  * Read the endpoints settled in the service and hook them up on an
  * Express server.
  * @param {string} service  The service instance to be hooked up
  */
  registerService: (service, express) => {
    console.log(`Registering Service ${service.constructor.name}`);
    service.endpoints.forEach(endpoint => {
      const method = endpoint.method;
      const fullPath = `${service.path}${endpoint.path}`;
      const callbackFunction = service[endpoint.functionName];
      console.log(
        `Registering ${method} ${fullPath} to ${endpoint.functionName}`
      );
      express[method](fullPath, callbackFunction.bind(service));
    });
  },

  /**
  * Decorator to populate a service class instance "endpoints"
  * property according to the decorated methods parameters
  * @param {string} method  The REST method name
  * @param {string} path    The REST method path
  */
  serviceFunction: (method, path) => {
    return (decoratorClass, functionName, functionDescriptor) => {
      decoratorClass.endpoints = decoratorClass.endpoints || [];
      decoratorClass.endpoints.push({
        method: method,
        path: path,
        functionName: functionName,
      });
    };
  },
};

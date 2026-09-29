
export function applyLoggingDecorator(service: any,location:any): any {
  
return new Proxy(service, {
  get(target: any, propertyKey: string | symbol, receiver: any) {
    // console.log(receiver);
    const originalMethod = target[propertyKey];
    if (typeof originalMethod === 'function') {
      return function (this:any,...args: any[]) {
        const methodName = String(propertyKey);

        if( methodName!="app_add_para" && methodName!="get_current_record" && location != 'canvas-modal-service'){
          console.log(`From component ${location} Entering method ${methodName} with arguments: `,args);
        }
        
        let obj={
          functionName:methodName,
          value:args
        }
        logData.push(obj)

        // return;
        try {
          const result = originalMethod.apply(this, args);
          if (result instanceof Promise) {
            return result
              .then((res: any) => {
                if( methodName!="app_add_para" && methodName!="get_current_record"){
                // console.log(`From component ${location} Exiting method  ${methodName} with result: `,res);
                }
                return res;
              })
              .catch((err: any) => {
                console.log(`From component ${location} Error in ${methodName}: ${err.message}`);
                throw err;
              });
          } else {
            if( methodName!="app_add_para" && methodName!="get_current_record"){
              // console.log(` From component ${location} Exiting method ${methodName} with result: `,result);
              }
            return result;
          }
        } catch (error:any) {
          console.log(`From component ${location} Error in ${methodName}: ${error.message}`);
          throw error;
        }
      };
    }
    return originalMethod;
  }
});
}
export let logData:any=[]
export function LogFunctionCalls(location:any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    // const logger = new LoggerService();
    descriptor.value = function (...args: any[]) {
    
      console.log("logTest")
      let obj = {
        functionName: propertyKey,
        value: args,
        location:location
      }
      logData.push(obj);
    
      const result = originalMethod.apply(this, args);
      // logger.logData(`Function ${propertyKey} returned: ${JSON.stringify(result)}`);
      return result;
    };

    return descriptor;
  };
}
export function clearlogdata(){
  logData=[]
  console.log(logData)
}
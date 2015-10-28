import {
  listRunningKernels, connectToKernel, startNewKernel, getKernelSpecs
} from 'jupyter-js-services';

// get a list of available kernels and connect to one
listRunningKernels('http://localhost:8000').then((kernelModels) => {
  var options = {
    baseUrl: 'http://localhost:8000',
    wsUrl: 'ws://localhost:8000',
    name: kernelModels[0].name
  }
  connectToKernel(kernelModels[0].id, options).then((kernel) => {
    console.log(kernel.name);
  });
});


// get info about the available kernels and start a new one
getKernelSpecs('http://localhost:8888').then((kernelSpecs) => {
  console.log('Default spec:', kernelSpecs.default);
  console.log('Available specs', Object.keys(kernelSpecs.kernelspecs));
  // use the default name
  var options = {
    baseUrl: 'http://localhost:8888',
    wsUrl: 'ws://localhost:8888',
    name: kernelSpecs.default
  }
  startNewKernel(options).then((kernel) => {
    // execute and handle replies
    var future = kernel.execute({ code: 'a = 1' } );
    future.onDone = () => {
      console.log('Future is fulfilled');
    }
    future.onIOPub = (msg) => {
      console.log(msg.content);  // rich output data
    }

    // restart the kernel and then send an inspect message
    kernel.restart().then(() => {
      var request = { code: 'hello', cursor_pos: 4, detail_level: 0};
      kernel.inspect(request).then((reply) => {
        console.log(reply.data);
      });
    });

    // interrupt the kernel and then send a complete message
    kernel.interrupt().then(() => {
      kernel.complete({ code: 'impor', cursor_pos: 4 } ).then((reply) => {
        console.log(reply.matches);
      });
    });

    // register a callback for when the kernel changes state
    kernel.statusChanged.connect((status) => {
      console.log('status', status);
    });

    // kill the kernel
    kernel.shutdown().then(() => {
      console.log('Kernel shut down');
    });
  });
});
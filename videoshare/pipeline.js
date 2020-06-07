var AWS = require('aws-sdk');
var response = require('cfn-response');

var elastictranscoder = new AWS.ElasticTranscoder();

const handler = (event, context, callback) => {
  console.log('Welcome Ankit. Its cloudformation trigger.');
  console.log('event: ' + JSON.stringify(event));
  if (event.RequestType == 'Delete') {
    var params = {
      "Id": event.PhysicalResourceId
    }
    elastictranscoder.deletePipeline(params)
    .promise()
    .then((data)=>{
      console.log(`ElasticTranscoder Delete Success data: ${JSON.stringify(data)}`);
      var responseStatus = "SUCCESS";
      var responseData = data
      response.send(event, context, responseStatus, responseData, event.PhysicalResourceId);
      return
    }).catch((error) =>{
      console.log(`ElasticTranscoder Delete failed data: ${JSON.stringify(error)}`);
      var responseStatus = "FAILED";
      var responseData = error;
      response.send(event, context, responseStatus, responseData);
      return
    })
}
  else if (event.RequestType == 'Create') {
    var params = {
      "InputBucket": event.ResourceProperties.InputBucket[0], /* required */
      "Name": event.ResourceProperties.Name, /* required */
      "Role": event.ResourceProperties.Role[0],/* required */
      "OutputBucket": event.ResourceProperties.OutputBucket[0],
    }
    console.log(params);
    elastictranscoder.createPipeline(params)
    .promise()
    .then((data)=> {
      // Success
            console.log(`ElasticTranscoder Create Success data: ${JSON.stringify(data)}`);
            var responseStatus = "SUCCESS";
            responseData = {
              "Arn": data.Pipeline.Arn,
              "Id": data.Pipeline.Id,
             }
            response.send(event, context, responseStatus, responseData, data.Pipeline.Id);
            return
    }).catch((error) =>{
      console.log(`ElasticTranscoder Create failed data: ${JSON.stringify(error)}`);
      var responseStatus = "FAILED";
      var responseData=error;
      response.send(event, context, responseStatus, responseData);
      return
    });
}
else {
    var responseStatus = "SUCCESS";
    var responseData = { "Value": "No Option found."};
    console.log(responseData);
    response.send(event, context, responseStatus, responseData);
    return
  }


}

module.exports = {
    handler
};

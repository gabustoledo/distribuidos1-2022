const kafka = require("kafka-node");

const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'})
 
var topicsToCreate = [{
  topic: 'daily',
  partitions: 1,
  replicationFactor: 1
},
{
  topic: 'hourly',
  partitions: 1,
  replicationFactor: 1,
}];
 
client.createTopics(topicsToCreate, (error, result) => {});
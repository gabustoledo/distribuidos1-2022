const kafka = require("kafka-node");

const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'})
 
var topicsToCreate = [{
  topic: 'daily1',
  partitions: 1,
  replicationFactor: 1
},{
  topic: 'daily2',
  partitions: 1,
  replicationFactor: 1
},
{
  topic: 'hourly1',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'hourly2',
  partitions: 1,
  replicationFactor: 1,
}];
 
client.createTopics(topicsToCreate, (error, result) => {});
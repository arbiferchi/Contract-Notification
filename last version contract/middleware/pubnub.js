const PubNub = require('pubnub');

const pubnub = new PubNub({
  publishKey: "pub-c-b54ea0a8-6300-4d39-bf12-5772ff4294da",
  subscribeKey: "sub-c-02e855f9-07a1-4ea2-a8c0-3413e25ffea7",
  userId: "sec-c-MmUzNzRlN2ItMTFlMy00ZmQ2LTkyOTUtMzM5N2Y1MGE0OGVl",
});
module.exports = pubnub;

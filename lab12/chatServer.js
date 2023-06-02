var net = require('net');
var eol = require('os').EOL;

var srvr = net.createServer();
var clientList = [];

srvr.on('connection', function(client) {
  client.name = client.remoteAddress + ':' + client.remotePort;
  client.write('Welcome, ' + client.name + eol);
  clientList.push(client);

  client.on('data', function(data) {
    broadcast(data, client);
  });
});
/*
function broadcast(data, client) {
  for (var i in clientList) {

    if (client !== clientList[i]) {
      clientList[i].write(client.name + " says " + data);
    }
  }
}
*/

function broadcast(data, client) {
  for (var i in clientList) {
    if(data.toString().includes("\\list"))
    {
      if (client === clientList[i]){
        for(var a in clientList)
        {
          if(client !== clientList[a])
          {
            clientList[i].write(clientList[a].name);
          }
        }
    }
    }
    else if(data.toString().includes("\\rename"))
    {
      if (client === clientList[i]){
      arr = data.toString().split(" ");
      clientList[i].name=arr[1].trim();
      client.write(" # Your new name is : " + client.name +"\r\n"+eol);
    }
  }
    else if(data.toString().includes("\\private "))
    {
      arr = data.toString().trim().split(" ");
      for(var a in clientList)
      {
        if(clientList[a].name === arr[1])
        {
          clientList[i].write(clientList[a].name + " says " + arr[2]);
        }
      }
    }
    else {
      if (client !== clientList[i]) {
      clientList[i].write(client.name + " says " + data);
    }
  }
  }
}


srvr.listen(9000);



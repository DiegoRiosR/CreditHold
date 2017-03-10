var database = null;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() 
{
   database = window.openDatabase("Customer","1.0","Test Select",2 * 1024 * 1024);
   database.transaction(CreateDataCust, errorDB, successDB);
}

function CreateDataCust(tx) 
{
   tx.executeSql("Create Table IF NOT EXISTS Customer(ID INT, Name text, saldo int)");
   tx.executeSql("Insert Into Customer values(1035, 'Diego Rios', 15000)");
   tx.executeSql("Insert Into Customer values(1036, 'Julio Rios', 15000)");
   tx.executeSql("Insert Into Customer values(1037, 'Victor Rios', 15000)");
}

function successDB(tx) 
{
  console.log("OK");
}   

function SelectCust(tx) 
{   
   database = window.openDatabase("Customer","1.0","Test Select",200000);
   database.transaction(SelectCustt, errorDB, successDB);
}

function SelectCustt(tx) 
{   
   tx.executeSql("Select * From Customer", [], ResultSucces ,errorDB );
}

function ResultSucces(tx ,response) 
{
  alert(response.rows.length );
  for(var i = 0; i < response.rows.length; i++)
  {
    console.log(response.rows.item(i).ID + "  " + response.rows.item(i).Name);
  }
}

function errorDB(error) 
{
  console.log(error);
}
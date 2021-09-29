'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Users object constructor

var Users = function(req,users){
    
this.Id = users.Id;
this.AccountId = users.AccountId;
this.UserName = users.UserName;
this.Password = users.Password;
this.Email = users.Email;
this.IsActive = users.IsActive;
this.IsAdmin = users.IsAdmin;
this.LastLoginTime = users.LastLoginTime;
this.CreatedDate = users.CreatedDate;
this.Creator = users.Creator;
this.ModifiedDate = users.ModifiedDate;
this.Modifier = users.Modifier;
};
Users.create = function (req,newUsers, result) {    
        sql.query("INSERT INTO users set ?",newUsers, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Users.getById = function (req,Id, result) {
        sql.query("SELECT  t.* FROM users t  WHERE t.Id= ? LIMIT 0,1", Id, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else if(res && res.length>0){
                    result(null, res);
              
                }else{
                    result("Record Not Found", null);
                }
            });   
};
Users.totalCount = function (req,result) {
        sql.query("SELECT count(*) TotalCount FROM users t  ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Users.totalSearchCount = function (req,searchKey,result) {
        sql.query("SELECT count(*) TotalCount FROM users t  WHERE  LOWER(t.Id) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.AccountId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.UserName) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.Password) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.Email) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.IsActive) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.IsAdmin) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LastLoginTime) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CreatedDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.Creator) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.ModifiedDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.Modifier) LIKE CONCAT('%','"+searchKey+"','%') ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Users.getAll = function (req,offset,pageSize,result) {
        sql.query("SELECT  t.* FROM users t  LIMIT ?, ?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('users : ', res);  

                 result(null, res);
                }
            });   
};
Users.search = function (req,searchKey,offset,pageSize,result) {

        sql.query("SELECT  t.* FROM users t  WHERE  LOWER(t.Id) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.AccountId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.UserName) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.Password) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.Email) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.IsActive) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.IsAdmin) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LastLoginTime) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CreatedDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.Creator) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.ModifiedDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.Modifier) LIKE CONCAT('%','"+searchKey+"','%') LIMIT ?,?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('users : ', res);  

                 result(null, res);
                }
            });   
};
Users.updateById = function(req,Id, users, result){
  sql.query("UPDATE users SET Id = ?,AccountId = ?,UserName = ?,Password = ?,Email = ?,IsActive = ?,IsAdmin = ?,LastLoginTime = ?,CreatedDate = ?,Creator = ?,ModifiedDate = ?,Modifier = ? WHERE Id= ?",[ users.Id, users.AccountId, users.UserName, users.Password, users.Email, users.IsActive, users.IsAdmin, users.LastLoginTime, users.CreatedDate, users.Creator, users.ModifiedDate, users.Modifier,Id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Users.remove = function(req,Id, result){
     sql.query("DELETE FROM users Where Id=?",[Id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Users;

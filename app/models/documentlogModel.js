'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Documentlog object constructor

var Documentlog = function(req,documentlog){
    
this.DocumentId = documentlog.DocumentId;
this.LogDate = documentlog.LogDate;
this.LogOper = documentlog.LogOper;
};
Documentlog.create = function (req,newDocumentlog, result) {    
        sql.query("INSERT INTO documentlog set ?",newDocumentlog, function (err, res) {
                
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
Documentlog.getById = function (req,DocumentId, result) {
        sql.query("SELECT  t.* FROM documentlog t  WHERE t.DocumentId= ? LIMIT 0,1", DocumentId, function (err, res) {             
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
Documentlog.totalCount = function (req,result) {
        sql.query("SELECT count(*) TotalCount FROM documentlog t  ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Documentlog.totalSearchCount = function (req,searchKey,result) {
        sql.query("SELECT count(*) TotalCount FROM documentlog t  WHERE  LOWER(t.DocumentId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LogDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LogOper) LIKE CONCAT('%','"+searchKey+"','%') ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Documentlog.getAll = function (req,offset,pageSize,result) {
        sql.query("SELECT  t.* FROM documentlog t  LIMIT ?, ?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('documentlog : ', res);  

                 result(null, res);
                }
            });   
};
Documentlog.search = function (req,searchKey,offset,pageSize,result) {

        sql.query("SELECT  t.* FROM documentlog t  WHERE  LOWER(t.DocumentId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LogDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LogOper) LIKE CONCAT('%','"+searchKey+"','%') LIMIT ?,?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('documentlog : ', res);  

                 result(null, res);
                }
            });   
};
Documentlog.updateById = function(req,DocumentId, documentlog, result){
  sql.query("UPDATE documentlog SET DocumentId = ?,LogDate = ?,LogOper = ? WHERE DocumentId= ?",[ documentlog.DocumentId, documentlog.LogDate, documentlog.LogOper,DocumentId], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Documentlog.remove = function(req,DocumentId, result){
     sql.query("DELETE FROM documentlog Where DocumentId=?",[DocumentId], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Documentlog;

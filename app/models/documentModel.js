'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Document object constructor

var Document = function(req,document){
    
this.DocumentId = document.DocumentId;
this.CustomerId = document.CustomerId;
this.DocType = document.DocType;
this.DocIdentity = document.DocIdentity;
this.CreatedDate = document.CreatedDate;
this.ActivateDate = document.ActivateDate;
this.CancelDate = document.CancelDate;
this.InAmount = document.InAmount;
this.OutAmount = document.OutAmount;
this.BalanceAmount = document.BalanceAmount;
this.DocStatus = document.DocStatus;
this.CustomerId_Value = document.CustomerId_Value;
};
Document.create = function (req,newDocument, result) {    
        sql.query("INSERT INTO document set ?",newDocument, function (err, res) {
                
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
Document.getById = function (req,DocumentId, result) {
        sql.query("SELECT  ee.CustName as CustomerId_Value, t.* FROM document t  join customer ee on t.CustomerId = ee.CustomerId  WHERE t.DocumentId= ? LIMIT 0,1", DocumentId, function (err, res) {             
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
Document.totalCount = function (req,result) {
        sql.query("SELECT count(*) TotalCount FROM document t  join customer ee on t.CustomerId = ee.CustomerId  ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Document.totalSearchCount = function (req,searchKey,result) {
        sql.query("SELECT count(*) TotalCount FROM document t  join customer ee on t.CustomerId = ee.CustomerId  WHERE  LOWER(t.DocumentId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustomerId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.DocType) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.DocIdentity) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CreatedDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.ActivateDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CancelDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.InAmount) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.OutAmount) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.BalanceAmount) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.DocStatus) LIKE CONCAT('%','"+searchKey+"','%') ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Document.getAll = function (req,offset,pageSize,result) {
        sql.query("SELECT  ee.CustName as CustomerId_Value, t.* FROM document t  join customer ee on t.CustomerId = ee.CustomerId  LIMIT ?, ?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('document : ', res);  

                 result(null, res);
                }
            });   
};
Document.search = function (req,searchKey,offset,pageSize,result) {

        sql.query("SELECT  ee.CustName as CustomerId_Value, t.* FROM document t  join customer ee on t.CustomerId = ee.CustomerId  WHERE  LOWER(t.DocumentId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustomerId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.DocType) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.DocIdentity) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CreatedDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.ActivateDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CancelDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.InAmount) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.OutAmount) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.BalanceAmount) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.DocStatus) LIKE CONCAT('%','"+searchKey+"','%') LIMIT ?,?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('document : ', res);  

                 result(null, res);
                }
            });   
};
Document.updateById = function(req,DocumentId, document, result){
  sql.query("UPDATE document SET DocumentId = ?,CustomerId = ?,DocType = ?,DocIdentity = ?,CreatedDate = ?,ActivateDate = ?,CancelDate = ?,InAmount = ?,OutAmount = ?,BalanceAmount = ?,DocStatus = ? WHERE DocumentId= ?",[ document.DocumentId, document.CustomerId, document.DocType, document.DocIdentity, document.CreatedDate, document.ActivateDate, document.CancelDate, document.InAmount, document.OutAmount, document.BalanceAmount, document.DocStatus,DocumentId], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Document.remove = function(req,DocumentId, result){
     sql.query("DELETE FROM document Where DocumentId=?",[DocumentId], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Document;

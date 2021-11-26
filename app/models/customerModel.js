'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Customer object constructor

var Customer = function(req,customer){
    
this.CustomerId = customer.CustomerId;
this.CustName = customer.CustName;
this.CustIdentity = customer.CustIdentity;
this.CustCert = customer.CustCert;
this.CustDocType = customer.CustDocType;
this.CustFinalDate = customer.CustFinalDate;
this.CustActivationDate = customer.CustActivationDate;
this.CustSale = customer.CustSale;
this.CustPay = customer.CustPay;
this.CustReLoad = customer.CustReLoad;
this.CustStatus = customer.CustStatus;
this.CustInfoAdic1 = customer.CustInfoAdic1;
this.CustInfoAdic2 = customer.CustInfoAdic2;
this.CustInfoAdic3 = customer.CustInfoAdic3;
this.CustInfoAdic4 = customer.CustInfoAdic4;
this.CustDateAdic1 = customer.CustDateAdic1;
this.CustDateAdic2 = customer.CustDateAdic2;
this.CustValueAdic1 = customer.CustValueAdic1;
this.CustValueAdic2 = customer.CustValueAdic2;
this.CustValueAdic3 = customer.CustValueAdic3;
};
Customer.create = function (req,newCustomer, result) {    
        sql.query("INSERT INTO customer set ?",newCustomer, function (err, res) {
                
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
Customer.getById = function (req,CustomerId, result) {
        sql.query("SELECT  t.* FROM customer t  WHERE t.CustomerId= ? LIMIT 0,1", CustomerId, function (err, res) {             
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
Customer.totalCount = function (req,result) {
        sql.query("SELECT count(*) TotalCount FROM customer t  ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Customer.totalSearchCount = function (req,searchKey,result) {
        sql.query("SELECT count(*) TotalCount FROM customer t  WHERE  LOWER(t.CustomerId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustName) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustIdentity) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustCert) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustDocType) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustFinalDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustActivationDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustSale) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustPay) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustReLoad) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustStatus) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustInfoAdic1) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustInfoAdic2) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustInfoAdic3) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustInfoAdic4) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustDateAdic1) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustDateAdic2) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustValueAdic1) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustValueAdic2) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustValueAdic3) LIKE CONCAT('%','"+searchKey+"','%') ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Customer.getAll = function (req,offset,pageSize,result) {
        sql.query("SELECT  t.* FROM customer t  LIMIT ?, ?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('customer : ', res);  

                 result(null, res);
                }
            });   
};
Customer.search = function (req,searchKey,offset,pageSize,result) {

        sql.query("SELECT  t.* FROM customer t  WHERE  LOWER(t.CustomerId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustName) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustIdentity) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustCert) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustDocType) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustFinalDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustActivationDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustSale) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustPay) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustReLoad) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustStatus) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustInfoAdic1) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustInfoAdic2) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustInfoAdic3) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustInfoAdic4) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustDateAdic1) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustDateAdic2) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustValueAdic1) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustValueAdic2) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.CustValueAdic3) LIKE CONCAT('%','"+searchKey+"','%') LIMIT ?,?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('customer : ', res);  

                 result(null, res);
                }
            });   
};
Customer.updateById = function(req,CustomerId, customer, result){
  sql.query("UPDATE customer SET CustomerId = ?,CustName = ?,CustIdentity = ?,CustCert = ?,CustDocType = ?,CustFinalDate = ?,CustActivationDate = ?,CustSale = ?,CustPay = ?,CustReLoad = ?,CustStatus = ?,CustInfoAdic1 = ?,CustInfoAdic2 = ?,CustInfoAdic3 = ?,CustInfoAdic4 = ?,CustDateAdic1 = ?,CustDateAdic2 = ?,CustValueAdic1 = ?,CustValueAdic2 = ?,CustValueAdic3 = ? WHERE CustomerId= ?",[ customer.CustomerId, customer.CustName, customer.CustIdentity, customer.CustCert, customer.CustDocType, customer.CustFinalDate, customer.CustActivationDate, customer.CustSale, customer.CustPay, customer.CustReLoad, customer.CustStatus, customer.CustInfoAdic1, customer.CustInfoAdic2, customer.CustInfoAdic3, customer.CustInfoAdic4, customer.CustDateAdic1, customer.CustDateAdic2, customer.CustValueAdic1, customer.CustValueAdic2, customer.CustValueAdic3,CustomerId], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Customer.remove = function(req,CustomerId, result){
     sql.query("DELETE FROM customer Where CustomerId=?",[CustomerId], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Customer;

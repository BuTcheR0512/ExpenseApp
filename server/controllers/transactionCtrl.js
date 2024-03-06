const transactionModel = require("../models/transactionModel");
const moment=require('moment')
const getAlltransaction = async (req, res) => {
  try {
    const {frequency,selectedDate,type}= req.body
   
     const transactions = await transactionModel.find({
      ...(frequency!=='custom'?{
      date:{
        $gt: moment().subtract(Number(req.body.frequency),"d").toDate(),
     }
    
    }:{
        date:{
          $gte:selectedDate[0],
          $lte:selectedDate[1]
        }
    })  ,
    ...(type!=='all'&&{type}),
      
      

   
    
     
     
      userid: req.body.userid,
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(erorr);
  }
};
 const  deleteTransaction=async(req,res)=>{
    try {
    await  transactionModel.findByIdAndDelete({_id:req.body.transactionId})
    res.status(200).send('Transaction deleted Successfully')
    } catch (error) 
    {
      console.log(error)
      res.status(500).json(error)
    }
 }
const editTransaction=async(req,res)=>{
  try {
    await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
    res.status(200).send("Edit Successful")
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
    
  }
}

const addtransaction = async (req, res) => {
  try {
    // const newtransaction = new transactionModel(req.body);
    const newtransaction = new transactionModel(req.body);
    await newtransaction.save();
    res.status(201).send("transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAlltransaction, addtransaction ,editTransaction,deleteTransaction};

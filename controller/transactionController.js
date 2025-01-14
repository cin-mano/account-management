const Transaction = require("../db/models/transaction");

exports.addTransaction = async(req,res) => {

    try {
        const data = req.body
        console.log("ghjkjh", data)
     const currentTransaction = await Transaction.find({}).sort({'createdAt':-1}).limit(1).lean();
     const runningBalance = +currentTransaction?.[0]?.runningBalance
     console.log(runningBalance,"??????")
     if(runningBalance){
        if(data?.transactionType == 'credit')
        {
            data.runningBalance = runningBalance + +(data?.amount)
        }
    else{
        data.runningBalance = runningBalance - +(data?.amount)
    }
     }
     else{
        data.runningBalance = +(data?.amount)
    }
        if(data?.transactionType && data?.amount && data.description && (data?.transactionType == 'credit' || data?.transactionType=='debit')){
            const transaction = new Transaction(data)
           const result = await transaction.save();
    
            return res.status(200).json({
                success: true,
                status: 200,
                result: result
            })
        }
        else{
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Data is incorrect.'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: error.message
        })
    }
}

exports.transactionList = async(req,res) => {
    try {
     let page = req.params.page ?? 1;
     let limit = req.params.limit ?? 10;

     const data = await Transaction.find({}).sort({'createdAt':-1}).skip((page-1)*limit).limit(limit);
     return res.status(200).json({
        success: true,
        status: 200,
        result: data
    })

    } catch (error) {
        
    }
}
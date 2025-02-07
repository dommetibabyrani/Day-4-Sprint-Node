const getAllFactory = function (ElementModel){
    return async function(req,res) {
        try{
            const elementData = await ElementModel.find();
            if(elementData.length == 0){
                throw new Error ("No element found");
            }
            res.status(200).json({
                status:"success",
                message:elementData
            })
    
        }catch(err){
            res.status(404).json({
                status:"failure",
                message:err.message
            })
        }
        
    }
    

}

const createFactory = function (ElementModel){
    return async function(req,res){
        try{
            const elementDetails = req.body;
            // adding user to DB
            const element = await ElementModel.create(elementDetails);
            res.status(200).json({
                status:"success",
                message:`add the element`,
                element,
            })
        }catch(err){
            res.status(500).json({
                status:"failure",
                message:err.message
            })
        }
    }
}

const getByIdFactory = (ElementModel) =>{
    return async function(req,res) {
        try{
            const elementId = req.params.elementId;
            const elementDetails = await ElementModel.findById(elementId);
            if(elementDetails == "no element found"){
                throw new Error(`user with ${elementId} not found`)
            }else{
                res.status(200).json({
                    status:"success",
                    message:elementDetails
                })
            }
    
        }catch(err){
            res.status(404).json({
                status:"failure",
                message:err.message
            })
        }
        
    }
}

const deleteByIdFactory = (ElementModel) =>{
    return async function (req,res) {
        let {elementId} = req.params;
        try{
            let Element = await ElementModel.findByIdAndDelete(elementId);
            if(Element == "no element found"){
                throw new Error(`user with ${elementId} not found`);
            }else{
                res.status(200).json({
                    status:"Successfully Deleted",
                    message:Element
                })
            }
    
        }catch(err){
            res.status(404).json({
                status:"failure",
                message:err.message
            })
        }
    
        
    }
}

module.exports = {getAllFactory,
                  createFactory,
                  getByIdFactory,
                  deleteByIdFactory
                  }
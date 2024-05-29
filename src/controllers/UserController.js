const {UserOTPService, ReadProfileService, SaveProfileService, VerifyLoginService} = require("../services/UserServices");
exports.UserOTP = async (req,res)=>{
    let result = await UserOTPService(req);
    return res.status(200).json(result);
}

exports.VerifyLogin = async (req,res)=>{
    let result = await VerifyLoginService(req);
    if(result['status'] === "success"){
        let cookieOption = {expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httponly:false}
        res.cookie("token", result['token'],cookieOption)
        return res.status(200).json(result);
    }
    else {
        return res.status(200).json(result);
    }
}

exports.UserLogout = async (req,res)=>{

    let cookieOption = {expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
        httponly: false};
    res.cookie("token","",cookieOption);
    return res.status(200).json({status:"success"})
}

exports.CreateProfile = async (req,res)=>{
    let result = await SaveProfileService(req);
    return res.status(200).json(result);
}

exports.UpdateProfile = async (req,res)=>{
    let result = await SaveProfileService(req);
    return res.status(200).json(result);
}

exports.ReadProfile = async (req,res)=>{
    let result = await ReadProfileService(req);
    return res.status(200).json(result);
}
const ethUtil = require('ethereumjs-util');
const sigUtil = require('@metamask/eth-sig-util');
const Admin = require('../models/admin');


function signData(owner) {
    return {
        types: {
            EIP712Domain: [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" },
                { name: "verifyingContract", type: "address" },
            ],
            Owner: [{ name: "owner", type: "string" }],
        },
        domain: {
            name: "Polygon Governance",
            version: "1",
            verifyingContract: "0x0000000000000000000000000000000000000000",
            chainId: "137",
        },
        primaryType: "Owner",
        message: { owner },
    };
}

async function verifySig(owner, sig) {
    const signedData = signData(owner);
    const recovered = sigUtil.recoverTypedSignature({
        data: signedData,
        signature: sig,
        version: "V3"
    })

    if (!recovered) {
        return false
    }
    const admin = await Admin.findOne({
        address: ethUtil.toChecksumAddress(recovered)
    },
        { _id: 0, __v: 0 }).lean();

    // TODO(raneet10): It could be a possibility that a new owner was added to multisig    
    if (!admin) {
        return false
    }
    return true;
}

module.exports = verifySig;
const ethUtil = require('ethereumjs-util');
const sigUtil = require('@metamask/eth-sig-util');

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

function verifySig(owner, sig) {
    const signedData = signData(owner);
    const recovered = sigUtil.recoverTypedSignature({
        data: signedData,
        signature: sig,
        version: "V3"
    })

    return recovered && ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(owner);
}

module.exports = verifySig;
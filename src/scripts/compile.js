const fs = require('fs')
const path = require('path')
const solc = require('solc')

const filePath = path.resolve(__dirname, '../contracts/basic.sol')

// 获取合约内容
const content = fs.readFileSync(filePath, 'utf-8')

var input = {
    language: 'Solidity',
    sources: {
        'test.sol': {
            content: content
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

function findImports(path) {
    if (path === 'lib.sol')
        return {
            contents:
                'library L { function f() internal returns (uint) { return 7; } }'
        };
    else return { error: 'File not found' };
}


// 编译
const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }))

for (var contractName in output.contracts['test.sol']) {
    console.log(
        contractName +
        ': ' +
        output.contracts['test.sol'][contractName].evm.bytecode.object  // 部署合约用的数据
    );
    const filePath = path.resolve(__dirname, `../compiled/${contractName}.json`)
    fs.writeFileSync(filePath, JSON.stringify(output.contracts['test.sol'][contractName].evm.bytecode))
}

// 
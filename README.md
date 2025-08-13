# Voting DApp - 全栈去中心化投票应用

这是一个基于以太坊的、全栈的去中心化投票应用程序（DApp）。它利用 Hardhat 进行智能合约的开发和部署，React 作为前端框架，以及一个简单的 Express.js 后端服务。

## ✨ 主要功能

- **管理员权限**: 合约的部署者（Owner）拥有唯一权限来添加候选人。
- **添加候选人**: 管理员可以随时向投票系统中添加新的候选人。
- **投票**: 任何用户（地址）都可以投票，但每个地址只能投票一次。
- **获取候选人列表**: 任何人都可以查看当前所有候选人的列表及其得票数。
- **查看获胜者**: 任何人都可以查询当前得票数最高的获胜者。

## 🛠️ 技术栈

- **智能合约**: Solidity, Hardhat, OpenZeppelin
- **前端**: React, Vite, Ethers.js, Axios
- **后端**: Node.js, Express.js
- **开发环境**: Node.js, npm

## 📋 先决条件

在开始之前，请确保您已在本地安装了以下软件：

- [Node.js](https://nodejs.org/) (v18.x 或更高版本)
- [NPM](https://www.npmjs.com/) (通常随 Node.js 一起安装)
- [MetaMask](https://metamask.io/) 浏览器插件

## 🚀 配置与启动

请按照以下步骤在本地运行此项目。

### 1. 克隆仓库

```bash
git clone <your-repository-url>
cd voting-dapp
```

### 2. 配置并部署智能合约 (Hardhat)

首先，我们需要编译并部署 `Voting` 智能合约到本地的 Hardhat 网络。

```bash
# 进入 hardhat 目录
cd hardhat

# 安装依赖
npm install

# 编译智能合约
npx hardhat compile

# 启动本地 Hardhat 节点
npx hardhat node
```

此命令将启动一个本地以太坊节点，并为您提供约 20 个测试账户及其私钥。

**另外打开一个新的终端**，执行部署脚本：

```bash
# 确保仍处于 hardhat 目录下
# 部署合约到本地网络
npx hardhat run scripts/deploy.js --network localhost
```

部署成功后，您将在终端看到类似以下的输出：

```
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Voting contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**请复制并保存部署后的合约地址 (`0x5Fb...`)**，后续步骤将会用到它。

### 3. 配置并启动后端 (Backend)

后端服务用于与智能合约进行交互。

```bash
# 回到项目根目录，然后进入 backend 目录
cd ../backend

# 安装依赖
npm install
```

在 `backend` 文件夹中，您可能需要一个配置文件或直接在 `index.js` 中配置合约地址和 ABI。
**注意**: 为了使项目能够运行，您需要将 `hardhat/artifacts/contracts/Voting.sol/Voting.json` (合约的 ABI) 和上一步中得到的合约地址提供给后端和前端。

启动后端服务 (假设入口文件是 `index.js`):
```bash
node index.js
```

### 4. 配置并启动前端 (Frontend)

前端是用户与 DApp 交互的界面。

```bash
# 回到项目根目录，然后进入 frontend 目录
cd ../frontend

# 安装依赖
npm install
```

在前端代码中（通常是在一个配置文件如 `src/config.js` 或直接在组件中），您需要配置：
1.  **合约地址**: 粘贴您在第 2 步中保存的地址。
2.  **合约 ABI**: 从 `hardhat/artifacts/contracts/Voting.sol/Voting.json` 文件中复制 ABI 内容。

配置完成后，启动前端开发服务器：

```bash
npm run dev
```

现在，您可以在浏览器中打开 Vite 提供的本地地址 (通常是 `http://localhost:5173`) 来与 DApp 进行交互。

**重要提示**:
- 确保您的 MetaMask 已连接到 Hardhat 的本地网络 (通常是 `http://127.0.0.1:8545/`)。
- 您可以通过导入 Hardhat 节点提供的私钥，在 MetaMask 中使用测试账户进行投票。

## 📁 项目结构

```
voting-dapp/
├── backend/         # Express.js 后端
├── frontend/        # React + Vite 前端
└── hardhat/         # Solidity 智能合约和部署脚本
```

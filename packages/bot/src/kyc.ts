import fs from "fs";
import path from "path";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils/types";

const ABI: AbiItem[] = [{ "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];

/**
 * check if user is validated
 */
export class Kyc {
  /**
   * Get top contracts from `res/top_100.csv`
   */
  static TopContracts(web3: Web3): Contract[] {
    return fs.readFileSync(
      path.resolve(__dirname, "../res/top_100.csv")
    ).toString().split("\r\n").map((contract: string): Contract => {
      return new web3.eth.Contract(ABI, contract.split(",")[1]);
    });
  }

  /**
   * Get validated addresses from `res/addresses.csv`
   */
  static Addresses(): string[] {
    return fs.readFileSync(
      path.resolve(__dirname, "../res/addresses.csv"),
    ).toString().split("\r\n").splice(1).map((info: string): string => {
      return info.split(",")[0];
    });
  }

  contracts: Contract[];
  addresses: string[]

  constructor(web3: Web3) {
    this.contracts = Kyc.TopContracts(web3);
    this.addresses = Kyc.Addresses();
  }

  /**
   * verify if address is validated
   */
  public async verify(address: string): Promise<boolean> {
    if (this.addresses.includes(address)) return true;

    for (const contract of this.contracts) {
      if (await contract.methods.balanceOf(address).call() > 0) {
        return true
      }
    }

    return false
  }
}

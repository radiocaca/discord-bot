import fs from "fs";
import path from "path";
import axios from "axios";

/**
 * check if user is validated
 */
export class Kyc {
  /**
   * Get top contracts from `res/top_100.csv`
   */
  static TopContracts(): string[] {
    return fs.readFileSync(
      path.resolve(__dirname, "../res/top_100.csv")
    ).toString().split("\r\n").map((contract: string): string => {
      return contract.split(",")[1]
    });
  }

  /**
   * Get validated addresses from `res/addresses.csv`
   */
  static Addresses(): string[] {
    return fs.readFileSync(
      path.resolve(__dirname, "../res/addresses.csv"),
    ).toString().split("\r\n").splice(1).map((info: string): string => {
      return info.split(",")[0]
    });
  }

  addresses: string[]
  contracts: string[];

  constructor() {
    this.contracts = Kyc.TopContracts();
    this.addresses = Kyc.Addresses();
  }

  /**
   * verify if address is validated
   */
  public async verify(address: string): Promise<boolean> {
    if (this.addresses.includes(address)) return true;

    try {
      const res: any = await axios.post(
        String(process.env.NFT_API),
        JSON.stringify({
          ownerAddress: address,
          collectionAddresses: this.contracts,
          page: {
            lastSort: [],
            offset: 0,
            size: 20
          },
        }),
        {
          headers: {
            "content-type": "application/json",
            "charset": "UTF-8",
          }
        }
      );

      if (res.data && res.data.length > 0) {
        return true;
      }
    } catch (_error) {
      return false;
    }

    return false
  }
}

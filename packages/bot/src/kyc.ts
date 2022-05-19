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
   * verify collection via nft api
   *
   * @param {string} address owner address
   * @param {number} offset page offset
   * @param {number} size page size
   */
  private async verifyCollection(
    address: string,
    offset: number,
    size: number
  ): Promise<boolean> {
    try {
      const res: any = await axios.post(
        String(process.env.NFT_API),
        JSON.stringify({
          ownerAddress: address,
          page: {
            lastSort: [],
            offset,
            size,
          },
        }),
        {
          headers: {
            "content-type": "application/json",
            "charset": "UTF-8",
          }
        }
      );

      const data = res.data.data;
      if (res.data === undefined || data === undefined || data.length === 0) {
        return false;
      }

      // check if have validated token
      for (const item of data) {
        if (this.contracts.includes(item.collectionAddress)) return true;
      }

      // rerun this function to the next pages
      if (data.length === size) {
        return await this.verifyCollection(address, offset + size, size);
      }
    } catch (_e) {
      return false;
    }

    return false;
  }

  /**
   * verify if address is validated
   *
   * @param {string} address owner address
   */
  public async verify(address: string): Promise<boolean> {
    if (this.addresses.includes(address)) return true;

    return await this.verifyCollection(address, 0, 10000);
  }
}

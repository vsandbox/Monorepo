// Cancellable async fs based on node "fs" module

import fs from "fs";
import path from "path";

/**
 * Possible scenarios:
 * - Success
 * - System error
 * - Cancelled
 *
 * Way A:
 * - On async callback mark the resource somehow
 * - Then, on update it will behave accordingly to this mark
 */
export class FSFileHandler {
  public readonly id: symbol;
  public readonly flags: string | number;
  public readonly fileAbsPath: string;
  public isCancelled: boolean;

  public constructor(id: symbol, fileAbsPath: string, flags: string | number) {
    this.id = id;
    this.flags = flags;
    this.fileAbsPath = fileAbsPath;
  }

  public read() {
    fs.open(this.fileAbsPath, this.flags, (err, fd) => {
      if (err) {
        // handle error
        return;
      }

      if (this.isCancelled) {
        // handle cancelling
        return;
      }
    });
  }
}

export class FSManager {

}

// @ts-ignore
import LightningFS from "@isomorphic-git/lightning-fs";
import * as path from "path";
import { Stats } from "fs";

class FileSystem {
  private fs: any;

  public readFile: (path: string, opts?: any) => Promise<string | Uint8Array>;
  public writeFile: (path: string, data: string) => Promise<void>;
  public readdir: (path: string) => Promise<string[]>;
  public unlink: (path: string) => Promise<void>;
  public stats: (path: string) => Promise<Stats>;
  public mkdir: (path: string) => Promise<void>;
  public exists: (path: string) => Promise<boolean>;
  public rename: (oldPath: string, newPath: string) => Promise<void>;
  public rmdir: (path: string) => Promise<void>;
  public mkdirp: (path: string) => Promise<void>;

  constructor(fs: any) {
    this.fs = fs;
    this.setUpFSMethods();
  }

  private setUpFSMethods() {
    this.readFile = (path: string, opts?: any) => {
      return new Promise((resolve, reject) => {
        this.fs.readFile(path, opts, (error: Error, data: string) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(data.toString());
          }
        });
      });
    };
    this.writeFile = (path: string, data: string) => {
      return new Promise((resolve, reject) => {
        this.fs.writeFile(path, data, { encoding: "utf8" }, (error: Error) => {
          if (error) {
            return reject(error);
          } else {
            return resolve();
          }
        });
      });
    };
    this.readdir = (path: string) => {
      return new Promise((resolve, reject) => {
        this.fs.readdir(path, (error: Error, files: string[]) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(files);
          }
        });
      });
    };
    this.unlink = (path: string) => {
      return new Promise((resolve, reject) => {
        this.fs.unlink(path, (error: Error) => {
          if (error) {
            return reject(error);
          } else {
            return resolve();
          }
        });
      });
    };
    this.stats = (path: string) => {
      return new Promise((resolve, reject) => {
        this.fs.stat(path, (error: Error, stats: Stats) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(stats);
          }
        });
      });
    };
    this.mkdir = (path: string) => {
      return new Promise((resolve, reject) => {
        this.fs.mkdir(path, "0777", (error: Error) => {
          if (error) {
            return reject(error);
          } else {
            return resolve();
          }
        });
      });
    };
    this.exists = (path: string) => {
      return new Promise((resolve, reject) => {
        this.fs.stat(path, (error: Error, stats: Stats) => {
          if (error) {
            return resolve(false);
          } else {
            return resolve(true);
          }
        });
      });
    };
    const rename = async (oldPath: string, newPath: string) => {
      const stats = await this.stats(oldPath);
      if (stats.isDirectory()) {
        await this.mkdirp(newPath);
      } else {
        await this.mkdirp(path.dirname(newPath));
      }

      return new Promise((resolve, reject) => {
        this.fs.rename(oldPath, newPath, (error: Error) => {
          if (error) {
            return reject(error);
          } else {
            return resolve();
          }
        });
      });
    };
    this.rename = async (oldPath: string, newPath: string) => {
      const oldPathStat = await this.stats(oldPath);
      let newPathStat: Stats;
      if (await this.exists(newPath)) {
        newPathStat = await this.stats(newPath);
      } else {
        newPathStat = null;
      }
      if (
        oldPathStat.isDirectory() ||
        (newPathStat && newPathStat.isDirectory())
      ) {
        const files = await this.readdir(oldPath);
        // const promises = []; // <= It seems to cause bug if run parallel
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const filePath = path.resolve(oldPath, file);
          const stats = await this.stats(filePath);
          if (stats.isDirectory()) {
            await this.rename(filePath, path.resolve(newPath, file));
          } else {
            await rename(filePath, path.resolve(newPath, file));
          }
        }
        // await Promise.all(promises);
        await this.rmdir(oldPath);
      } else {
        await rename(oldPath, newPath);
      }
    };
    const rmdir = (path: string) => {
      return new Promise((resolve, reject) => {
        this.fs.rmdir(path, (error: Error) => {
          if (error) {
            return reject(error);
          } else {
            return resolve();
          }
        });
      });
    };
    // Remove the directory recursively
    this.rmdir = async (dirPath: string) => {
      const files = await this.readdir(dirPath);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.resolve(dirPath, file);
        const stats = await this.stats(filePath);
        if (stats.isDirectory()) {
          promises.push(this.rmdir(filePath));
        } else {
          promises.push(this.unlink(filePath));
        }
      }
      await Promise.all(promises);
      await rmdir(dirPath);
    };

    this.mkdirp = async (dirPath: string) => {
      if (await this.exists(dirPath)) {
        return;
      } else {
        await this.mkdirp(path.dirname(dirPath));
        await this.mkdir(dirPath);
      }
    };
  }
}

export const fs = new LightningFS("fs");
export const pfs = new FileSystem(fs);

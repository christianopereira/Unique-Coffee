/**
 * Workaround for Windows EISDIR bug with fs.readlink on external drives.
 * On some Windows configurations (especially external drives), readlink
 * returns EISDIR for regular files instead of EINVAL.
 * This patch converts EISDIR to EINVAL so webpack/Next.js builds work.
 */
const fs = require("fs");

// Patch synchronous readlink
const originalReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function patchedReadlinkSync(path, options) {
  try {
    return originalReadlinkSync.call(fs, path, options);
  } catch (err) {
    if (err.code === "EISDIR") {
      const newErr = new Error(`EINVAL: invalid argument, readlink '${path}'`);
      newErr.code = "EINVAL";
      newErr.errno = -22;
      newErr.syscall = "readlink";
      newErr.path = String(path);
      throw newErr;
    }
    throw err;
  }
};

// Patch callback-based readlink
const originalReadlink = fs.readlink;
fs.readlink = function patchedReadlink(path, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  originalReadlink.call(fs, path, options, (err, linkString) => {
    if (err && err.code === "EISDIR") {
      const newErr = new Error(`EINVAL: invalid argument, readlink '${path}'`);
      newErr.code = "EINVAL";
      newErr.errno = -22;
      newErr.syscall = "readlink";
      newErr.path = String(path);
      return callback(newErr);
    }
    callback(err, linkString);
  });
};

// Patch fs.promises.readlink
const fsp = fs.promises;
const originalReadlinkPromise = fsp.readlink;
fsp.readlink = async function patchedReadlinkPromise(path, options) {
  try {
    return await originalReadlinkPromise.call(fsp, path, options);
  } catch (err) {
    if (err.code === "EISDIR") {
      const newErr = new Error(`EINVAL: invalid argument, readlink '${path}'`);
      newErr.code = "EINVAL";
      newErr.errno = -22;
      newErr.syscall = "readlink";
      newErr.path = String(path);
      throw newErr;
    }
    throw err;
  }
};

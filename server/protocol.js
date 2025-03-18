const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");

const readCertFile = (filePath) => {
  try {
    return fs.readFileSync(filePath);
  } catch (e) {
    console.error(`https적용을 위한 인증서 파일이 없습니다: ${filePath}`);
    throw e;
  }
};

const findCertPath = (currentPath = __dirname) => {
  const isDir = fs.lstatSync(currentPath).isDirectory();
  if (!isDir) {
    throw new Error(`${currentPath} 는 directory가 아닙니다`);
  }

  if (fs.existsSync(path.resolve(currentPath, "cert"))) {
    return path.resolve(currentPath, "cert");
  }

  const parentPath = path.resolve(currentPath, "../");
  if (parentPath === currentPath) {
    throw new Error(`cert 를 찾지 못했습니다`);
  }

  return findCertPath(parentPath);
};

const createHttpsServer = (app) => {
  try {
    const certPath = findCertPath(__dirname);
    const options = {
      key: readCertFile(path.join(certPath, "key.pem")),
      cert: readCertFile(path.join(certPath, "cert.pem")),
    };

    if (!options.key || !options.cert) {
      throw new Error("SSL 인증서를 읽지 못했습니다.");
    }

    return https.createServer(options, app);
  } catch (e) {
    console.error(e);
    console.error(`https 적용이 필요한 경우 먼저 npm run enable-dev-https 를 실행하세요`);
    throw e;
  }
};

const getHttpOrHttpsServer = (isSSLMode, requestHandler) => {
  const server = isSSLMode ? createHttpsServer(requestHandler) : http.createServer(requestHandler);
  return server;
};

module.exports = {
  getHttpOrHttpsServer,
};

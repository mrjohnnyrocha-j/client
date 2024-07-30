const fs = require('fs');
const path = require('path');

const componentsDir = path.resolve(__dirname, 'components');

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(file => {
    const fullPath = path.join(srcPath, file);
    return fs.lstatSync(fullPath).isDirectory();
  });
}

function getFiles(srcPath) {
  return fs.readdirSync(srcPath).filter(file => {
    const fullPath = path.join(srcPath, file);
    return fs.lstatSync(fullPath).isFile() && file.endsWith('.tsx');
  });
}

function generatePathsConfig(dir, aliasPrefix = '@components') {
  const pathsConfig = {};

  const directories = getDirectories(dir);
  directories.forEach(subDir => {
    const subDirPath = path.join(dir, subDir);
    const files = getFiles(subDirPath);

    files.forEach(file => {
      const componentName = path.basename(file, '.tsx');
      const aliasPath = `${aliasPrefix}/${subDir}/${componentName}`;
      const relativePath = path.relative(__dirname, path.join(subDirPath, file)).replace(/\\/g, '/');
      pathsConfig[aliasPath] = [relativePath];
    });

    // Recursively add subdirectories
    Object.assign(pathsConfig, generatePathsConfig(subDirPath, `${aliasPrefix}/${subDir}`));
  });

  return pathsConfig;
}

function main() {
  const pathsConfig = generatePathsConfig(componentsDir);

  const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
  const tsconfig = require(tsconfigPath);

  tsconfig.compilerOptions.paths = {
    ...tsconfig.compilerOptions.paths,
    ...pathsConfig,
  };

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log('tsconfig.json updated with paths:', pathsConfig);
}

main();

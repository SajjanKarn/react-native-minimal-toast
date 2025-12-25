const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// Force React and React Native to resolve from example's node_modules only
config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (target, name) => {
      // Redirect react and react-native to example's node_modules
      if (name === 'react' || name === 'react-native') {
        return path.join(projectRoot, `node_modules/${name}`);
      }
      // Let metro resolve all other modules normally
      return path.join(projectRoot, `node_modules/${name}`);
    },
  }
);

// Only resolve from example's node_modules to prevent duplicates
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

module.exports = config;

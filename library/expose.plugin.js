function ExposePlugin(options) {
  this.globalKey = options.globalKey || '__exposedLibrary';
  this.renameModuleId = options.renameModuleId || function(resource) {
    var componentNameMatches = /components\/([^\/]+)\//.exec(resource);
    return componentNameMatches && componentNameMatches.length ? componentNameMatches[1] : null;
  }
}

ExposePlugin.prototype.apply = function(compiler) {
  var globalKey = this.globalKey;
  var renameModuleId = this.renameModuleId;

  compiler.plugin("compilation", function(compilation) {
    compilation.mainTemplate.plugin('startup', function(source, module, hash) {
      const inclusionFunction = function(moduleName) {
        if (!moduleName) {
          throw new Error('Paramater `moduleName` is required')
        }
        
        const moduleKey = Object.keys(installedModules).find(k => k.toLowerCase() === moduleName.toLowerCase())

        if (!moduleKey) {
          throw new Error('TODO: we need to handle this')
        }

        const module = installedModules[moduleKey]

        const exportsKey = Object.keys(module.exports).reduce((prev, curr) => {
          if (curr === 'default') {
            return curr
          }
          if (curr.toLowerCase() === moduleName.toLowerCase()) {
            return curr
          }
          return prev
        })
        
        return module.exports[exportsKey]
      }
      return globalKey + ' = ' + inclusionFunction + '; ' + source;
    });
    compilation.plugin('optimize-module-ids', function(modules) {
      modules.forEach(function(module) {
        module.id = renameModuleId(module.resource) || module.id;
      });
    });
  });
}

module.exports = ExposePlugin;
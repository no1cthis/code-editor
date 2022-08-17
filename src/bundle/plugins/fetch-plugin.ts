import axios from 'axios';
import * as esbuild from 'esbuild-wasm'
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: 'fileCache'
  });

export const fetchPlugin = (inputCode:string) =>{
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild){
        
        build.onLoad({filter:/^index\.js$/}, (args: any) =>{
        return {
                loader: 'jsx',
                contents: inputCode,
              };
        })

    build.onLoad({ filter: /\*/ }, async (args: any) => {
        //check if we already fetched this file and if it's cached
        const chachedResult = await localforage.getItem<esbuild.OnLoadResult>(args.path)
        // if true - return immediatly 
        if(chachedResult)
            return chachedResult
        return null
    })
    build.onLoad({ filter: /.css$/ }, async (args: any) => {

        const {data, request} = await axios.get(args.path)

        const escaped = data.replace(/\n/g, '')
                        .replace(/'/g, '\\"')
                        .replace(/"/g, "\\'")
        const contents =`
                            const style = document.createElement('style');
                            style.innerText = '${escaped}';
                            document.head.appendChild(style);
                        `

        const result:esbuild.OnLoadResult =  {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        };
        // store response in chache
        await fileCache.setItem(args.path, result)

        return result
      });

        build.onLoad({ filter: /.*/ }, async (args: any) => {
            const {data, request} = await axios.get(args.path)

            const result:esbuild.OnLoadResult =  {
              loader: 'jsx',
              contents: data,
              resolveDir: new URL('./', request.responseURL).pathname
            };
            // store response in chache
            await fileCache.setItem(args.path, result)
    
            return result
          });
        }
    }
}
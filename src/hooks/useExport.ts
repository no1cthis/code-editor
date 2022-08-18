import { useTypedSelector } from "./useTypedSelector";

interface exportStore{
    data:{},
    order: string[]
}

export const useExport = (store:exportStore) => () => {
      const blob = new Blob([JSON.stringify(store)], {type : 'application/json'});
      const href = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement('a'),{
        href,
        style: 'display:none',
        download: 'codeEditorExport.txt'
      })
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(href)
      a.remove();
}
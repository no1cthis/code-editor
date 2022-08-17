export type EditorType = 'code' | 'text'


export interface Editor{
    id: string,
    type: EditorType,
    content: string
}
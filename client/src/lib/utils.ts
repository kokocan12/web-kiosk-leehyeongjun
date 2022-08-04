export function invariant(condition:boolean, message:string) {
    if(condition) throw Error(message)
}
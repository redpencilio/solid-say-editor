export function validateFileName(filename){
    return /^[a-zA-Z0-9\_\.]*$/.test(filename);
}

export function validateNotEmpty(str){
    return str.length > 0;
}

export function validateNoWhiteSpace(str){
    return !(/\s/.test(str));
}
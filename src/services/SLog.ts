export function log(logTypeFunction = console.info, header: string, message: string, reviewData: object = {}) {
    console.log();
    console.group();
    logTypeFunction("== " + header.toUpperCase());
    console.log("==");
    console.log("== " + message);
    console.log("==");
    console.log(reviewData);
    console.log("== " + new Date().toUTCString());
    console.groupEnd();
    console.log();
}
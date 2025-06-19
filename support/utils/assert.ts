import { log } from "../logger";

export async function softCheck(
    fn: () => Promise<any>,
    description: string,
    errors: string[]
){
    try{
        await fn();
        log.info(`[SoftCheck PASS] ${description}`)
    } catch(err: any){
        const errorMessage = `[SoftCheck FAIL] ${description}: ${err?.message || err}`;
        log.warn(errorMessage);
        errors.push(errorMessage);
    }
}
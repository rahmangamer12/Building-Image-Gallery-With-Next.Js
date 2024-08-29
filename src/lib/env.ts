import { cleanEnv, str } from "envalid";
import { string } from "zod";

const env = cleanEnv(process.env, {
    PEXELS_API_KEY: str(),
})
export default env
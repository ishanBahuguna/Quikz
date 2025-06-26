import type { MessageType } from "./types"

function jsonParser(props : MessageType) : string {
    return JSON.stringify(props);
}

export default jsonParser